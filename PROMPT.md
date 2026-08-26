# Prompt pour Claude Code

---

## Contexte

Je veux refondre la page d'accueil du site vitrine **hector.legal** (Hector AI, une IA française pour les avocats contentieux) pour la rendre beaucoup plus compréhensible dès les premières secondes.

Ce repo est une **maquette de travail** : elle servira à montrer la direction à mon équipe, qui reproduira ensuite les changements qui lui plaisent sur le vrai site. Ce n'est donc pas le site de production, mais le rendu doit être propre et déployable sur GitHub Pages.

**Première étape obligatoire : va lire https://www.hector.legal/ en entier** (structure, sections, textes, ordre des blocs, assets). Tu dois partir de l'existant, pas d'une page inventée.

**Deuxième étape obligatoire : regarde les captures d'écran dans `/refs`.** Ce sont des captures de la vraie application Hector. La fausse interface du hero doit les reproduire fidèlement (voir la section dédiée plus bas).

## Stack

- Site statique, sans build : `index.html` + `style.css` + `script.js` + `/assets`. Pas de framework, pas de dépendance npm.
- Déployable tel quel sur GitHub Pages (racine du repo).
- Responsive jusqu'au mobile, focus clavier visible, `prefers-reduced-motion` respecté.

## Direction artistique — à respecter strictement

**Couleurs : noir et blanc. C'est tout.** Aucune couleur d'accent, aucun dégradé coloré, aucune teinte. Seulement du noir, du blanc, et des gris neutres pour les bordures et le texte secondaire. Toute la hiérarchie visuelle doit passer par la typographie, le contraste et l'espace.

Seule exception tolérée, à l'intérieur de la fausse interface uniquement : les micro-signaux fonctionnels visibles sur les captures (badge « Prêt » en vert très discret, icône PDF rouge). Si tu peux t'en passer sans perdre en lisibilité, passe-t'en.

**Typographie :**
- Titres : **Cabinet Grotesk**
- Texte courant : **Satoshi Medium**

Les deux sont disponibles gratuitement sur Fontshare. Télécharge-les et héberge-les en local dans `/assets/fonts` avec des `@font-face` ; ne dépends pas d'un CDN.

**Logo :** je le déposerai moi-même dans `/assets`. Prévois l'emplacement et référence `assets/logo.svg` (crée un placeholder si le fichier n'existe pas encore).

---

## Structure de la page, dans cet ordre

### 1. En-tête — inchangé

Reprends l'en-tête actuel du site à l'identique : logo à gauche, liens « Comment ça marche ? », « FAQ », « Contact », puis les boutons « Se connecter » et « Réserver une démo ». Même disposition, mêmes libellés. Adapte simplement les couleurs pour qu'il reste lisible au-dessus du hero noir.

### 2. Hero — fond noir

Ne reprends rien du hero actuel (l'image et la vidéo de fond sautent).

- Fond **noir**.
- Titre : **L'IA des avocats contentieux**
- Sous-titre : **Hector accélère le traitement de vos procédures, de l'analyse du dossier au dernier jeu de conclusions.**
- En dessous : **une fausse interface de l'application Hector**, comme sur https://linear.app.

---

## LA FAUSSE INTERFACE — le cœur du travail

C'est l'élément central de la page. L'objectif : un avocat qui arrive sur le site doit **comprendre comment Hector fonctionne sans réserver de démo**, simplement en se baladant dedans.

### Principes

- C'est une **fausse interface**, entièrement codée en HTML/CSS/JS. Aucun backend, aucun appel réseau, aucune vraie donnée : tout est en dur dans le JS.
- Elle est **navigable au clic**. Ce n'est ni une image, ni une vidéo, ni un carrousel qui défile tout seul.
- Elle reproduit fidèlement les captures de `/refs` : mêmes écrans, même mise en page, mêmes libellés, mêmes contenus. Ne réinvente pas l'UI.
- Elle est affichée dans une fenêtre claire posée sur le fond noir du hero (l'app est blanche), avec un coin arrondi et une ombre portée franche pour la détacher.
- Va voir https://linear.app pour le niveau de finition attendu.

### Les trois écrans à coder

#### Écran A — « Dossiers » (état par défaut, capture 1)

**Barre latérale gauche** (présente sur les trois écrans, fond très légèrement grisé) :
- En haut : le logotype « Hector » + une icône de repli du panneau à droite.
- « Nouvelle conversation » (icône crayon) — **cliquable**.
- « Dossiers » (icône maison) — item actif, fond gris clair arrondi — **cliquable**.
- Label « MES CONVERSATIONS » en petites capitales grises.
- « Rechercher » (icône loupe) + une icône de filtre alignée à droite.
- Une conversation dans la liste : titre « Assignation référé dossier … », sous-titre « Techinov » avec une petite icône.
- Tout en bas : « Aide » (icône point d'interrogation), puis un avatar rond « D » avec « ll » et « Administrateur » en dessous.

**Zone principale** (carte blanche, coins arrondis, bordure fine) :
- Titre « Dossiers », sous-titre « Gérez et suivez vos dossiers juridiques ».
- En haut à droite, bouton noir « + Nouveau dossier ».
- Deux onglets : « Dossiers en cours » suivi d'un compteur `1` (actif, souligné en noir) et « Dossiers archivés » suivi de `0`.
- Un champ de recherche « Rechercher des dossiers… » et un bouton « Filtrer » (icône entonnoir).
- En-têtes de tableau en petites capitales grises : DOSSIER · PROCÉDURE · ÉCHÉANCE · PRIORITÉ · PARTAGÉ À · CRÉÉ LE.
- **Une seule ligne** : « Techinov » | badge arrondi « Droit Commercial » (icône balance) | échéance vide | icône de priorité | icône de partage | « 24 août » | menu ⋮.
- Le reste du tableau est vide (c'est normal, ne remplis pas).
- Pastille de chat flottante en bas à droite et petit bouton rond flottant sur le bord droit.

**Interaction : un clic sur la ligne « Techinov » ouvre l'écran B.**

#### Écran B — Détail du dossier Techinov (capture 2)

Déclenché par le clic sur « Techinov ».

**Barre latérale** : identique, sauf que « Dossiers » n'est plus l'item actif, que le label devient « DANS CE DOSSIER », et que la conversation « Assignation référé dossier … / Techinov » est en surbrillance.

**Zone principale** :
- Fil d'Ariane en haut à gauche : « Dossiers / **Techinov** » — le segment « Dossiers » est **cliquable et ramène à l'écran A**.
- À droite du fil d'Ariane, sur la même ligne : « Client **Techinov** », « Procédure **Droit Commercial** », « Statut ⓘ **En cours** », « ✎ Modifier », menu ⋮.
- Deux boutons segmentés : « Gestion des pièces » (actif, fond gris) et « Analyse avancée ». À droite, bouton bordé « Demander à Hector ».
- Rangée d'onglets : **Nos pièces** (actif, souligné) · Procédure · Notes client · Mes écritures · Partie adverse · Mes recherches juridiques · Chronologie.
- Barre d'outils : champ « Rechercher… », puis « # Numéroter mes pièces ⌄ », « Tamponner mes pièces », « Nouveau dossier », et bouton noir « Ajouter des pièces ».
- Ligne d'explication en gris : « Les pièces que vous versez au débat pour votre client — celles qui figureront au bordereau de communication. »
- Ligne « Fichiers - Sélectionner tous les fichiers » à gauche, « ⇅ Trier par N° pièce ↑ » à droite.
- **La liste des pièces**, chacune avec : petite icône PDF, titre en gras, description sur deux lignes en gris, et à droite un badge « ⊙ Prêt », la date « 24/08/2026 », une icône œil et un menu ⋮. Reprends **exactement** les huit pièces visibles sur la capture :

  1. **Attestation sur l'honneur du directeur général de Techinov** — Attestation signée par Jean-Marc Durand, président de Techinov, détaillant la situation critique de l'entreprise liée à une commande impérative pour EUROMOTIVE (livraison au 05/10/2025), bloquée par une rétention abusive de LOGISTRANS sur des marchandises stockées, avec risques financiers majeurs (pénalités, perte de contrat) et menace de dépôt…
  2. **Bon de commande TECHINNOV pour EUROMOTIVE du 20/08/2025** — Bon de commande n° BC-2025-08-1547 émis par EUROMOTIVE GROUP pour l'achat de 9 références de composants électroniques auprès de TECHINNOV, totalisant 2 291 000 € HT (2 749 200 € TTC). Livraison impérative au 05/10/2025 avec pénalités de retard de 15 000 €/jour et résiliation possible du contrat-cadre.
  3. **Bon de dépôt et inventaire des marchandises TECHINNOV du 05/08/2025** — Bon de dépôt n° BD-2025-0847 pour stockage de 1 247 palettes de composants électroniques (valeur totale 850 000 €) attribuées sur 4 zones d'entrepôt LOGISTRANS à Lyon. Conditions de stockage sécurisées avec assurance AXA plafonnée à 2M€. Durée prévisionnelle de 2 mois jusqu'au 05/10/2025.
  4. **Contestation de factures logistiques du 12/09/2025** — Courrier de contestation de trois factures (LOG-2025-EXC-001 à 003) pour prestations logistiques non prévues au contrat et non réalisées, avec demande d'annulation et mise en garde contre une surfacturation abusive.
  5. **Contrat-cadre de fourniture de composants électroniques entre EUROMOTIVE et TECHINNOV du 15/03/2024** — Contrat-cadre définissant les conditions de fourniture de composants électroniques par TECHINNOV à EUROMOTIVE pour une durée de 3 ans avec volumes annuels indicatifs et pénalités de retard de 15 000€ par jour. Clauses de résiliation pour manquement grave et garanties en cas de rupture du contrat.
  6. **Contrat de prestation logistique TECHINNOV LOGISTRANS du 01/02/2022** — Contrat entre la société TECHINNOV (Client) et LOGISTRANS (Prestataire) pour la gestion logistique de composants électroniques : stockage, manutention, transport et gestion des stocks. Durée de 3 ans renouvelable. Tarification mensuelle incluant frais de stockage, réception et transport.
  7. **Courrier de rétention de marchandises pour impayés** — Courrier électronique de Logistrans annonçant la suspension des prestations logistiques et l'exercice du droit de rétention sur des marchandises pour un montant total de 48 570,00 € TTC, avec inventaire de 1 247 palettes de composants électroniques d'une valeur de 850 000 €.
  8. **Échanges de courriels entre TECHINNOV et LOGISTRANS du 20 au 28 septembre 2025** — Correspondance urgente entre les deux sociétés concernant une rétention de marchandises pour créance contestée de 48 570 €, avec proposition transactionnelle de 30 000 € et menace de procédure judiciaire en cas de non-règlement.

- La liste doit être **scrollable à l'intérieur de la fenêtre** si elle dépasse la hauteur disponible, sans faire scroller la page.

#### Écran C — Nouvelle conversation (capture 3)

Déclenché par le clic sur « Nouvelle conversation » dans la barre latérale (depuis n'importe quel écran).

**Barre latérale** : identique à l'écran A (label « MES CONVERSATIONS », aucun item de navigation actif).

**Zone principale**, centrée verticalement, très aérée :
- Bouton « Canvas » discret en haut à droite.
- Le logotype « Hector » en très grand, au centre.
- Titre « Comment puis-je vous aider ? » en gras.
- En dessous, en gris : « Synthétiser les faits du dossier ». Sur la vraie app c'est une suggestion qui change ; tu peux la faire tourner lentement entre trois ou quatre formulations plausibles (« Synthétiser les faits du dossier », « Rédiger un jeu de conclusions », « Analyser les écritures adverses », « Établir la chronologie du dossier »).
- Bouton « 🗀 Sélectionner un dossier ⌄ ».
- Grande zone de saisie arrondie avec le placeholder « Décrivez ce que vous voulez faire … », une icône trombone en bas à gauche et une icône micro en bas à droite.
- Label « ACTIONS RAPIDES » à gauche, « Gérer » à droite.
- Une grille de cartes (4 par ligne), chacune avec un titre en gras et une description grise :
  - **Synthèse du dossier** — Vue d'ensemble avec structure et pièces citées
  - **Arguments pour mon client** — Stratégie argumentaire avec recherche de jurisprudence
  - **Rédiger mail client** — Point d'étape clair et sans jargon pour le client
  - **Répondre aux arguments adverses** — Analyse des écritures adverses et contre-argumentaire
  - **Tableau récapitulatif des pièces** — Inventaire structuré des documents du dossier
  - **Rechercher de la jurisprudence** — Recherche automatique sur les enjeux du dossier
  - **Vérifier mes sources** — Contrôle des citations juridiques du document
  - **Points de vigilance** — Risques, faiblesses et éléments manquants

### Règles de navigation

| Élément cliqué | Résultat |
|---|---|
| Ligne « Techinov » (écran A) | → écran B |
| « Dossiers » du fil d'Ariane (écran B) | → écran A |
| « Dossiers » dans la barre latérale | → écran A |
| « Nouvelle conversation » dans la barre latérale | → écran C |

Tous les autres éléments (onglets, filtres, boutons secondaires, champs de saisie) sont **décoratifs** : ils gardent leurs états de survol pour paraître vivants, mais ne font rien. Aucun clic ne doit produire d'écran vide ou d'erreur.

Ajoute une **indication visuelle discrète** que l'interface est explorable — par exemple un halo léger et pulsé sur la ligne « Techinov » au chargement, qui disparaît dès le premier clic. Pas de tooltip envahissant, pas de curseur animé.

### Fidélité et mobile

- Les captures font foi pour l'espacement, la taille des textes, les bordures et les états actifs. Compare ton rendu aux captures et corrige les écarts.
- Harmonise l'orthographe du client sur **Techinov** partout (les captures alternent avec « TECHINNOV » dans les descriptions de pièces — laisse les descriptions telles quelles, c'est du contenu de document).
- Sur mobile : masque la barre latérale, réduis l'échelle de l'interface et garde les trois écrans accessibles via une navigation simplifiée. Mieux vaut une version réduite mais lisible qu'une reproduction illisible.

---

### 3. Boutons — sous la fausse interface

- « Réserver une démo » → https://www.hector.legal/reserver
- « Voir comment ça marche en détail → » → https://www.hector.legal/comment-ca-marche.html

(l'ancien libellé « Voir Hector en action » est remplacé par « Voir comment ça marche en détail »)

### 4. Chiffres + banderole de logos

- Les chiffres du site actuel, **animés en compteur** qui monte quand la section entre dans le viewport (nombre d'heures gagnées par semaine, cabinets accompagnés, actes rédigés). Reprends les valeurs du site actuel ; laisse un `TODO` visible dans le code pour celles que tu ne trouves pas.
- En dessous, une **banderole défilante en boucle** avec les logos des cabinets (« Ils nous font confiance »). Reprends les logos du site actuel depuis `assets/img/cabinets/`. Défilement lent, en pause au survol, logos en niveaux de gris.

### 5. « Mieux conclure, plus rapidement »

Section reprise telle quelle du site actuel : même titre, même paragraphe, **même vidéo, intouchée**.

### 6. À partir de « Sécurité & confidentialité » — ne touche à rien

Toute la fin de la page reste identique au site actuel : section sécurité, « Notre vision », CTA final, footer. Reprends les textes et la structure à l'identique, en appliquant simplement la nouvelle charte noir et blanc et les nouvelles polices.

---

## Note

La section « Trois outils, une solution » du site actuel n'apparaît pas dans cette structure : la fausse interface du hero la remplace. Si tu penses qu'il faut la garder quand même, dis-le-moi avant de coder.

## Livrable

Un `README.md` à la racine qui explique comment lancer la page en local, comment la déployer sur GitHub Pages, où changer les polices et les chiffres, et la liste de ce qui reste à valider (logo, valeurs chiffrées, fidélité de la fausse interface).
