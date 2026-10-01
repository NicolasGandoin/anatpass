# 🩺 Anat'PASS — Entraîneur de Schémas d'Anatomie (UE5)

Application interactive conçue pour l'apprentissage par cœur et la révision rapide des schémas d'anatomie (polycopié P.A.S.S. / Médecine).

---

## 🌐 Accès en ligne direct (iPad, Tablettes & Navigateur)

L'application est disponible 24h/24 en ligne :
👉 **[https://nicolasgandoin.github.io/anatpass/](https://nicolasgandoin.github.io/anatpass/)**

Sur votre iPad :
1. Ouvrez ce lien dans **Safari**.
2. Touchez le bouton **Partager ⎋** *(en haut à droite)*.
3. Touchez **« Sur l'écran d'accueil »** puis **« Ajouter »**.
4. L'application est installée sur votre iPad, en plein écran !

---

## 🚀 Comment lancer l'application en local sur Mac ?

1. Dans le dossier `anatomie`, **double-cliquez simplement sur le fichier `Lancer_AnatPASS.command`**.
2. L'application s'ouvre automatiquement dans votre navigateur (Safari, Chrome, etc.).

*(Alternative manuelle : vous pouvez aussi ouvrir directement `index.html` dans un navigateur).*

---

## 🎯 Fonctionnalités & Ergonomie

- **Écran partagé (Split-Screen)** :
  - **À gauche** : Le schéma anatomique original en haute définition, avec les numéros bien visibles, zoomable à la molette et déplaçable à la souris.
  - **À droite** : La feuille de test où **tous les textes ont été effacés**, ne laissant que les numéros et des zones de saisie.
- **Validation dynamique** :
  - Dès qu'un mot correct est saisi ou validé avec <kbd>Entrée</kbd> : le champ s'illumine en **Vert** 🟢 avec un son doux de confirmation, et le curseur passe automatiquement au champ suivant.
  - Si le mot est incorrect : le champ s'illumine en **Rouge** 🔴 avec une légère animation d'erreur.
- **Tolérance intelligente** :
  - Accepte avec ou sans accents (*ex: tête ou tete*).
  - Accepte avec ou sans articles (*ex: le thorax ou thorax*).
  - Accepte les synonymes et les termes officiels alternatifs (*ex: rotule ou patella, péroné ou fibula, cubitus ou ulna*).
- **Outils de révision** :
  - **Bouton œil (Révéler)** sur chaque ligne si l'on hésite ou bloque sur un numéro.
  - **Bouton "Tout révéler"** pour faire une révision passive avant de se tester.
  - **Bouton "Recommencer"** pour effacer la planche et la refaire jusqu'au sans-faute.
  - **Suivi de progression** : Sauvegarde automatique de l'avancement dans le navigateur (localStorage).
  - **Sélecteur de planches** avec recherche instantanée (*ex: chercher "crâne", "veineux", "thorax"*).

---

## 📱 Utilisation sur Tablette (iPad / Android) & Écrans Tactiles

Anat'PASS est 100% optimisé pour l'apprentissage sur tablette :

- **Gestes tactiles intuitifs** :
  - **Pincer pour zoomer (Pinch-to-zoom)** : Zoomez avec deux doigts directement sur les détails et petits numéros anatomiques.
  - **Glisser (Pan)** : Déplacez le schéma à un doigt sans faire défiler la page web.
  - **Double-tap** : Zoomez instantanément sur une zone ou recentrez le schéma.
- **Sélecteur de mode d'affichage** :
  - 🖼️ **Mode Schéma** : Affiche le schéma anatomique en plein écran pour la mémorisation visuelle et l'exploration des repères.
  - ⚖️ **Mode Partagé** : Vue double optimisée (côte à côte en paysage, ou empilée en portrait).
  - ✍️ **Mode Test** : Affiche uniquement la feuille de saisie en grand format avec un bouton flottant rapide *"Voir le schéma"*. Idéal quand le clavier virtuel est ouvert.
- **Ergonomie du clavier virtuel & Stylet** :
  - La touche bleue <kbd>Suivant ↵</kbd> du clavier virtuel valide automatiquement et avance au champ suivant.
  - Le champ actif reste toujours visible au-dessus du clavier virtuel.
  - Les champs sont protégés contre le zoom intempestif d'iOS Safari (taille minimale 16px).
  - **Compatible Apple Pencil** : Supporte la fonction *Gribouillage (Scribble)* pour écrire directement vos réponses au stylet dans les champs.
- **Installation sur l'écran d'accueil (PWA)** :
  - Sur Safari iPad : Touchez l'icône de partage ⎋ puis **« Sur l'écran d'accueil »**. L'application s'ouvre alors en plein écran sans barre d'adresse, comme une application native iPad !

---

## ⌨️ Raccourcis Clavier (Ordinateur)

| Raccourci | Action |
|---|---|
| <kbd>Entrée</kbd> | Valide la réponse et passe automatiquement au numéro suivant |
| <kbd>↓</kbd> / <kbd>↑</kbd> | Naviguer entre les champs |
| <kbd>Alt</kbd> + <kbd>→</kbd> | Planche suivante |
| <kbd>Alt</kbd> + <kbd>←</kbd> | Planche précédente |
| <kbd>Molette souris</kbd> | Zoomer / dézoomer sur le schéma |
| <kbd>Espace</kbd> | Réinitialiser le zoom du schéma |
| <kbd>Échap</kbd> | Fermer les fenêtres d'aide ou de menu |

---

## 📁 Contenu du projet

- `index.html` : Interface principale moderne et responsive.
- `style.css` : Thème sombre médical haute visibilité avec micro-animations.
- `app.js` : Moteur de tolérance lexicale, Web Audio API et navigation.
- `data/planches.json` & `data/planches.js` : Base de données complète des **135 planches** (2 170 termes anatomiques et synonymes).
- `images/` : 135 schémas haute résolution optimisés (WebP). Pour les planches 103 à 134, les légendes imprimées ont été masquées proprement pour préserver le test.
- `Lancer_AnatPASS.command` : Lanceur 1-clic pour macOS.
