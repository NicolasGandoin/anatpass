#!/usr/bin/env python3
"""
Script d'extraction automatique pour l'ensemble des planches du polycopié d'anatomie.
Convertit les schémas en WebP optimisé et génère la structure data/planches.json via OCR Apple Vision.
"""

import subprocess
import os
import re
import json
import glob
from PIL import Image

WORKSPACE_DIR = os.path.dirname(os.path.abspath(__file__))
PDF_PATH = os.path.join(WORKSPACE_DIR, "UE5 Tome2.pdf")
IMAGES_DIR = os.path.join(WORKSPACE_DIR, "images")
DATA_FILE = os.path.join(WORKSPACE_DIR, "data", "planches.json")
SCRATCH_DIR = "/tmp/anatpass_ocr"

os.makedirs(IMAGES_DIR, exist_ok=True)
os.makedirs(SCRATCH_DIR, exist_ok=True)

# Compilation de l'outil OCR rapide si absent
OCR_BIN = os.path.join(SCRATCH_DIR, "ocr_bin")
if not os.path.exists(OCR_BIN):
    swift_code = """
import Vision
import AppKit
import Foundation

guard CommandLine.arguments.count > 1 else { exit(1) }
let url = URL(fileURLWithPath: CommandLine.arguments[1])
guard let img = NSImage(contentsOf: url),
      let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else { exit(1) }

let req = VNRecognizeTextRequest { r, _ in
    guard let obs = r.results as? [VNRecognizedTextObservation] else { return }
    for o in obs {
        if let top = o.topCandidates(1).first { print(top.string) }
    }
}
req.recognitionLanguages = ["fr-FR"]
req.recognitionLevel = .accurate
try? VNImageRequestHandler(cgImage: cg, options: [:]).perform([req])
"""
    swift_file = os.path.join(SCRATCH_DIR, "ocr.swift")
    with open(swift_file, "w") as f:
        f.write(swift_code)
    subprocess.run(["swiftc", "-O", swift_file, "-o", OCR_BIN], check=True)

def process_planche(n, text_page, schema_page):
    print(f"Extraction Planche {n:02d} (Texte p.{text_page}, Schéma p.{schema_page})...")
    
    # 1. Rendu et conversion du schéma
    schema_prefix = os.path.join(SCRATCH_DIR, f"s_{n}")
    subprocess.run(["pdftoppm", "-png", "-r", "180", "-f", str(schema_page), "-l", str(schema_page), PDF_PATH, schema_prefix],
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    pngs = glob.glob(f"{schema_prefix}-*.png")
    if pngs:
        im = Image.open(pngs[0]).convert("RGB")
        dest_webp = os.path.join(IMAGES_DIR, f"planche_{n:03d}.webp")
        im.save(dest_webp, "WEBP", quality=88, method=6)
        for p in pngs: os.remove(p)
    else:
        return None

    # 2. Rendu et OCR de la page de texte
    text_prefix = os.path.join(SCRATCH_DIR, f"t_{n}")
    subprocess.run(["pdftoppm", "-png", "-r", "150", "-f", str(text_page), "-l", str(text_page), PDF_PATH, text_prefix],
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    t_pngs = glob.glob(f"{text_prefix}-*.png")
    ocr_lines = []
    if t_pngs:
        res = subprocess.run([OCR_BIN, t_pngs[0]], capture_output=True, text=True)
        ocr_lines = [l.strip() for l in res.stdout.split("\n") if l.strip()]
        for p in t_pngs: os.remove(p)

    # 3. Analyse du texte
    title = f"Planche {n}"
    subtitle = ""
    sections = []
    curr_section = {"name": "", "items": []}
    
    line_idx = 0
    while line_idx < len(ocr_lines):
        line = ocr_lines[line_idx]
        if "planche" in line.lower() and str(n) in line:
            parts = line.split(":", 1)
            if len(parts) > 1:
                title = parts[1].strip()
            line_idx += 1
            continue

        # Détection de sous-titre de section (ex: "A : Vue de face")
        sec_match = re.match(r"^([A-Z]\s*[:\-].*)", line)
        if sec_match:
            if curr_section["items"] or curr_section["name"]:
                sections.append(curr_section)
            curr_section = {"name": sec_match.group(1), "items": []}
            line_idx += 1
            continue

        # Détection d'item numéroté (ex: "1. tête" ou "1 - tête" ou "12. fémur")
        item_match = re.match(r"^(\d+)\s*[\.\-\)]\s*(.*)", line)
        if item_match:
            num = int(item_match.group(1))
            label = item_match.group(2).strip()
            # Nettoyage
            label_clean = re.sub(r"\s+", " ", label)
            accepted = [label_clean]
            # Variantes
            clean_sans_acc = label_clean.lower()
            accepted.append(clean_sans_acc)
            
            curr_section["items"].append({
                "id": f"p{n}-{len(sections)}-{num}",
                "num": num,
                "label": label_clean,
                "accepted": list(set(accepted))
            })
            line_idx += 1
            continue

        line_idx += 1

    if curr_section["items"] or curr_section["name"]:
        sections.append(curr_section)

    return {
        "id": n,
        "number": f"Planche {n}",
        "title": title,
        "subtitle": subtitle,
        "image": f"images/planche_{n:03d}.webp",
        "sections": sections
    }

if __name__ == "__main__":
    print("Convertisseur global Anat'PASS prêt.")
