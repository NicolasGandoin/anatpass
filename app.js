/**
 * ANAT'PASS — Application d'Apprentissage des Schémas d'Anatomie
 * Architecture logicielle : Moteur de tolérance phonétique/orthographique,
 * Synthèse audio Web Audio API, Pan & Zoom SVG/Canvas, Persistance LocalStorage.
 */

// Données embarquées en cas d'accès direct file:// (évite les blocages CORS du navigateur)
const EMBEDDED_PLANCHES = [
  {
    "id": 1,
    "number": "Planche 1",
    "title": "Le corps humain",
    "subtitle": "Vues générale et repères anatomiques de base",
    "image": "images/planche_001.webp",
    "sections": [
      {
        "name": "A : Vue de face",
        "items": [
          { "id": "p1-a-1", "num": 1, "label": "tête", "accepted": ["tête", "tete", "la tête"] },
          { "id": "p1-a-2", "num": 2, "label": "cou", "accepted": ["cou", "le cou"] },
          { "id": "p1-a-5", "num": 5, "label": "thorax", "accepted": ["thorax", "le thorax"] },
          { "id": "p1-a-6", "num": 6, "label": "abdomen", "accepted": ["abdomen", "l'abdomen"] },
          { "id": "p1-a-7", "num": 7, "label": "diaphragme", "accepted": ["diaphragme", "le diaphragme"] }
        ]
      },
      {
        "name": "B : La position anatomique de référence",
        "note": "Noter que la tête est à l'horizontale (le regard porte vers l'horizon), que le pouce est dirigé en dehors et que les talons sont joints.",
        "items": []
      },
      {
        "name": "C : Coupe sagittale médiane",
        "items": [
          { "id": "p1-c-1", "num": 1, "label": "tête", "accepted": ["tête", "tete", "la tête"] },
          { "id": "p1-c-2", "num": 2, "label": "cou", "accepted": ["cou", "le cou"] },
          { "id": "p1-c-5", "num": 5, "label": "thorax", "accepted": ["thorax", "le thorax"] },
          { "id": "p1-c-6", "num": 6, "label": "abdomen", "accepted": ["abdomen", "l'abdomen"] },
          { "id": "p1-c-7", "num": 7, "label": "diaphragme", "accepted": ["diaphragme", "le diaphragme"] }
        ]
      },
      {
        "name": "D : Vue de profil",
        "items": [
          { "id": "p1-d-1", "num": 1, "label": "tête", "accepted": ["tête", "tete", "la tête"] },
          { "id": "p1-d-2", "num": 2, "label": "cou", "accepted": ["cou", "le cou"] },
          { "id": "p1-d-3", "num": 3, "label": "tronc", "accepted": ["tronc", "le tronc"] },
          { "id": "p1-d-4", "num": 4, "label": "membre pelvien", "accepted": ["membre pelvien", "le membre pelvien", "membre inférieur", "le membre inferieur"] }
        ]
      }
    ]
  },
  {
    "id": 2,
    "number": "Planche 2",
    "title": "Coupe sagittale du tronc",
    "subtitle": "Cavités et délimitations séreuses",
    "image": "images/planche_002.webp",
    "sections": [
      {
        "name": "Légende du schéma",
        "items": [
          { "id": "p2-1", "num": 1, "label": "région du cou", "accepted": ["région du cou", "region du cou", "cou", "le cou"] },
          { "id": "p2-2", "num": 2, "label": "plan de l'orifice supérieur du thorax", "hint": "joignant TH1 au manubrium sternal", "accepted": ["plan de l'orifice supérieur du thorax", "orifice supérieur du thorax", "orifice superieur du thorax", "plan de l'orifice superieur du thorax", "orifice supérieur"] },
          { "id": "p2-3", "num": 3, "label": "cavité thoracique", "accepted": ["cavité thoracique", "cavite thoracique", "la cavité thoracique"] },
          { "id": "p2-4", "num": 4, "label": "diaphragme", "accepted": ["diaphragme", "le diaphragme"] },
          { "id": "p2-5", "num": 5, "label": "cavité péritonéale", "hint": "déborde en haut vers la cavité thoracique", "accepted": ["cavité péritonéale", "cavite peritoneale", "la cavité péritonéale"] },
          { "id": "p2-6", "num": 6, "label": "péritoine", "accepted": ["péritoine", "peritoine", "le péritoine"] },
          { "id": "p2-7", "num": 7, "label": "ombilic", "hint": "projection en regard de L4", "accepted": ["ombilic", "l'ombilic"] },
          { "id": "p2-8", "num": 8, "label": "espace rétro péritonéal", "accepted": ["espace rétro péritonéal", "espace rétropéritonéal", "espace retro peritoneale", "espace rétro-péritonéal", "rétropéritoine"] },
          { "id": "p2-9", "num": 9, "label": "plan du détroit supérieur du bassin", "hint": "sépare cavités abdominale et pelvienne", "accepted": ["plan du détroit supérieur du bassin", "détroit supérieur du bassin", "détroit supérieur", "detroit superieur", "plan du detroit superieur du bassin"] },
          { "id": "p2-10", "num": 10, "label": "espace sous péritonéal", "hint": "en continuité avec l'espace rétro péritonéal", "accepted": ["espace sous péritonéal", "espace sous-péritonéal", "espace sous peritoneale", "sous péritoine"] },
          { "id": "p2-11", "num": 11, "label": "plan du périnée", "hint": "formations musculo-aponévrotiques", "accepted": ["plan du périnée", "plan du perinee", "périnée", "perinee", "le périnée"] }
        ]
      }
    ]
  },
  {
    "id": 3,
    "number": "Planche 3",
    "title": "Le squelette",
    "subtitle": "Observé de face (vue antérieure)",
    "note": "Authentique squelette humain (corps donné à la science)",
    "image": "images/planche_003.webp",
    "sections": [
      {
        "name": "Légende du squelette",
        "items": [
          { "id": "p3-1", "num": 1, "label": "tête", "accepted": ["tête", "tete", "la tête"] },
          { "id": "p3-2", "num": 2, "label": "clavicule", "accepted": ["clavicule", "la clavicule"] },
          { "id": "p3-3", "num": 3, "label": "sternum", "accepted": ["sternum", "le sternum"] },
          { "id": "p3-4", "num": 4, "label": "côte", "accepted": ["côte", "cote", "les côtes", "la côte", "côtes"] },
          { "id": "p3-5", "num": 5, "label": "humérus", "accepted": ["humérus", "humerus", "l'humérus"] },
          { "id": "p3-6", "num": 6, "label": "radius", "accepted": ["radius", "le radius"] },
          { "id": "p3-7", "num": 7, "label": "ulna (cubitus)", "accepted": ["ulna", "cubitus", "l'ulna", "le cubitus"] },
          { "id": "p3-8", "num": 8, "label": "carpe", "accepted": ["carpe", "le carpe"] },
          { "id": "p3-9", "num": 9, "label": "métacarpe", "accepted": ["métacarpe", "metacarpe", "le métacarpe"] },
          { "id": "p3-10", "num": 10, "label": "phalanges", "accepted": ["phalanges", "les phalanges", "phalange"] },
          { "id": "p3-11", "num": 11, "label": "colonne vertébrale (rachis)", "accepted": ["colonne vertébrale", "colonne vertebrale", "rachis", "la colonne vertébrale", "le rachis"] },
          { "id": "p3-12", "num": 12, "label": "os coxal", "accepted": ["os coxal", "coxal", "l'os coxal", "os iliaque"] },
          { "id": "p3-13", "num": 13, "label": "fémur", "accepted": ["fémur", "femur", "le fémur"] },
          { "id": "p3-14", "num": 14, "label": "patella (rotule)", "accepted": ["patella", "rotule", "la patella", "la rotule"] },
          { "id": "p3-15", "num": 15, "label": "fibula (péroné)", "accepted": ["fibula", "péroné", "perone", "la fibula", "le péroné"] },
          { "id": "p3-16", "num": 16, "label": "tarse", "accepted": ["tarse", "le tarse"] },
          { "id": "p3-17", "num": 17, "label": "métatarse", "accepted": ["métatarse", "metatarse", "le métatarse"] },
          { "id": "p3-18", "num": 18, "label": "phalanges (orteils)", "accepted": ["phalanges", "orteils", "les orteils", "les phalanges", "phalanges des orteils"] },
          { "id": "p3-19", "num": 19, "label": "tibia", "accepted": ["tibia", "le tibia"] }
        ]
      }
    ]
  },
  {
    "id": 4,
    "number": "Planche 4",
    "title": "Squelette de la tête",
    "subtitle": "Vue de face et vue de profil",
    "image": "images/planche_004.webp",
    "sections": [
      {
        "name": "A : Vue de face",
        "items": [
          { "id": "p4-a-1", "num": 1, "label": "frontal", "accepted": ["frontal", "os frontal", "l'os frontal"] },
          { "id": "p4-a-2", "num": 2, "label": "pariétal", "accepted": ["pariétal", "parietal", "os pariétal", "l'os parietal"] },
          { "id": "p4-a-3", "num": 3, "label": "os nasal", "accepted": ["os nasal", "nasal", "l'os nasal", "os propre du nez"] },
          { "id": "p4-a-4", "num": 4, "label": "sphénoïde", "accepted": ["sphénoïde", "sphenoide", "os sphénoïde", "l'os sphenoide"] },
          { "id": "p4-a-5", "num": 5, "label": "temporal", "accepted": ["temporal", "os temporal", "l'os temporal"] },
          { "id": "p4-a-6", "num": 6, "label": "rebord de l'orbite", "accepted": ["rebord de l'orbite", "rebord orbitaire", "orbite", "l'orbite"] },
          { "id": "p4-a-7", "num": 7, "label": "os zygomatique (malaire)", "accepted": ["os zygomatique", "zygomatique", "malaire", "os malaire", "l'os zygomatique"] },
          { "id": "p4-a-8", "num": 8, "label": "maxillaire", "accepted": ["maxillaire", "os maxillaire", "l'os maxillaire", "maxillaire supérieur"] },
          { "id": "p4-a-9", "num": 9, "label": "mandibule", "accepted": ["mandibule", "la mandibule", "maxillaire inférieur"] }
        ]
      },
      {
        "name": "B : Vue de profil",
        "items": [
          { "id": "p4-b-1", "num": 1, "label": "frontal", "accepted": ["frontal", "os frontal"] },
          { "id": "p4-b-2", "num": 2, "label": "sphénoïde", "accepted": ["sphénoïde", "sphenoide", "os sphénoïde"] },
          { "id": "p4-b-3", "num": 3, "label": "orbite", "accepted": ["orbite", "l'orbite"] },
          { "id": "p4-b-4", "num": 4, "label": "os nasal", "accepted": ["os nasal", "nasal", "os propre du nez"] },
          { "id": "p4-b-5", "num": 5, "label": "os zygomatique", "accepted": ["os zygomatique", "zygomatique", "malaire", "os malaire"] },
          { "id": "p4-b-6", "num": 6, "label": "maxillaire", "accepted": ["maxillaire", "os maxillaire"] },
          { "id": "p4-b-7", "num": 7, "label": "mandibule", "accepted": ["mandibule", "la mandibule"] },
          { "id": "p4-b-8", "num": 8, "label": "processus mastoïde", "accepted": ["processus mastoïde", "processus mastoide", "mastoïde", "apophyse mastoïde"] },
          { "id": "p4-b-9", "num": 9, "label": "méat acoustique externe", "hint": "conduit auditif externe", "accepted": ["méat acoustique externe", "meat acoustique externe", "conduit auditif externe", "conduit auditif"] },
          { "id": "p4-b-10", "num": 10, "label": "temporal", "accepted": ["temporal", "os temporal"] },
          { "id": "p4-b-11", "num": 11, "label": "occipital", "accepted": ["occipital", "os occipital"] },
          { "id": "p4-b-12", "num": 12, "label": "pariétal", "accepted": ["pariétal", "parietal", "os pariétal"] }
        ]
      }
    ]
  },
  {
    "id": 5,
    "number": "Planche 5",
    "title": "La tête en vue supérieure",
    "subtitle": "Chez l'adulte et chez le nouveau-né",
    "image": "images/planche_005.webp",
    "sections": [
      {
        "name": "A : Chez l'adulte",
        "items": [
          { "id": "p5-a-1", "num": 1, "label": "frontal", "accepted": ["frontal", "os frontal"] },
          { "id": "p5-a-2", "num": 2, "label": "os nasal", "accepted": ["os nasal", "nasal", "os propre du nez"] },
          { "id": "p5-a-3", "num": 3, "label": "suture coronale", "accepted": ["suture coronale", "la suture coronale", "coronale"] },
          { "id": "p5-a-4", "num": 4, "label": "pariétal", "accepted": ["pariétal", "parietal", "os pariétal"] },
          { "id": "p5-a-5", "num": 5, "label": "suture sagittale", "accepted": ["suture sagittale", "la suture sagittale", "sagittale"] },
          { "id": "p5-a-6", "num": 6, "label": "occipital", "accepted": ["occipital", "os occipital"] },
          { "id": "p5-a-7", "num": 7, "label": "suture lambdoïde", "accepted": ["suture lambdoïde", "suture lambdoide", "la suture lambdoïde", "lambdoïde"] }
        ]
      },
      {
        "name": "B : Chez le nouveau-né",
        "items": [
          { "id": "p5-b-1", "num": 1, "label": "fontanelle antérieure", "hint": "bregma", "accepted": ["fontanelle antérieure", "fontanelle anterieure", "la fontanelle antérieure", "bregma", "fontanelle bregmatique"] },
          { "id": "p5-b-2", "num": 2, "label": "suture sagittale", "accepted": ["suture sagittale", "la suture sagittale", "sagittale"] },
          { "id": "p5-b-3", "num": 3, "label": "fontanelle postérieure", "hint": "lambda", "accepted": ["fontanelle postérieure", "fontanelle posterieure", "la fontanelle postérieure", "lambda", "fontanelle lambdatique"] },
          { "id": "p5-b-4", "num": 4, "label": "suture coronale", "accepted": ["suture coronale", "la suture coronale", "coronale"] },
          { "id": "p5-b-5", "num": 5, "label": "suture lambdoïde", "accepted": ["suture lambdoïde", "suture lambdoide", "la suture lambdoïde", "lambdoïde"] }
        ]
      }
    ]
  },
  {
    "id": 6,
    "number": "Planche 6",
    "title": "Coupe frontale de la tête",
    "subtitle": "Passant par le massif facial",
    "image": "images/planche_006.webp",
    "sections": [
      {
        "name": "Légende de la coupe frontale",
        "items": [
          { "id": "p6-1", "num": 1, "label": "crâne", "accepted": ["crâne", "crane", "le crâne"] },
          { "id": "p6-2", "num": 2, "label": "os frontal", "accepted": ["os frontal", "frontal", "l'os frontal"] },
          { "id": "p6-4", "num": 4, "label": "os ethmoïde", "accepted": ["os ethmoïde", "os ethmoide", "ethmoïde", "ethmoide", "l'os ethmoïde"] },
          { "id": "p6-5", "num": 5, "label": "os zygomatique", "accepted": ["os zygomatique", "zygomatique", "malaire", "os malaire"] },
          { "id": "p6-6", "num": 6, "label": "sinus maxillaire", "accepted": ["sinus maxillaire", "le sinus maxillaire"] },
          { "id": "p6-7", "num": 7, "label": "cavité nasale", "accepted": ["cavité nasale", "cavite nasale", "cavités nasales", "fosses nasales", "fosse nasale"] },
          { "id": "p6-8", "num": 8, "label": "septum nasal (cloison nasale)", "accepted": ["septum nasal", "cloison nasale", "septum", "le septum nasal", "la cloison nasale"] },
          { "id": "p6-9", "num": 9, "label": "os maxillaire", "accepted": ["os maxillaire", "maxillaire", "l'os maxillaire"] },
          { "id": "p6-10", "num": 10, "label": "mandibule", "accepted": ["mandibule", "la mandibule"] }
        ]
      }
    ]
  },
  {
    "id": 7,
    "number": "Planche 7",
    "title": "Coupe sagittale de la tête",
    "subtitle": "Boîte crânienne et massif facial",
    "image": "images/planche_007.webp",
    "sections": [
      {
        "name": "Légende de la coupe sagittale",
        "items": [
          { "id": "p7-1", "num": 1, "label": "voûte du crâne", "accepted": ["voûte du crâne", "voute du crane", "la voûte du crâne", "calvaria"] },
          { "id": "p7-2", "num": 2, "label": "sphénoïde", "hint": "appartient à la base du crâne", "accepted": ["sphénoïde", "sphenoide", "os sphénoïde"] },
          { "id": "p7-3", "num": 3, "label": "occipital", "hint": "appartient en partie à la base du crâne", "accepted": ["occipital", "os occipital"] },
          { "id": "p7-4", "num": 4, "label": "ethmoïde", "hint": "appartient à la base du crâne", "accepted": ["ethmoïde", "ethmoide", "os ethmoïde"] },
          { "id": "p7-5", "num": 5, "label": "os nasal", "accepted": ["os nasal", "nasal", "os propre du nez"] },
          { "id": "p7-6", "num": 6, "label": "maxillaire", "accepted": ["maxillaire", "os maxillaire"] },
          { "id": "p7-7", "num": 7, "label": "neurocrâne (boîte crânienne)", "accepted": ["neurocrâne", "neurocrane", "boîte crânienne", "boite cranienne", "le neurocrâne"] }
        ]
      }
    ]
  },
  {
    "id": 8,
    "number": "Planche 8",
    "title": "Classification des os",
    "subtitle": "Exemple d'os long : l'humérus et autres types",
    "image": "images/planche_008.webp",
    "sections": [
      {
        "name": "A : Un exemple d'os long : l'humérus",
        "items": [
          { "id": "p8-a-1", "num": 1, "label": "épiphyse", "accepted": ["épiphyse", "epiphyse", "l'épiphyse", "épiphyse proximale"] },
          { "id": "p8-a-2", "num": 2, "label": "métaphyse", "accepted": ["métaphyse", "metaphyse", "la métaphyse"] },
          { "id": "p8-a-3", "num": 3, "label": "diaphyse (ou corps)", "accepted": ["diaphyse", "la diaphyse", "corps", "le corps"] }
        ]
      },
      {
        "name": "Autres vues de référence",
        "note": "B : Coupe longitudinale d'un os long | C : Coupes transversales | D & E : Scapula (omoplate) face et profil | F : Coupe d'os de la voûte",
        "items": []
      }
    ]
  },
  {
    "id": 9,
    "number": "Planche 9",
    "title": "Classification et croissance des os",
    "subtitle": "Os court et croissance de l'os long",
    "image": "images/planche_009.webp",
    "sections": [
      {
        "name": "C : Coupe longitudinale d'un os long chez le nouveau-né",
        "items": [
          { "id": "p9-c-1", "num": 1, "label": "noyau d'ossification métaphysaire", "accepted": ["noyau d'ossification métaphysaire", "noyau métaphysaire", "point d'ossification métaphysaire", "noyau d'ossification metaphysaire"] },
          { "id": "p9-c-2", "num": 2, "label": "périoste", "accepted": ["périoste", "perioste", "le périoste"] }
        ]
      },
      {
        "name": "D : Coupe longitudinale d'un os long chez l'enfant",
        "items": [
          { "id": "p9-d-1", "num": 1, "label": "noyau d'ossification épiphysaire", "accepted": ["noyau d'ossification épiphysaire", "noyau épiphysaire", "point d'ossification épiphysaire", "noyau d'ossification epiphysaire"] },
          { "id": "p9-d-2", "num": 2, "label": "noyau d'ossification diaphysaire", "accepted": ["noyau d'ossification diaphysaire", "noyau diaphysaire", "point d'ossification diaphysaire"] },
          { "id": "p9-d-3", "num": 3, "label": "cartilage de croissance (cartilage de conjugaison)", "accepted": ["cartilage de croissance", "cartilage de conjugaison", "le cartilage de croissance"] },
          { "id": "p9-d-4", "num": 4, "label": "périoste", "accepted": ["périoste", "perioste", "le périoste"] },
          { "id": "p9-d-5", "num": 5, "label": "canal médullaire", "accepted": ["canal médullaire", "canal medullaire", "le canal médullaire"] },
          { "id": "p9-d-6", "num": 6, "label": "diaphyse", "accepted": ["diaphyse", "la diaphyse"] }
        ]
      }
    ]
  },
  {
    "id": 10,
    "number": "Planche 10",
    "title": "La colonne vertébrale (rachis)",
    "subtitle": "Vue latérale",
    "image": "images/planche_010.webp",
    "sections": [
      {
        "name": "Étages du rachis",
        "items": [
          { "id": "p10-1", "num": 1, "label": "colonne vertébrale cervicale (rachis cervical)", "accepted": ["colonne vertébrale cervicale", "rachis cervical", "colonne cervicale"] },
          { "id": "p10-2", "num": 2, "label": "colonne vertébrale thoracique (rachis dorsal)", "accepted": ["colonne vertébrale thoracique", "rachis dorsal", "rachis thoracique", "colonne thoracique", "colonne dorsale"] },
          { "id": "p10-3", "num": 3, "label": "colonne vertébrale lombaire (rachis lombaire)", "accepted": ["colonne vertébrale lombaire", "rachis lombaire", "colonne lombaire"] },
          { "id": "p10-4", "num": 4, "label": "sacrum", "accepted": ["sacrum", "le sacrum"] },
          { "id": "p10-5", "num": 5, "label": "coccyx", "accepted": ["coccyx", "le coccyx"] }
        ]
      }
    ]
  },
  {
    "id": 11,
    "number": "Planche 11",
    "title": "Le thorax osseux",
    "subtitle": "Vue de face et profil droit",
    "image": "images/planche_011.webp",
    "sections": [
      {
        "name": "A : Vue de face",
        "items": [
          { "id": "p11-a-1", "num": 1, "label": "première vertèbre thoracique (Th1)", "accepted": ["première vertèbre thoracique", "premiere vertebre thoracique", "1ere vertèbre thoracique", "th1", "t1"] },
          { "id": "p11-a-2", "num": 2, "label": "première côte", "accepted": ["première côte", "premiere cote", "1ere côte", "la première côte"] },
          { "id": "p11-a-3", "num": 3, "label": "manubrium sternal", "accepted": ["manubrium sternal", "manubrium", "le manubrium sternal"] },
          { "id": "p11-a-4", "num": 4, "label": "corps du sternum", "accepted": ["corps du sternum", "corps sternal", "le corps du sternum"] },
          { "id": "p11-a-5", "num": 5, "label": "processus xiphoïde", "accepted": ["processus xiphoïde", "processus xiphoide", "appendice xiphoïde", "xiphoïde"] },
          { "id": "p11-a-6", "num": 6, "label": "11º vertèbre thoracique (Th11)", "accepted": ["11e vertèbre thoracique", "11ème vertèbre thoracique", "th11", "t11", "onzième vertèbre thoracique"] }
        ]
      },
      {
        "name": "B : Vue latérale droite (profil)",
        "items": [
          { "id": "p11-b-1", "num": 1, "label": "côte", "accepted": ["côte", "cote", "la côte"] },
          { "id": "p11-b-2", "num": 2, "label": "sternum", "accepted": ["sternum", "le sternum"] },
          { "id": "p11-b-3", "num": 3, "label": "vertèbre thoracique", "accepted": ["vertèbre thoracique", "vertebre thoracique", "la vertèbre thoracique"] }
        ]
      }
    ]
  },
  {
    "id": 12,
    "number": "Planche 12",
    "title": "La côte et le sternum",
    "subtitle": "Articulation costovertébrale et pièces du sternum",
    "image": "images/planche_012.webp",
    "sections": [
      {
        "name": "A : Côte et sa vertèbre en vue supérieure",
        "items": [
          { "id": "p12-a-1", "num": 1, "label": "vertèbre thoracique", "accepted": ["vertèbre thoracique", "vertebre thoracique"] },
          { "id": "p12-a-2", "num": 2, "label": "sternum", "accepted": ["sternum", "le sternum"] },
          { "id": "p12-a-3", "num": 3, "label": "côte osseuse (proprement dite)", "accepted": ["côte osseuse", "côte proprement dite", "côte", "cote osseuse", "cote"] },
          { "id": "p12-a-4", "num": 4, "label": "cartilage costal", "accepted": ["cartilage costal", "le cartilage costal"] }
        ]
      },
      {
        "name": "B : Le sternum vu de face",
        "items": [
          { "id": "p12-b-1", "num": 1, "label": "manubrium", "accepted": ["manubrium", "le manubrium", "manubrium sternal"] },
          { "id": "p12-b-2", "num": 2, "label": "corps", "accepted": ["corps", "le corps", "corps du sternum"] },
          { "id": "p12-b-3", "num": 3, "label": "processus (appendice) xiphoïde", "accepted": ["processus xiphoïde", "processus xiphoide", "appendice xiphoïde", "xiphoïde"] }
        ]
      }
    ]
  }
];

class AnatPassApp {
  constructor() {
    this.planches = (typeof window !== 'undefined' && window.PLANCHES_DATA && window.PLANCHES_DATA.length > 0) 
      ? window.PLANCHES_DATA 
      : EMBEDDED_PLANCHES;
    this.currentIndex = 0;
    this.soundEnabled = true;
    this.audioCtx = null;
    
    // Mode de rigueur des réponses : 'strict' (Examen PASS par défaut) ou 'tolerant'
    this.rigorMode = localStorage.getItem('anatpass_rigor_mode') || 'strict';

    // Zoom & Pan state
    this.zoom = 1.0;
    this.panX = 0;
    this.panY = 0;
    this.isPanning = false;
    this.startX = 0;
    this.startY = 0;

    // Progression persistée : { [itemId]: { val: string, correct: boolean, revealed: boolean, isSynonym: boolean, primaryOfficial: string } }
    this.userProgress = this.loadProgress();

    this.initDOM();
    this.initAudio();
    this.loadPlancheData();
    this.bindEvents();
    this.renderCurrentPlanche();
    this.updateGlobalStats();
  }

  /* ------------------------------------------------------------------------
     INITIALISATION DU DOM & ÉLÉMENTS
     ------------------------------------------------------------------------ */
  initDOM() {
    // Header
    this.headerPlancheNum = document.getElementById('header-planche-num');
    this.headerPlancheTitle = document.getElementById('header-planche-title');
    this.plancheDropdownBtn = document.getElementById('planche-dropdown-btn');
    this.plancheDropdownMenu = document.getElementById('planche-dropdown-menu');
    this.dropdownSearchInput = document.getElementById('dropdown-search-input');
    this.plancheListContainer = document.getElementById('planche-list');
    
    // Global stats header
    this.globalPercentText = document.getElementById('global-percent-text');
    this.globalRingFill = document.getElementById('global-ring-fill');
    this.globalMasteredText = document.getElementById('global-mastered-text');
    this.openStatsBtn = document.getElementById('open-stats-btn');

    // Header buttons
    this.toggleSoundBtn = document.getElementById('toggle-sound-btn');
    this.soundIconOn = document.getElementById('sound-icon-on');
    this.soundIconOff = document.getElementById('sound-icon-off');
    this.toggleHelpBtn = document.getElementById('toggle-help-btn');
    this.prevPlancheHeaderBtn = document.getElementById('prev-planche-header-btn');
    this.nextPlancheHeaderBtn = document.getElementById('next-planche-header-btn');

    // Workspace & Tablet View Switcher
    this.workspaceContainer = document.getElementById('workspace-container');
    this.viewModeToggle = document.getElementById('view-mode-toggle');
    this.viewModeBtns = document.querySelectorAll('.view-mode-btn');
    this.floatingDiagramBtn = document.getElementById('floating-diagram-btn');
    this.currentViewMode = 'split';

    // Détection appareil tactile (iPad / Android Tablet / Mobile)
    this.isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || window.matchMedia('(pointer: coarse)').matches;
    this.viewportHints = document.querySelector('.viewport-hints span');
    if (this.isTouchDevice && this.viewportHints) {
      this.viewportHints.textContent = '💡 Pincer pour zoomer • Glisser à 1 doigt • Double-tap pour recentrer';
    }

    // Diagram Viewer
    this.diagramTitle = document.getElementById('diagram-title');
    this.diagramSubtitle = document.getElementById('diagram-subtitle');
    this.diagramViewport = document.getElementById('diagram-viewport');
    this.diagramCanvas = document.getElementById('diagram-canvas');
    this.diagramImg = document.getElementById('diagram-img');
    this.zoomLevelText = document.getElementById('zoom-level-text');
    this.zoomInBtn = document.getElementById('zoom-in-btn');
    this.zoomOutBtn = document.getElementById('zoom-out-btn');
    this.zoomResetBtn = document.getElementById('zoom-reset-btn');
    this.fullscreenBtn = document.getElementById('fullscreen-btn');

    // Quiz Panel
    this.plancheScoreVal = document.getElementById('planche-score-val');
    this.plancheTotalVal = document.getElementById('planche-total-val');
    this.plancheStatusBadge = document.getElementById('planche-status-badge');
    this.plancheProgressFill = document.getElementById('planche-progress-fill');
    this.revealAllBtn = document.getElementById('reveal-all-btn');
    this.resetPlancheBtn = document.getElementById('reset-planche-btn');
    this.quizFormContainer = document.getElementById('quiz-form-container');
    this.prevPlancheBtn = document.getElementById('prev-planche-btn');
    this.nextPlancheBtn = document.getElementById('next-planche-btn');

    // Contrôles de Rigueur
    this.btnModeStrict = document.getElementById('btn-mode-strict');
    this.btnModeTolerant = document.getElementById('btn-mode-tolerant');
    this.rigorHelpBanner = document.getElementById('rigor-help-banner');
    this.updateRigorUI();

    // Modals
    this.helpModal = document.getElementById('help-modal');
    this.closeHelpBtn = document.getElementById('close-help-btn');
    this.statsModal = document.getElementById('stats-modal');
    this.closeStatsBtn = document.getElementById('close-stats-btn');
    this.statsMasteredCount = document.getElementById('stats-mastered-count');
    this.statsInProgressCount = document.getElementById('stats-in-progress-count');
    this.statsTotalCount = document.getElementById('stats-total-count');
    this.statsPlancheGrid = document.getElementById('stats-planche-grid');
    this.celebrationToast = document.getElementById('celebration-toast');

    // S'assurer que le menu déroulant est fermé au démarrage
    this.closeDropdown();
  }

  /* ------------------------------------------------------------------------
     GESTION DES MODES D'AFFICHAGE TABLETTE / DESKTOP (Schéma / Partagé / Test)
     ------------------------------------------------------------------------ */
  setViewMode(mode) {
    if (!['split', 'diagram', 'quiz'].includes(mode)) return;
    this.currentViewMode = mode;

    if (this.workspaceContainer) {
      this.workspaceContainer.setAttribute('data-view', mode);
    }

    if (this.viewModeBtns) {
      this.viewModeBtns.forEach(btn => {
        const isActive = (btn.getAttribute('data-view') === mode);
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    }

    // Afficher le bouton flottant "Voir le schéma" uniquement en mode quiz
    if (this.floatingDiagramBtn) {
      this.floatingDiagramBtn.hidden = (mode !== 'quiz');
    }

    if (mode === 'diagram') {
      setTimeout(() => this.resetZoom(), 60);
    } else if (mode === 'quiz') {
      setTimeout(() => {
        const firstEmpty = this.quizFormContainer.querySelector('.quiz-item-row:not(.is-correct) .item-input');
        if (firstEmpty) {
          firstEmpty.closest('.quiz-item-row')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 60);
    }
  }

  /* ------------------------------------------------------------------------
     GESTION DU MODE DE RIGUEUR (Strict PASS vs Tolérant)
     ------------------------------------------------------------------------ */
  setRigorMode(mode) {
    if (this.rigorMode === mode) return;
    this.rigorMode = mode;
    try {
      localStorage.setItem('anatpass_rigor_mode', mode);
    } catch (e) {}

    this.updateRigorUI();

    // Ré-évaluer immédiatement les réponses de la planche affichée
    const planche = this.planches[this.currentIndex];
    if (planche && Array.isArray(planche.sections)) {
      planche.sections.forEach(sec => {
        if (Array.isArray(sec.items)) {
          sec.items.forEach(item => {
            const saved = this.userProgress[item.id];
            const row = document.getElementById(`row-${item.id}`);
            const input = document.getElementById(`input-${item.id}`);
            const val = input ? input.value.trim() : (saved?.val || '');

            if (row && val && !saved?.revealed) {
              const evalRes = this.evaluateAnswer(val, item);
              if (evalRes.status === 'exact') {
                this.setItemCorrect(item, row, val, evalRes);
              } else if (evalRes.status === 'synonym') {
                if (this.rigorMode === 'strict') {
                  this.setItemSynonymWarning(item, row, val, evalRes);
                } else {
                  this.setItemCorrect(item, row, val, evalRes);
                }
              } else {
                this.setItemIncorrect(item, row);
              }
            }
          });
        }
      });
    }

    this.updatePlancheScore();
    this.updateGlobalStats();
  }

  updateRigorUI() {
    if (this.btnModeStrict && this.btnModeTolerant) {
      if (this.rigorMode === 'strict') {
        this.btnModeStrict.classList.add('active');
        this.btnModeTolerant.classList.remove('active');
        if (this.rigorHelpBanner) {
          this.rigorHelpBanner.innerHTML = '🎯 <strong>Mode Strict PASS actif :</strong> Seules les désignations officielles du cours sont validées. Si vous tapez un synonyme ou une ancienne nomenclature, l\'application vous indique la vraie réponse attendue.';
          this.rigorHelpBanner.className = 'rigor-help-banner banner-strict';
        }
      } else {
        this.btnModeStrict.classList.remove('active');
        this.btnModeTolerant.classList.add('active');
        if (this.rigorHelpBanner) {
          this.rigorHelpBanner.innerHTML = '📖 <strong>Mode Tolérant actif :</strong> Les synonymes anatomiques sont acceptés, mais la réponse officielle vraie est obligatoirement affichée en dessous.';
          this.rigorHelpBanner.className = 'rigor-help-banner banner-tolerant';
        }
      }
    }
  }

  /* ------------------------------------------------------------------------
     CHARGEMENT DONNÉES & PERSISTANCE
     ------------------------------------------------------------------------ */
  async loadPlancheData() {
    try {
      const resp = await fetch('data/planches.json');
      if (resp.ok) {
        const data = await resp.json();
        if (Array.isArray(data) && data.length > 0) {
          this.planches = data;
          this.renderDropdownList();
          this.renderCurrentPlanche();
          this.updateGlobalStats();
        }
      }
    } catch (e) {
      console.log('Utilisation du jeu de données interne embarqué.');
    }
    this.renderDropdownList();
  }

  loadProgress() {
    try {
      const saved = localStorage.getItem('anatpass_saved_answers');
      if (!saved) return {};
      const progress = JSON.parse(saved);
      // Nettoyage proactif de termes anatomiquement faux ou tronqués précédemment enregistrés
      for (const [id, itemState] of Object.entries(progress)) {
        if (itemState) {
          // Nettoyage des états sauvegardés tronqués sur planches corrigées (120, 121, 122, 133)
          if (id.startsWith('p120-') || id.startsWith('p121-') || id.startsWith('p122-') || id.startsWith('p133-')) {
            if (itemState.revealed) {
              delete progress[id];
              continue;
            }
            if (itemState.val && (itemState.val.endsWith('-') || itemState.val.endsWith(' du') || itemState.val.endsWith(' le') || itemState.val === 'ligne' || itemState.val === 'crête' || itemState.val === 'crete' || itemState.val === 'fosse' || itemState.val === 'temur' || itemState.val === 'témur')) {
              delete progress[id];
              continue;
            }
          }

          if (itemState.val) {
            const norm = this.normalizeString(itemState.val);
            if (norm === 'bassin' || norm === 'ventre' || norm === 'nombril' || norm === 'epine iliaque antero' || norm === 'epine iliaque postero' || norm === 'temur') {
              delete progress[id];
            }
          }
        }
      }
      return progress;
    } catch (e) {
      return {};
    }
  }

  saveProgress() {
    try {
      localStorage.setItem('anatpass_saved_answers', JSON.stringify(this.userProgress));
    } catch (e) {}
  }

  /* ------------------------------------------------------------------------
     SYNTHÈSE AUDIO WEB AUDIO API (Subtile, agréable et 100% hors-ligne)
     ------------------------------------------------------------------------ */
  initAudio() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      this.audioCtx = new AudioContext();
    }
  }

  playSuccessSound() {
    if (!this.soundEnabled || !this.audioCtx) return;
    if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

    const now = this.audioCtx.currentTime;
    
    // Note 1 (C5 - 523Hz)
    const osc1 = this.audioCtx.createOscillator();
    const gain1 = this.audioCtx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, now);
    gain1.gain.setValueAtTime(0.08, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc1.connect(gain1);
    gain1.connect(this.audioCtx.destination);
    osc1.start(now);
    osc1.stop(now + 0.18);

    // Note 2 (G5 - 783Hz harmonieuse)
    const osc2 = this.audioCtx.createOscillator();
    const gain2 = this.audioCtx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(783.99, now + 0.08);
    gain2.gain.setValueAtTime(0.09, now + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc2.connect(gain2);
    gain2.connect(this.audioCtx.destination);
    osc2.start(now + 0.08);
    osc2.stop(now + 0.35);
  }

  playErrorSound() {
    if (!this.soundEnabled || !this.audioCtx) return;
    if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(190, now);
    osc.frequency.exponentialRampToValueAtTime(130, now + 0.22);
    
    gain.gain.setValueAtTime(0.07, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  playWarningSound() {
    if (!this.soundEnabled || !this.audioCtx) return;
    if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.setValueAtTime(392, now + 0.08);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  playVictoryFanfare() {
    if (!this.soundEnabled || !this.audioCtx) return;
    if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const now = this.audioCtx.currentTime + idx * 0.1;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    });
  }

  /* ------------------------------------------------------------------------
     MOTEUR DE RIGUEUR ANATOMIQUE ET DE TOLÉRANCE ORTHOGRAPHIQUE MÉDICALE
     ------------------------------------------------------------------------ */
  normalizeString(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      // Enlève les accents
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      // Remplacement tirets et apostrophes (droites et courbes) par espaces
      .replace(/['’\-–—]/g, ' ')
      // Enlève parenthèses, ponctuation et symboles
      .replace(/[(),.:;!?_#+*]/g, ' ')
      // Supprime articles initiaux
      .replace(/^(le|la|les|l|un|une|des|du|au|aux)\s+/, '')
      // Compresse les espaces multiples
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Distance de Levenshtein (utilisée uniquement en mode tolérant pour mots longs)
  levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // suppression
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }

  /**
   * Analyse un item anatomique pour séparer sans ambiguïté :
   * - Le terme officiel du cours (nomenclature moderne officielle et ses variantes autorisées, y compris sigles comme EIAS)
   * - Les synonymes / anciennes nomenclatures à signaler ou à rejeter en mode strict
   */
  getItemOfficialAndSynonyms(item) {
    const rawLabel = (item.label || '').trim();
    let primaryOfficial = rawLabel;
    let parentheticalTerm = null;

    // Détection de variantes entre parenthèses, ex: "ulna (cubitus)", "épine iliaque (EIAS)"
    const matchParens = rawLabel.match(/^([^(]+)\s*\(([^)]+)\)/);
    if (matchParens) {
      primaryOfficial = matchParens[1].trim();
      parentheticalTerm = matchParens[2].trim();
    }

    const normPrimary = this.normalizeString(primaryOfficial);
    const normFullLabel = this.normalizeString(rawLabel);

    // Variantes exactes du terme officiel
    const exactVariants = new Set();
    if (normPrimary) exactVariants.add(normPrimary);
    if (normFullLabel) exactVariants.add(normFullLabel);

    // Si le terme officiel commence par "os " (ex: "os coxal", "os zygomatique")
    // accepter "coxal" ou "os coxal" comme officiel exact
    if (normPrimary.startsWith('os ')) {
      exactVariants.add(normPrimary.slice(3).trim());
    } else {
      exactVariants.add(`os ${normPrimary}`);
    }

    // Dictionnaire de référence des anciennes nomenclatures ou termes désuets connus
    const KNOWN_OLD_NOMENCLATURES = {
      'cubitus': { official: 'ulna', type: 'Ancienne nomenclature' },
      'rotule': { official: 'patella', type: 'Ancienne nomenclature' },
      'perone': { official: 'fibula', type: 'Ancienne nomenclature' },
      'os iliaque': { official: 'os coxal', type: 'Ancienne nomenclature' },
      'iliaque': { official: 'os coxal', type: 'Ancienne nomenclature' },
      'omoplate': { official: 'scapula', type: 'Ancienne nomenclature' },
      'astragale': { official: 'talus', type: 'Ancienne nomenclature' },
      'scaphoide tarsien': { official: 'os naviculaire', type: 'Ancienne nomenclature' },
      'trou obturateur': { official: 'foramen obturé', type: 'Ancienne nomenclature' },
      'trou obture': { official: 'foramen obturé', type: 'Ancienne nomenclature' },
      'trou ischio pubien': { official: 'foramen obturé', type: 'Ancienne nomenclature' },
      'cotyle': { official: 'acétabulum', type: 'Ancienne nomenclature' },
      'cavite cotyloide': { official: 'acétabulum', type: 'Ancienne nomenclature' },
      'crete pectineale': { official: 'pecten du pubis', type: 'Ancienne nomenclature' },
      'crete pectinee': { official: 'pecten du pubis', type: 'Ancienne nomenclature' },
      'epine du pubis': { official: 'tubercule pubien', type: 'Ancienne nomenclature' },
      'eminence iliopectinee': { official: 'éminence ilio-pubienne', type: 'Ancienne nomenclature' },
      'arriere fond acetabulaire': { official: 'fosse acétabulaire', type: 'Ancienne nomenclature' },
      'arriere fond de l acetabulum': { official: 'fosse acétabulaire', type: 'Ancienne nomenclature' },
      'fond acetabulaire': { official: 'fosse acétabulaire', type: 'Ancienne nomenclature' },
      'ligne inominee': { official: 'ligne arquée de l\'ilium', type: 'Ancienne nomenclature' },
      'ligne innominee': { official: 'ligne arquée de l\'ilium', type: 'Ancienne nomenclature' },
      'grande echancrure sciatique': { official: 'grande incisure ischiatique', type: 'Ancienne nomenclature' },
      'grande incisure sciatique': { official: 'grande incisure ischiatique', type: 'Ancienne nomenclature' },
      'petite echancrure sciatique': { official: 'petite incisure ischiatique', type: 'Ancienne nomenclature' },
      'petite incisure sciatique': { official: 'petite incisure ischiatique', type: 'Ancienne nomenclature' },
      'epine sciatique': { official: 'épine ischiatique', type: 'Ancienne nomenclature' },
      'tuberosite de l ischion': { official: 'tubérosité ischiatique', type: 'Ancienne nomenclature' },
      'gouttiere sus cotyloidienne': { official: 'sillon supra-acétabulaire', type: 'Ancienne nomenclature' },
      'branche descendante du pubis': { official: 'branche inférieure du pubis', type: 'Ancienne nomenclature' }
    };

    // Synonymes et anciennes nomenclatures
    const synonymVariants = new Set();
    const synonymDetails = [];

    // Traitement du contenu entre parenthèses
    if (parentheticalTerm) {
      // Les sigles anatomiques usuels (EIAS, EIAI, EIPS, EIPI, VCI, VCS...) sont officiels
      const isAcronym = /^[A-Z0-9]{2,5}$/.test(parentheticalTerm);
      const normParen = this.normalizeString(parentheticalTerm);
      if (isAcronym) {
        exactVariants.add(normParen);
      } else {
        synonymVariants.add(normParen);
        synonymDetails.push({ term: parentheticalTerm, norm: normParen });
      }

      // Si plusieurs termes dans la parenthèse (ex: "acétabulum / cotyle")
      if (parentheticalTerm.includes('/')) {
        parentheticalTerm.split('/').forEach(sub => {
          const sTrim = sub.trim();
          const sNorm = this.normalizeString(sTrim);
          if (sNorm) {
            synonymVariants.add(sNorm);
            synonymDetails.push({ term: sTrim, norm: sNorm });
          }
        });
      }
    }

    // Analyse des termes du tableau accepted
    if (Array.isArray(item.accepted)) {
      for (const rawTerm of item.accepted) {
        const normTerm = this.normalizeString(rawTerm);
        if (!normTerm) continue;

        // Si le terme fait partie des anciennes nomenclatures avérées
        if (KNOWN_OLD_NOMENCLATURES[normTerm]) {
          synonymVariants.add(normTerm);
          synonymDetails.push({
            term: rawTerm,
            norm: normTerm,
            info: KNOWN_OLD_NOMENCLATURES[normTerm]
          });
        } else {
          // Sinon, c'est une variante orthographique, un sigle ou un équivalent officiel légitime
          exactVariants.add(normTerm);
        }
      }
    }

    return {
      primaryOfficial,
      fullLabel: rawLabel,
      normPrimary,
      normFullLabel,
      exactVariants,
      synonymVariants,
      synonymDetails
    };
  }

  /**
   * Évalue la saisie utilisateur avec diagnostic précis :
   * - status: 'exact' -> terme officiel exact
   * - status: 'synonym' -> synonyme / ancienne nomenclature
   * - status: 'incorrect' -> terme faux ou non reconnu (ex: "bassin" pour "os coxal")
   */
  evaluateAnswer(userInput, item) {
    const cleanInput = this.normalizeString(userInput);
    if (!cleanInput) {
      return { status: 'empty', cleanInput: '' };
    }

    const info = this.getItemOfficialAndSynonyms(item);

    // 1. Terme officiel exact ?
    if (info.exactVariants.has(cleanInput)) {
      return {
        status: 'exact',
        cleanInput,
        primaryOfficial: info.primaryOfficial,
        fullLabel: info.fullLabel,
        isSynonym: false,
        displayLabel: info.primaryOfficial
      };
    }

    // 2. Synonyme ou ancienne nomenclature ?
    if (info.synonymVariants.has(cleanInput)) {
      const matchDetail = info.synonymDetails.find(d => d.norm === cleanInput);
      const matchedTerm = matchDetail ? matchDetail.term : userInput;
      return {
        status: 'synonym',
        cleanInput,
        matchedTerm,
        primaryOfficial: info.primaryOfficial,
        fullLabel: info.fullLabel,
        isSynonym: true,
        displayLabel: info.primaryOfficial,
        warningMessage: `« ${matchedTerm} » est une ancienne nomenclature ou un synonyme.`
      };
    }

    // 3. Tolérance de frappe (Levenshtein) UNIQUEMENT en mode tolérant pour mots très longs (>= 8 lettres)
    if (this.rigorMode === 'tolerant' && cleanInput.length >= 8) {
      if (this.levenshteinDistance(cleanInput, info.normPrimary) <= 1) {
        return {
          status: 'exact',
          cleanInput,
          primaryOfficial: info.primaryOfficial,
          fullLabel: info.fullLabel,
          isSynonym: false,
          displayLabel: info.primaryOfficial
        };
      }
    }

    // 4. Terme erroné ou hors nomenclature
    return {
      status: 'incorrect',
      cleanInput,
      primaryOfficial: info.primaryOfficial,
      fullLabel: info.fullLabel,
      isSynonym: false
    };
  }

  checkAnswer(userInput, item) {
    const res = this.evaluateAnswer(userInput, item);
    if (this.rigorMode === 'strict') {
      return res.status === 'exact';
    } else {
      return res.status === 'exact' || res.status === 'synonym';
    }
  }

  /* ------------------------------------------------------------------------
     AFFICHAGE DE LA PLANCHE COURANTE
     ------------------------------------------------------------------------ */
  renderCurrentPlanche() {
    const planche = this.planches[this.currentIndex];
    if (!planche) return;

    // Mise à jour de l'en-tête
    this.headerPlancheNum.textContent = planche.number;
    this.headerPlancheTitle.textContent = planche.title;
    this.diagramTitle.textContent = `${planche.number} : ${planche.title}`;
    this.diagramSubtitle.textContent = planche.subtitle || '';

    // Image du schéma
    this.diagramImg.src = planche.image;
    this.resetZoom();

    // Rendu du formulaire de quiz
    this.renderQuizForm(planche);
    this.updatePlancheScore();
    this.updateDropdownActive();

    // Focus sur le premier champ non rempli (uniquement sur ordinateur pour ne pas ouvrir le clavier virtuel intempestivement sur tablette)
    if (!this.isTouchDevice) {
      setTimeout(() => {
        const firstEmptyInput = this.quizFormContainer.querySelector('.quiz-item-row:not(.is-correct) .item-input');
        if (firstEmptyInput) {
          firstEmptyInput.focus();
        }
      }, 100);
    }
  }

  renderQuizForm(planche) {
    this.quizFormContainer.innerHTML = '';

    planche.sections.forEach(section => {
      const sectionEl = document.createElement('div');
      sectionEl.className = 'quiz-section';

      // Titre de section si présent
      if (section.name) {
        const headerEl = document.createElement('div');
        headerEl.className = 'section-header';
        headerEl.innerHTML = `<h3 class="section-title">${section.name}</h3>`;
        sectionEl.appendChild(headerEl);
      }

      // Note explicative si présente
      if (section.note) {
        const noteEl = document.createElement('div');
        noteEl.className = 'section-note-box';
        noteEl.innerHTML = `<strong>💡 Repère anatomique :</strong> ${section.note}`;
        sectionEl.appendChild(noteEl);
      }

      // Éléments interactifs
      if (Array.isArray(section.items) && section.items.length > 0) {
        section.items.forEach(item => {
          const row = this.createItemRow(item);
          sectionEl.appendChild(row);
        });
      }

      this.quizFormContainer.appendChild(sectionEl);
    });
  }

  createItemRow(item) {
    const row = document.createElement('div');
    row.className = 'quiz-item-row';
    row.id = `row-${item.id}`;

    // Récupération de l'état sauvegardé
    const savedState = this.userProgress[item.id] || { val: '', correct: false, revealed: false };

    let statusClass = '';
    let statusIcon = '';
    let bottomNoteHtml = '';

    if (savedState.correct) {
      if (savedState.isSynonym) {
        statusClass = 'is-synonym-accepted';
        statusIcon = `<svg class="icon-synonym" viewBox="0 0 20 20" fill="currentColor" title="Synonyme toléré"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>`;
        bottomNoteHtml = `<span class="official-reminder-text">📌 Terme officiel du cours : <strong>${savedState.primaryOfficial || item.label}</strong> (synonyme toléré)</span>`;
      } else {
        statusClass = 'is-correct';
        statusIcon = `<svg class="icon-correct" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>`;
        if (item.label && item.label.includes('(')) {
          bottomNoteHtml = `<span class="verified-official-text">✓ Terme officiel : ${item.label}</span>`;
        } else {
          bottomNoteHtml = `<span class="verified-official-text">✓ Terme officiel validé</span>`;
        }
      }
    } else if (savedState.revealed) {
      statusClass = 'is-revealed';
      statusIcon = `<svg class="icon-revealed" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/></svg>`;
      bottomNoteHtml = `<span class="revealed-text">Réponse officielle : ${item.label}</span>`;
    }

    if (statusClass) row.classList.add(statusClass);

    row.innerHTML = `
      <div class="item-num-badge" title="Cliquer pour écrire dans ce champ">${item.num}</div>
      <div class="item-input-wrapper">
        <input 
          type="text" 
          class="item-input" 
          id="input-${item.id}" 
          data-id="${item.id}"
          placeholder="Nom de la structure n°${item.num}..." 
          value="${savedState.val || (savedState.revealed ? item.label : '')}"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="none"
          spellcheck="false"
          enterkeyhint="next"
        />
        <div class="item-feedback-container" id="feedback-${item.id}">
          ${bottomNoteHtml}
        </div>
      </div>
      <div class="item-tools">
        ${item.hint ? `<button type="button" class="row-tool-btn hint-btn" title="Indice : ${item.hint}"><svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg></button>` : ''}
        <button type="button" class="row-tool-btn reveal-btn" data-id="${item.id}" title="Révéler la réponse">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
      <div class="row-status-icon" id="status-icon-${item.id}">
        ${statusIcon}
      </div>
    `;

    const input = row.querySelector('.item-input');
    const revealBtn = row.querySelector('.reveal-btn');
    const hintBtn = row.querySelector('.hint-btn');
    const badge = row.querySelector('.item-num-badge');

    // Clic sur le numéro pour activer le champ
    if (badge) {
      badge.addEventListener('click', () => input.focus());
    }

    // Centrage automatique du champ lors de l'ouverture du clavier virtuel sur tablette
    input.addEventListener('focus', () => {
      setTimeout(() => {
        row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 150);
    });

    // Événement à la frappe
    input.addEventListener('input', (e) => this.handleInput(e, item, row));
    // Touche Entrée / Navigation
    input.addEventListener('keydown', (e) => this.handleKeydown(e, item, row));
    // Perte de focus
    input.addEventListener('blur', (e) => this.handleBlur(e, item, row));
    // Révéler unitaire
    revealBtn.addEventListener('click', () => this.revealItem(item, row, input));

    if (hintBtn) {
      hintBtn.addEventListener('click', () => {
        alert(`💡 Indice pour le n°${item.num} :\n${item.hint}`);
      });
    }

    return row;
  }

  /* ------------------------------------------------------------------------
     GESTION DE LA SAISIE & VALIDATION
     ------------------------------------------------------------------------ */
  handleInput(e, item, row) {
    const val = e.target.value.trim();
    const feedbackContainer = row.querySelector('.item-feedback-container');
    const statusIcon = row.querySelector('.row-status-icon');

    // Si le champ est vidé
    if (!val) {
      row.classList.remove('is-correct', 'is-incorrect', 'is-synonym-warning', 'is-synonym-accepted');
      if (statusIcon) statusIcon.innerHTML = '';
      if (feedbackContainer) feedbackContainer.innerHTML = '';
      if (this.userProgress[item.id]) {
        delete this.userProgress[item.id];
        this.saveProgress();
        this.updatePlancheScore();
        this.updateGlobalStats();
      }
      return;
    }

    const evalResult = this.evaluateAnswer(val, item);

    // Si le terme exact officiel est tapé -> validation immédiate
    if (evalResult.status === 'exact') {
      this.setItemCorrect(item, row, val, evalResult);
      return;
    }

    // Si un synonyme est tapé
    if (evalResult.status === 'synonym') {
      if (this.rigorMode === 'strict') {
        // En mode strict : avertissement sans valider
        this.setItemSynonymWarning(item, row, val, evalResult);
      } else {
        // En mode tolérant : validation avec rappel obligatoire du terme officiel
        this.setItemCorrect(item, row, val, evalResult);
      }
      return;
    }

    // Si l'utilisateur est en cours de modification après une erreur
    if (row.classList.contains('is-incorrect') || row.classList.contains('is-synonym-warning')) {
      row.classList.remove('is-incorrect', 'is-synonym-warning');
      if (statusIcon) statusIcon.innerHTML = '';
      if (feedbackContainer) feedbackContainer.innerHTML = '';
    }
  }

  handleKeydown(e, item, row) {
    const input = e.target;
    const val = input.value.trim();

    if (e.key === 'Enter') {
      e.preventDefault();

      if (!val) {
        this.focusNextInput(input);
        return;
      }

      const evalResult = this.evaluateAnswer(val, item);

      if (evalResult.status === 'exact') {
        this.setItemCorrect(item, row, val, evalResult);
        this.focusNextInput(input);
      } else if (evalResult.status === 'synonym') {
        if (this.rigorMode === 'strict') {
          this.setItemSynonymWarning(item, row, val, evalResult);
          this.playWarningSound();
        } else {
          this.setItemCorrect(item, row, val, evalResult);
          this.focusNextInput(input);
        }
      } else {
        this.setItemIncorrect(item, row);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.focusNextInput(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.focusPrevInput(input);
    }
  }

  handleBlur(e, item, row) {
    const val = e.target.value.trim();
    if (!val) return;
    if (row.classList.contains('is-correct') || row.classList.contains('is-synonym-accepted')) return;

    const evalResult = this.evaluateAnswer(val, item);
    if (evalResult.status === 'exact') {
      this.setItemCorrect(item, row, val, evalResult);
    } else if (evalResult.status === 'synonym' && this.rigorMode === 'strict') {
      this.setItemSynonymWarning(item, row, val, evalResult);
    } else if (evalResult.status === 'synonym' && this.rigorMode === 'tolerant') {
      this.setItemCorrect(item, row, val, evalResult);
    }
  }

  setItemCorrect(item, row, val, evalResult) {
    row.classList.remove('is-incorrect', 'is-revealed', 'is-synonym-warning', 'is-synonym-accepted');

    const feedbackContainer = row.querySelector('.item-feedback-container');
    const statusIcon = row.querySelector('.row-status-icon');
    const isSyn = (evalResult && evalResult.isSynonym);

    if (isSyn) {
      row.classList.add('is-synonym-accepted');
      if (statusIcon) {
        statusIcon.innerHTML = `<svg class="icon-synonym" viewBox="0 0 20 20" fill="currentColor" title="Synonyme toléré"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>`;
      }
      if (feedbackContainer) {
        feedbackContainer.innerHTML = `<span class="official-reminder-text">📌 Terme officiel du cours : <strong>${evalResult.primaryOfficial || item.label}</strong> (synonyme toléré)</span>`;
      }
    } else {
      row.classList.add('is-correct');
      if (statusIcon) {
        statusIcon.innerHTML = `<svg class="icon-correct" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>`;
      }
      if (feedbackContainer) {
        if (item.label && item.label.includes('(')) {
          feedbackContainer.innerHTML = `<span class="verified-official-text">✓ Terme officiel : ${item.label}</span>`;
        } else {
          feedbackContainer.innerHTML = `<span class="verified-official-text">✓ Terme officiel validé</span>`;
        }
      }
    }

    this.userProgress[item.id] = {
      val: val,
      correct: true,
      revealed: false,
      isSynonym: isSyn,
      primaryOfficial: evalResult ? evalResult.primaryOfficial : item.label,
      officialLabel: item.label
    };
    this.saveProgress();

    this.playSuccessSound();
    this.updatePlancheScore();
    this.updateGlobalStats();
  }

  setItemSynonymWarning(item, row, val, evalResult) {
    row.classList.remove('is-correct', 'is-incorrect', 'is-revealed', 'is-synonym-accepted');
    row.classList.add('is-synonym-warning');

    const feedbackContainer = row.querySelector('.item-feedback-container');
    const statusIcon = row.querySelector('.row-status-icon');

    if (statusIcon) {
      statusIcon.innerHTML = `<svg class="icon-warning" viewBox="0 0 20 20" fill="currentColor" title="Synonyme refusé en mode strict"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>`;
    }

    if (feedbackContainer) {
      const matched = evalResult.matchedTerm || val;
      feedbackContainer.innerHTML = `<span class="synonym-warning-text">⚠️ « <em>${matched}</em> » est un synonyme / ancienne nomenclature (refusé en mode strict). Terme officiel attendu : <strong>${evalResult.primaryOfficial}</strong></span>`;
    }

    // En mode strict, un synonyme n'est PAS validé
    if (this.userProgress[item.id]) {
      delete this.userProgress[item.id];
      this.saveProgress();
      this.updatePlancheScore();
      this.updateGlobalStats();
    }
  }

  setItemIncorrect(item, row) {
    row.classList.remove('is-correct', 'is-synonym-warning', 'is-synonym-accepted', 'is-revealed');
    row.classList.add('is-incorrect');

    const statusIcon = row.querySelector('.row-status-icon');
    if (statusIcon) {
      statusIcon.innerHTML = `<svg class="icon-incorrect" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>`;
    }

    const feedbackContainer = row.querySelector('.item-feedback-container');
    if (feedbackContainer) {
      feedbackContainer.innerHTML = `<span class="incorrect-text">❌ Réponse incorrecte. Réessayez ou utilisez l'œil pour révéler.</span>`;
    }

    if (this.userProgress[item.id]) {
      delete this.userProgress[item.id];
      this.saveProgress();
      this.updatePlancheScore();
      this.updateGlobalStats();
    }

    this.playErrorSound();
  }

  revealItem(item, row, input) {
    row.classList.remove('is-incorrect', 'is-synonym-warning', 'is-synonym-accepted');
    row.classList.add('is-revealed');
    input.value = item.label;

    const feedbackContainer = row.querySelector('.item-feedback-container');
    if (feedbackContainer) {
      feedbackContainer.innerHTML = `<span class="revealed-text">Réponse officielle : ${item.label}</span>`;
    }

    const statusIcon = row.querySelector('.row-status-icon');
    if (statusIcon) {
      statusIcon.innerHTML = `<svg class="icon-revealed" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/></svg>`;
    }

    this.userProgress[item.id] = { val: item.label, correct: false, revealed: true };
    this.saveProgress();
    this.updatePlancheScore();
    this.updateGlobalStats();
  }

  focusNextInput(currentInput) {
    const inputs = Array.from(this.quizFormContainer.querySelectorAll('.item-input'));
    const index = inputs.indexOf(currentInput);
    if (index >= 0 && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  }

  focusPrevInput(currentInput) {
    const inputs = Array.from(this.quizFormContainer.querySelectorAll('.item-input'));
    const index = inputs.indexOf(currentInput);
    if (index > 0) {
      inputs[index - 1].focus();
    }
  }

  /* ------------------------------------------------------------------------
     ACTIONS GLOBALES DE LA PLANCHE
     ------------------------------------------------------------------------ */
  revealAllPlanche() {
    const planche = this.planches[this.currentIndex];
    planche.sections.forEach(section => {
      if (Array.isArray(section.items)) {
        section.items.forEach(item => {
          const row = document.getElementById(`row-${item.id}`);
          const input = document.getElementById(`input-${item.id}`);
          if (row && input && !row.classList.contains('is-correct')) {
            this.revealItem(item, row, input);
          }
        });
      }
    });
  }

  resetPlanche() {
    if (!confirm('Voulez-vous effacer toutes vos réponses sur cette planche pour la refaire ?')) {
      return;
    }

    const planche = this.planches[this.currentIndex];
    planche.sections.forEach(section => {
      if (Array.isArray(section.items)) {
        section.items.forEach(item => {
          delete this.userProgress[item.id];
          const row = document.getElementById(`row-${item.id}`);
          const input = document.getElementById(`input-${item.id}`);
          if (row && input) {
            row.className = 'quiz-item-row';
            input.value = '';
            const statusIcon = row.querySelector('.row-status-icon');
            if (statusIcon) statusIcon.innerHTML = '';
            const feedbackContainer = row.querySelector('.item-feedback-container');
            if (feedbackContainer) feedbackContainer.innerHTML = '';
          }
        });
      }
    });

    this.saveProgress();
    this.updatePlancheScore();
    this.updateGlobalStats();

    // Focus sur le 1er input
    const firstInput = this.quizFormContainer.querySelector('.item-input');
    if (firstInput) firstInput.focus();
  }

  updatePlancheScore() {
    const planche = this.planches[this.currentIndex];
    let total = 0;
    let correct = 0;

    planche.sections.forEach(sec => {
      if (Array.isArray(sec.items)) {
        total += sec.items.length;
        sec.items.forEach(item => {
          if (this.userProgress[item.id]?.correct) {
            correct++;
          }
        });
      }
    });

    this.plancheScoreVal.textContent = correct;
    this.plancheTotalVal.textContent = total;

    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
    this.plancheProgressFill.style.width = `${percent}%`;

    // Badge état
    this.plancheStatusBadge.className = 'status-badge';
    if (correct === 0) {
      this.plancheStatusBadge.classList.add('status-empty');
      this.plancheStatusBadge.textContent = 'Non commencé';
    } else if (correct === total) {
      this.plancheStatusBadge.classList.add('status-mastered');
      this.plancheStatusBadge.textContent = 'Maîtrisé 100%';
      this.showCelebration();
    } else {
      this.plancheStatusBadge.classList.add('status-in-progress');
      this.plancheStatusBadge.textContent = `${percent}% acquis`;
    }

    // Boutons de navigation
    this.prevPlancheBtn.disabled = (this.currentIndex === 0);
    this.nextPlancheBtn.disabled = (this.currentIndex === this.planches.length - 1);
    this.prevPlancheHeaderBtn.disabled = (this.currentIndex === 0);
    this.nextPlancheHeaderBtn.disabled = (this.currentIndex === this.planches.length - 1);
  }

  showCelebration() {
    this.playVictoryFanfare();
    this.celebrationToast.hidden = false;
    setTimeout(() => {
      this.celebrationToast.hidden = true;
    }, 3500);
  }

  /* ------------------------------------------------------------------------
     PAN & ZOOM SUR LE SCHÉMA ANATOMIQUE
     ------------------------------------------------------------------------ */
  applyTransform() {
    this.diagramCanvas.style.transform = `translate(${this.panX}px, ${this.panY}px) scale(${this.zoom})`;
    this.zoomLevelText.textContent = `${Math.round(this.zoom * 100)}%`;
  }

  resetZoom() {
    this.zoom = 1.0;
    this.panX = 0;
    this.panY = 0;
    this.applyTransform();
  }

  zoomBy(factor) {
    const newZoom = Math.min(Math.max(this.zoom * factor, 0.6), 4.0);
    this.zoom = newZoom;
    this.applyTransform();
  }

  /* ------------------------------------------------------------------------
     STATISTIQUES GLOBALES & DASHBOARD
     ------------------------------------------------------------------------ */
  updateGlobalStats() {
    let masteredCount = 0;
    let inProgressCount = 0;
    const totalPlanches = this.planches.length;

    this.planches.forEach(p => {
      let pTotal = 0;
      let pCorrect = 0;
      p.sections.forEach(s => {
        if (Array.isArray(s.items)) {
          pTotal += s.items.length;
          s.items.forEach(it => {
            if (this.userProgress[it.id]?.correct) pCorrect++;
          });
        }
      });

      if (pTotal > 0) {
        if (pCorrect === pTotal) masteredCount++;
        else if (pCorrect > 0) inProgressCount++;
      }
    });

    const percent = totalPlanches > 0 ? Math.round((masteredCount / totalPlanches) * 100) : 0;
    
    // Header Capsule
    this.globalPercentText.textContent = `${percent}%`;
    this.globalRingFill.setAttribute('stroke-dasharray', `${percent}, 100`);
    this.globalMasteredText.textContent = `${masteredCount} / ${totalPlanches} maîtrisées`;

    // Modal
    this.statsMasteredCount.textContent = masteredCount;
    this.statsInProgressCount.textContent = inProgressCount;
    this.statsTotalCount.textContent = totalPlanches;

    this.renderStatsModalGrid();
  }

  renderStatsModalGrid() {
    this.statsPlancheGrid.innerHTML = '';
    this.planches.forEach((p, idx) => {
      let pTotal = 0;
      let pCorrect = 0;
      p.sections.forEach(s => {
        if (Array.isArray(s.items)) {
          pTotal += s.items.length;
          s.items.forEach(it => {
            if (this.userProgress[it.id]?.correct) pCorrect++;
          });
        }
      });

      const row = document.createElement('div');
      row.className = 'stats-planche-row';
      const pct = pTotal > 0 ? Math.round((pCorrect / pTotal) * 100) : 0;

      let badge = `<span style="color:#64748b;">0%</span>`;
      if (pCorrect === pTotal && pTotal > 0) {
        badge = `<span style="color:#10b981;font-weight:700;">🟢 100%</span>`;
      } else if (pCorrect > 0) {
        badge = `<span style="color:#f59e0b;font-weight:600;">🟡 ${pct}%</span>`;
      }

      row.innerHTML = `
        <span class="truncate" style="cursor:pointer;" title="${p.number} : ${p.title}">
          <strong>${p.number}</strong>: ${p.title}
        </span>
        ${badge}
      `;

      row.addEventListener('click', () => {
        this.goToPlanche(idx);
        this.statsModal.close();
      });

      this.statsPlancheGrid.appendChild(row);
    });
  }

  /* ------------------------------------------------------------------------
     NAVIGATION ENTRE PLANCHES
     ------------------------------------------------------------------------ */
  goToPlanche(index) {
    if (index >= 0 && index < this.planches.length) {
      this.currentIndex = index;
      this.renderCurrentPlanche();
    }
  }

  renderDropdownList() {
    this.plancheListContainer.innerHTML = '';
    const filter = this.dropdownSearchInput.value.toLowerCase().trim();

    this.planches.forEach((p, idx) => {
      const matchText = `${p.number} ${p.title} ${p.subtitle || ''}`.toLowerCase();
      if (filter && !matchText.includes(filter)) return;

      const btn = document.createElement('button');
      btn.className = `planche-item-btn ${idx === this.currentIndex ? 'active' : ''}`;
      
      let pTotal = 0;
      let pCorrect = 0;
      p.sections.forEach(s => {
        if (Array.isArray(s.items)) {
          pTotal += s.items.length;
          s.items.forEach(it => {
            if (this.userProgress[it.id]?.correct) pCorrect++;
          });
        }
      });

      let badgeHtml = '';
      if (pTotal > 0 && pCorrect === pTotal) {
        badgeHtml = `<span class="item-badge mastered">100%</span>`;
      } else if (pCorrect > 0) {
        badgeHtml = `<span class="item-badge in-progress">${Math.round((pCorrect / pTotal) * 100)}%</span>`;
      }

      btn.innerHTML = `
        <div class="item-info truncate">
          <strong>${p.number}</strong>
          <span class="truncate">${p.title}</span>
        </div>
        ${badgeHtml}
      `;

      btn.addEventListener('click', () => {
        this.goToPlanche(idx);
        this.closeDropdown();
      });

      this.plancheListContainer.appendChild(btn);
    });
  }

  updateDropdownActive() {
    const btns = this.plancheListContainer.querySelectorAll('.planche-item-btn');
    btns.forEach((b, i) => {
      b.classList.toggle('active', i === this.currentIndex);
    });
  }

  toggleDropdown() {
    const isOpen = this.plancheDropdownMenu.classList.contains('is-open');
    if (!isOpen) {
      this.openDropdown();
    } else {
      this.closeDropdown();
    }
  }

  openDropdown() {
    this.plancheDropdownMenu.hidden = false;
    this.plancheDropdownMenu.classList.add('is-open');
    this.plancheDropdownBtn.setAttribute('aria-expanded', 'true');
    this.dropdownSearchInput.value = '';
    this.renderDropdownList();
    setTimeout(() => this.dropdownSearchInput.focus(), 50);
  }

  closeDropdown() {
    this.plancheDropdownMenu.hidden = true;
    this.plancheDropdownMenu.classList.remove('is-open');
    this.plancheDropdownBtn.setAttribute('aria-expanded', 'false');
  }

  /* ------------------------------------------------------------------------
     ÉVÉNEMENTS & ÉCOUTEURS
     ------------------------------------------------------------------------ */
  bindEvents() {
    // Navigation
    this.prevPlancheBtn.addEventListener('click', () => this.goToPlanche(this.currentIndex - 1));
    this.nextPlancheBtn.addEventListener('click', () => this.goToPlanche(this.currentIndex + 1));
    this.prevPlancheHeaderBtn.addEventListener('click', () => this.goToPlanche(this.currentIndex - 1));
    this.nextPlancheHeaderBtn.addEventListener('click', () => this.goToPlanche(this.currentIndex + 1));

    // Actions
    this.revealAllBtn.addEventListener('click', () => this.revealAllPlanche());
    this.resetPlancheBtn.addEventListener('click', () => this.resetPlanche());

    // Contrôle de rigueur des réponses (Strict PASS vs Tolérant)
    if (this.btnModeStrict) {
      this.btnModeStrict.addEventListener('click', () => this.setRigorMode('strict'));
    }
    if (this.btnModeTolerant) {
      this.btnModeTolerant.addEventListener('click', () => this.setRigorMode('tolerant'));
    }

    // Dropdown
    this.plancheDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleDropdown();
    });

    document.addEventListener('click', (e) => {
      if (!this.plancheDropdownMenu.contains(e.target) && !this.plancheDropdownBtn.contains(e.target)) {
        this.closeDropdown();
      }
    });

    this.dropdownSearchInput.addEventListener('input', () => this.renderDropdownList());

    // Son
    this.toggleSoundBtn.addEventListener('click', () => {
      this.soundEnabled = !this.soundEnabled;
      this.soundIconOn.hidden = !this.soundEnabled;
      this.soundIconOff.hidden = this.soundEnabled;
    });

    // Modals
    this.toggleHelpBtn.addEventListener('click', () => this.helpModal.showModal());
    this.closeHelpBtn.addEventListener('click', () => this.helpModal.close());
    this.openStatsBtn.addEventListener('click', () => {
      this.updateGlobalStats();
      this.statsModal.showModal();
    });
    this.closeStatsBtn.addEventListener('click', () => this.statsModal.close());

    // Fermeture modal clic backdrop
    this.helpModal.addEventListener('click', (e) => {
      if (e.target === this.helpModal) this.helpModal.close();
    });
    this.statsModal.addEventListener('click', (e) => {
      if (e.target === this.statsModal) this.statsModal.close();
    });

    // Modes d'affichage Tablette & Desktop (Schéma / Partagé / Test)
    if (this.viewModeBtns) {
      this.viewModeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const mode = btn.getAttribute('data-view');
          this.setViewMode(mode);
        });
      });
    }

    if (this.floatingDiagramBtn) {
      this.floatingDiagramBtn.addEventListener('click', () => {
        this.setViewMode('diagram');
      });
    }

    // Zoom & Pan boutons
    this.zoomInBtn.addEventListener('click', () => this.zoomBy(1.2));
    this.zoomOutBtn.addEventListener('click', () => this.zoomBy(0.83));
    this.zoomResetBtn.addEventListener('click', () => this.resetZoom());

    this.fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        this.diagramViewport.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });

    // Molette souris sur le schéma (Desktop)
    this.diagramViewport.addEventListener('wheel', (e) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.15 : 0.88;
      this.zoomBy(factor);
    }, { passive: false });

    // Drag / Pan à la souris (Desktop)
    this.diagramViewport.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return; // clic gauche uniquement
      this.isPanning = true;
      this.diagramViewport.classList.add('panning');
      this.startX = e.clientX - this.panX;
      this.startY = e.clientY - this.panY;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isPanning) return;
      this.panX = e.clientX - this.startX;
      this.panY = e.clientY - this.startY;
      this.applyTransform();
    });

    window.addEventListener('mouseup', () => {
      if (this.isPanning) {
        this.isPanning = false;
        this.diagramViewport.classList.remove('panning');
      }
    });

    /* ------------------------------------------------------------------------
       GESTES TACTILES TABLETTE (iPad / Android) : Pincer pour zoomer, Pan à 1 doigt, Double-tap
       ------------------------------------------------------------------------ */
    let touchStartX = 0;
    let touchStartY = 0;
    let touchInitialPanX = 0;
    let touchInitialPanY = 0;
    let touchInitialDist = 0;
    let touchInitialZoom = 1.0;
    let touchMidX = 0;
    let touchMidY = 0;
    let lastTapTime = 0;

    this.diagramViewport.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        const now = Date.now();
        const t = e.touches[0];

        // Détection du double-tap tactile
        if (now - lastTapTime < 320) {
          e.preventDefault();
          if (this.zoom > 1.25) {
            this.resetZoom();
          } else {
            const rect = this.diagramViewport.getBoundingClientRect();
            const tapX = t.clientX - rect.left - rect.width / 2;
            const tapY = t.clientY - rect.top - rect.height / 2;
            this.zoom = 2.2;
            this.panX = -tapX * 1.2;
            this.panY = -tapY * 1.2;
            this.applyTransform();
          }
          lastTapTime = 0;
          return;
        }
        lastTapTime = now;

        // Début de pan à 1 doigt
        touchStartX = t.clientX;
        touchStartY = t.clientY;
        touchInitialPanX = this.panX;
        touchInitialPanY = this.panY;
        this.diagramViewport.classList.add('panning');
      } else if (e.touches.length === 2) {
        e.preventDefault();
        // Début de pinch-to-zoom à 2 doigts
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        touchInitialDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
        touchInitialZoom = this.zoom;
        touchInitialPanX = this.panX;
        touchInitialPanY = this.panY;

        const rect = this.diagramViewport.getBoundingClientRect();
        const midScreenX = (t1.clientX + t2.clientX) / 2;
        const midScreenY = (t1.clientY + t2.clientY) / 2;
        touchMidX = midScreenX - rect.left - rect.width / 2;
        touchMidY = midScreenY - rect.top - rect.height / 2;
      }
    }, { passive: false });

    this.diagramViewport.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && !touchInitialDist) {
        // Déplacement à 1 doigt (Pan)
        e.preventDefault();
        const t = e.touches[0];
        const dx = t.clientX - touchStartX;
        const dy = t.clientY - touchStartY;
        this.panX = touchInitialPanX + dx;
        this.panY = touchInitialPanY + dy;
        this.applyTransform();
      } else if (e.touches.length === 2 && touchInitialDist > 5) {
        // Zoom par pincement (Pinch-to-zoom)
        e.preventDefault();
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const currentDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
        const scale = currentDist / touchInitialDist;
        const targetZoom = Math.min(Math.max(touchInitialZoom * scale, 0.5), 5.0);
        const zoomRatio = targetZoom / touchInitialZoom;

        this.panX = touchInitialPanX + (touchMidX - touchInitialPanX) * (1 - zoomRatio);
        this.panY = touchInitialPanY + (touchMidY - touchInitialPanY) * (1 - zoomRatio);
        this.zoom = targetZoom;
        this.applyTransform();
      }
    }, { passive: false });

    const endTouch = (e) => {
      if (e.touches.length === 1) {
        // Repasser en mode pan 1 doigt si un doigt est levé
        const t = e.touches[0];
        touchStartX = t.clientX;
        touchStartY = t.clientY;
        touchInitialPanX = this.panX;
        touchInitialPanY = this.panY;
        touchInitialDist = 0;
      } else if (e.touches.length === 0) {
        touchInitialDist = 0;
        this.diagramViewport.classList.remove('panning');
      }
    };

    this.diagramViewport.addEventListener('touchend', endTouch);
    this.diagramViewport.addEventListener('touchcancel', endTouch);

    // Ajustement dynamique lors de l'ouverture du clavier virtuel sur tablette
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', () => {
        if (document.activeElement && document.activeElement.classList.contains('item-input')) {
          document.activeElement.closest('.quiz-item-row')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    }

    // Changement d'orientation tablette (Portrait <-> Paysage)
    window.addEventListener('resize', () => {
      this.applyTransform();
    });

    // Raccourcis Clavier Globaux
    window.addEventListener('keydown', (e) => {
      // Si une modal est ouverte, laisser Echap fermer
      if (e.key === 'Escape') {
        this.closeDropdown();
        return;
      }

      // Alt + Flèche droite -> Suivant
      if (e.altKey && e.key === 'ArrowRight') {
        e.preventDefault();
        this.goToPlanche(this.currentIndex + 1);
      }
      // Alt + Flèche gauche -> Précédent
      else if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        this.goToPlanche(this.currentIndex - 1);
      }
      // Espace hors d'un input -> Reset Zoom
      else if (e.key === ' ' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        this.resetZoom();
      }
    });
  }
}

// Lancement à l'initialisation de la page
document.addEventListener('DOMContentLoaded', () => {
  window.anatPass = new AnatPassApp();
});
