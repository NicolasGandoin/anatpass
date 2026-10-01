#!/usr/bin/env python3
"""
Génération complète de la base de données Anat'PASS (135 planches).
- Extrait toutes les images des schémas en WebP optimisé (180 DPI)
- Pour les planches 103 à 134, efface/masque les légendes imprimées sur l'image
- Analyse par OCR Apple Vision pour extraire tous les termes anatomiques et synonymes
- Produit data/planches.json complet
"""

import subprocess
import os
import re
import json
import glob
from PIL import Image, ImageDraw

WORKSPACE_DIR = os.path.dirname(os.path.abspath(__file__))
PDF_PATH = os.path.join(WORKSPACE_DIR, "UE5 Tome2.pdf")
IMAGES_DIR = os.path.join(WORKSPACE_DIR, "images")
DATA_FILE = os.path.join(WORKSPACE_DIR, "data", "planches.json")
SCRATCH_DIR = "/Users/nicolasgandoin/.gemini/antigravity-ide/brain/06133152-e1b4-48b1-aee0-c3e6776596bc/scratch"
OCR_BIN = os.path.join(SCRATCH_DIR, "ocr_full_bin")

os.makedirs(IMAGES_DIR, exist_ok=True)
os.makedirs(SCRATCH_DIR, exist_ok=True)

# Charger les 12 premières planches déjà minutieusement curées
with open(DATA_FILE, "r", encoding="utf-8") as f:
    existing_planches = json.load(f)

curated_map = {p["id"]: p for p in existing_planches if p["id"] <= 12}
all_planches = [curated_map[i] for i in range(1, 13) if i in curated_map]

def clean_label(text):
    text = re.sub(r"\s+", " ", text).strip()
    return text

def generate_accepted(label):
    variants = [label]
    # Minuscule
    low = label.lower()
    variants.append(low)
    # Sans accents
    import unicodedata
    no_acc = ''.join(c for c in unicodedata.normalize('NFD', low) if unicodedata.category(c) != 'Mn')
    variants.append(no_acc)
    # Sans articles
    no_art = re.sub(r'^(le|la|les|l[\'’]|un|une|des|du|au|aux)\s*', '', low)
    variants.append(no_art)
    no_art_no_acc = re.sub(r'^(le|la|les|l[\'’]|un|une|des|du|au|aux)\s*', '', no_acc)
    variants.append(no_art_no_acc)
    # Extraction parenthèses ex: "ulna (cubitus)" -> "ulna", "cubitus"
    m = re.match(r'([^(]+)\(([^)]+)\)', label)
    if m:
        p1 = m.group(1).strip().lower()
        p2 = m.group(2).strip().lower()
        variants.extend([p1, p2])
        v1 = ''.join(c for c in unicodedata.normalize('NFD', p1) if unicodedata.category(c) != 'Mn')
        v2 = ''.join(c for c in unicodedata.normalize('NFD', p2) if unicodedata.category(c) != 'Mn')
        variants.extend([v1, v2])
    return list(set(variants))

# ==============================================================================
# PARTIE 1 : PLANCHES 13 À 102 (Pages 27 à 208)
# Pages paires = Schémas, Pages impaires = Légendes
# ==============================================================================
print("Traitement de la Partie 1 (Planches 13 à 102)...")

planche_pairs = []
# Génération de la liste des paires (text_page, schema_page)
# Attention à la planche 55bis (p.113 text, p.114 schema)
p = 27
pl_num = 13
while p <= 207:
    text_page = p
    schema_page = p + 1
    
    # Identification du numéro / nom
    if text_page == 113:
        p_id = 55.5
        p_num_str = "Planche 55bis"
    elif text_page > 113:
        p_id = pl_num
        p_num_str = f"Planche {pl_num}"
        pl_num += 1
    else:
        p_id = pl_num
        p_num_str = f"Planche {pl_num}"
        pl_num += 1
        
    planche_pairs.append((p_id, p_num_str, text_page, schema_page))
    p += 2

for p_id, p_num_str, text_page, schema_page in planche_pairs:
    id_int = int(p_id) if isinstance(p_id, int) or p_id.is_integer() else 55.5
    img_name = f"planche_{int(p_id):03d}{'bis' if p_id==55.5 else ''}.webp"
    dest_webp = os.path.join(IMAGES_DIR, img_name)
    
    # 1. Rendu et conversion du schéma
    if not os.path.exists(dest_webp):
        prefix = os.path.join(SCRATCH_DIR, f"s_p{schema_page}")
        subprocess.run(["pdftoppm", "-png", "-r", "180", "-f", str(schema_page), "-l", str(schema_page), PDF_PATH, prefix],
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        pngs = glob.glob(f"{prefix}-*.png")
        if pngs:
            im = Image.open(pngs[0]).convert("RGB")
            im.save(dest_webp, "WEBP", quality=88, method=6)
            for f in pngs: os.remove(f)

    # 2. Rendu et OCR de la page de légende
    t_prefix = os.path.join(SCRATCH_DIR, f"t_p{text_page}")
    subprocess.run(["pdftoppm", "-png", "-r", "150", "-f", str(text_page), "-l", str(text_page), PDF_PATH, t_prefix],
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    t_pngs = glob.glob(f"{t_prefix}-*.png")
    ocr_lines = []
    if t_pngs:
        res = subprocess.run([OCR_BIN, t_pngs[0]], capture_output=True, text=True)
        ocr_lines = [l.strip() for l in res.stdout.split("\n") if l.strip()]
        for f in t_pngs: os.remove(f)

    # 3. Analyse du texte et extraction des items
    title = p_num_str
    subtitle = ""
    sections = []
    curr_section = {"name": "", "items": []}
    
    line_idx = 0
    while line_idx < len(ocr_lines):
        line = ocr_lines[line_idx]
        
        # Titre principal
        if "planche" in line.lower() and (str(int(p_id)) in line or "bis" in line.lower()):
            parts = line.split(":", 1)
            if len(parts) > 1 and parts[1].strip():
                title = clean_label(parts[1])
            line_idx += 1
            # Ligne suivante éventuelle comme sous-titre
            if line_idx < len(ocr_lines) and not re.match(r"^([A-Z]\s*[:\-]|\d+[\.\-\)])", ocr_lines[line_idx]):
                subtitle = clean_label(ocr_lines[line_idx])
                line_idx += 1
            continue

        # Sous-section (ex: "A : Vue de face" ou "B : Coupe sagittale")
        sec_match = re.match(r"^([A-Z]\s*[:\-].*)", line)
        if sec_match:
            if curr_section["items"] or curr_section["name"]:
                sections.append(curr_section)
            curr_section = {"name": clean_label(sec_match.group(1)), "items": []}
            line_idx += 1
            continue

        # Item numéroté (ex: "1. tête" ou "12. fémur")
        item_match = re.match(r"^(\d+)\s*[\.\-\)]\s*(.*)", line)
        if item_match:
            num = int(item_match.group(1))
            label = item_match.group(2).strip()
            
            # Possibilité que la description se poursuive sur la ligne suivante si elle commence par une minuscule
            while (line_idx + 1 < len(ocr_lines) 
                   and not re.match(r"^([A-Z]\s*[:\-]|\d+[\.\-\)])", ocr_lines[line_idx + 1])
                   and len(ocr_lines[line_idx + 1]) > 0
                   and (ocr_lines[line_idx + 1][0].islower() or ocr_lines[line_idx + 1].startswith("("))):
                line_idx += 1
                label += " " + ocr_lines[line_idx].strip()
                
            label_clean = clean_label(label)
            # Extraire hint si note explicative longue
            hint = ""
            if len(label_clean) > 40 and "(" in label_clean:
                hint = label_clean
                
            curr_section["items"].append({
                "id": f"p{int(p_id)}-{len(sections)+1}-{num}",
                "num": num,
                "label": label_clean,
                "accepted": generate_accepted(label_clean),
                **({"hint": hint} if hint else {})
            })
            line_idx += 1
            continue

        line_idx += 1

    if curr_section["items"] or curr_section["name"]:
        sections.append(curr_section)

    all_planches.append({
        "id": int(p_id) if p_id != 55.5 else 55.5,
        "number": p_num_str,
        "title": title,
        "subtitle": subtitle,
        "image": f"images/{img_name}",
        "sections": sections
    })
    print(f"  ✓ {p_num_str} : {title[:35]} ({sum(len(s['items']) for s in sections)} éléments)")

# ==============================================================================
# PARTIE 2 : PLANCHES 103 À 134 (Pages 209 à 240)
# Chaque page contient schéma + légendes -> On efface la légende sur le schéma !
# ==============================================================================
print("\nTraitement de la Partie 2 (Planches 103 à 134 - Masquage des textes)...")

for page_num in range(209, 241):
    pl_num = page_num - 209 + 103
    p_num_str = f"Planche {pl_num}"
    img_name = f"planche_{pl_num:03d}.webp"
    dest_webp = os.path.join(IMAGES_DIR, img_name)

    # 1. Rendu PNG haute résolution (180 DPI)
    prefix = os.path.join(SCRATCH_DIR, f"p_{page_num}")
    subprocess.run(["pdftoppm", "-png", "-r", "180", "-f", str(page_num), "-l", str(page_num), PDF_PATH, prefix],
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    pngs = glob.glob(f"{prefix}-*.png")
    if not pngs:
        continue
    raw_png = pngs[0]

    # 2. OCR avec boîtes englobantes
    res = subprocess.run([OCR_BIN, raw_png, "--boxes"], capture_output=True, text=True)
    raw_lines = [l.strip() for l in res.stdout.split("\n") if l.strip()]

    # 3. Analyse & Détection des zones de légendes à masquer
    im = Image.open(raw_png).convert("RGB")
    draw = ImageDraw.Draw(im)
    W, H = im.size

    title = p_num_str
    subtitle = ""
    sections = []
    curr_section = {"name": "Légende du schéma", "items": []}

    for line in raw_lines:
        parts = line.split("||")
        if len(parts) != 2: continue
        text, coords = parts[0].strip(), parts[1].strip()
        bx, by, bw, bh = map(float, coords.split(","))

        # Coordonnées image PIL (Vision Y commence en bas)
        x0 = int(bx * W)
        x1 = int((bx + bw) * W)
        y0 = int((1.0 - (by + bh)) * H)
        y1 = int((1.0 - by) * H)

        # Détection titre principal (on le garde sur le schéma)
        if "planche" in text.lower() and str(pl_num) in text:
            parts_t = text.split(":", 1)
            if len(parts_t) > 1:
                title = clean_label(parts_t[1])
            continue

        # Détection section Fig (ex: "Fig. 6 : Clavicule droite, vue supérieure")
        fig_match = re.match(r"^(Fig\.?\s*\d*\s*[:\-].*)", text, re.I)
        if fig_match:
            # On masque le titre de figure sur l'image pour un schéma parfaitement épuré
            draw.rectangle([x0 - 5, y0 - 3, x1 + 5, y1 + 3], fill="white")
            if curr_section["items"]:
                sections.append(curr_section)
            curr_section = {"name": clean_label(fig_match.group(1)), "items": []}
            continue

        # Détection élément numéroté de légende (ex: "1 : corps", "4 : bord antérieur", "1 - clavicule")
        item_match = re.match(r"^(\d+)\s*[:\-]\s*(.+)", text)
        if item_match:
            num = int(item_match.group(1))
            label = clean_label(item_match.group(2))
            
            # Masquer le texte de la légende sur le schéma !
            draw.rectangle([x0 - 5, y0 - 3, x1 + 5, y1 + 3], fill="white")
            
            curr_section["items"].append({
                "id": f"p{pl_num}-{len(sections)+1}-{num}",
                "num": num,
                "label": label,
                "accepted": generate_accepted(label)
            })
            continue

        # Masquer d'éventuels sous-textes descriptifs de légende (ex: "vue inférieure", "surface articulaire...")
        if any(kw in text.lower() for kw in ["vue antérieure", "vue postérieure", "vue latérale", "vue supérieure", "vue inférieure", "surface articulaire", "tubercule", "gouttière"]):
            if y0 > H * 0.35: # Seulement dans les zones de légende en dessous ou sur les côtés
                draw.rectangle([x0 - 5, y0 - 3, x1 + 5, y1 + 3], fill="white")

    if curr_section["items"]:
        sections.append(curr_section)

    # 4. Sauvegarde de l'image masquée et optimisée en WebP
    im.save(dest_webp, "WEBP", quality=88, method=6)
    for f in pngs: os.remove(f)

    all_planches.append({
        "id": pl_num,
        "number": p_num_str,
        "title": title,
        "subtitle": subtitle,
        "image": f"images/{img_name}",
        "sections": sections
    })
    print(f"  ✓ {p_num_str} (p.{page_num}) : {title[:35]} ({sum(len(s['items']) for s in sections)} éléments masqués)")

# ==============================================================================
# SAUVEGARDE DE LA BASE DE DONNÉES FINALE
# ==============================================================================
print(f"\nSauvegarde de {len(all_planches)} planches dans {DATA_FILE}...")
with open(DATA_FILE, "w", encoding="utf-8") as f:
    json.dump(all_planches, f, ensure_ascii=False, indent=2)

print("Base de données complète générée avec succès !")
