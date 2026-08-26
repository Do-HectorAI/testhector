# Hector AI — maquette de refonte de la page d’accueil

Maquette de travail pour la refonte de la page d’accueil de **hector.legal**.
Objectif : qu’un avocat comprenne comment Hector fonctionne **sans réserver de démo**,
en se baladant dans une fausse interface de l’application posée dans le hero.

Ce n’est **pas** le site de production. C’est une base de discussion : l’équipe reprendra
sur le vrai site ce qui lui plaît.

---

## Lancer en local

Le site est statique, sans build et sans dépendance npm. Il faut quand même passer par un
serveur local (en `file://`, les `@font-face` ne se chargent pas) :

```bash
# depuis la racine du repo
python3 serve.py
# puis ouvrir http://localhost:8000
```

⚠️ **N’utilisez pas `python3 -m http.server`.** Il ne gère pas les requêtes HTTP « Range »
(lecture d’un fichier par morceaux) : Safari refuse alors de lire les vidéos et le fond du
hero reste figé sur son image fixe. Le script `serve.py` à la racine ne fait qu’ajouter ce
support — c’est sa seule raison d’être.

Alternatives qui gèrent les Range correctement : `npx serve .`, l’extension « Live Server »
de VS Code. Une fois déployé (GitHub Pages, Netlify, Vercel), la question ne se pose plus :
ces hébergeurs gèrent les Range nativement.

## Déployer sur GitHub Pages

Le repo est déjà à la bonne forme : `index.html` est à la racine, tous les chemins sont relatifs.

1. Pousser la branche `main` sur GitHub.
2. **Settings → Pages → Build and deployment**
   - *Source* : « Deploy from a branch »
   - *Branch* : `main`, dossier `/ (root)`
3. Sauvegarder. La page est publiée sous quelques minutes sur
   `https://<compte>.github.io/<repo>/`.

Rien d’autre à faire : pas de workflow, pas de `.nojekyll` nécessaire
(aucun fichier ni dossier ne commence par `_`).

---

## Structure

```
index.html              La page entière (+ le sprite d’icônes SVG en haut du <body>)
style.css               Tous les styles, commentés par section
script.js               Données en dur + navigation de la fausse interface + compteurs
serve.py                Serveur de développement local (non déployé, cf. « Lancer en local »)
assets/
  logo.svg              ⚠️ PLACEHOLDER — à remplacer par le vrai logo (voir plus bas)
  plume.png             La plume, utilisée dans le footer
  fonts/                Cabinet Grotesk (400/500/700/800) + Satoshi (500/700), .woff2
  img/
    hector-wordmark.webp  Logotype « Hector » utilisé DANS la fausse interface
    cabinets/             Logos des cabinets, repris du site actuel
  media/
    hero.mp4              Fond vidéo du hero (ré-encodé en 1600 px, sans audio : 3,5 Mo)
    mieux-conclure.mp4    Vidéo de la section « Mieux conclure, plus rapidement »
refs/                   Les trois captures de la vraie application (référence)
PROMPT.md               Le brief d’origine
```

---

## Ce qui a été fait

**Direction artistique** — noir, blanc, gris neutres. Aucune couleur d’accent, aucun dégradé.
Seules exceptions, **à l’intérieur de la fausse interface** et parce qu’elles figurent sur les
captures : le badge « Prêt » (vert très discret) et l’icône PDF (rouge).

**Typographie** — Cabinet Grotesk pour les titres, Satoshi Medium pour le texte courant,
téléchargées depuis Fontshare et **hébergées en local** (aucun CDN).

**Structure de la page**

1. En-tête repris du site actuel (mêmes libellés, mêmes liens), transparent sur le hero noir puis opaque au scroll.
2. Hero : fond vidéo désaturé, flouté et assombri, puis titre, sous-titre, **fausse interface**
   et les deux boutons. Les trois curseurs de réglage du fond (`--hero-video-opacity`,
   `--hero-video-blur`, `--hero-video-veil`) sont en haut de la section 6 de `style.css`.
   Mettre `--hero-video-opacity: 0` suffit à revenir à un fond noir uni.
3. Chiffres animés (compteur au scroll) + banderole de logos en boucle, en niveaux de gris, en pause au survol.
4. « Mieux conclure, plus rapidement » : texte et **vidéo repris tels quels**.
5. « Sécurité & confidentialité », « Notre vision », CTA final, wordmark, footer : **contenu identique au site actuel**, simplement rehabillé.

**La fausse interface** — entièrement HTML/CSS/JS, aucune donnée réelle, aucun appel réseau.
Toutes les données (les 8 pièces, les 8 actions rapides, les suggestions) sont en dur dans
`script.js`, en haut du fichier.

Trois écrans, navigables au clic :

| Élément cliqué | Résultat |
|---|---|
| Ligne « Techinov » (écran A) | → écran B, détail du dossier |
| « Dossiers » du fil d’Ariane (écran B) | → écran A |
| « Dossiers » dans la barre latérale | → écran A |
| « Nouvelle conversation » dans la barre latérale | → écran C |

Tout le reste (onglets, filtres, boutons secondaires, champs de saisie) est **décoratif** :
états de survol conservés, aucun effet, aucun écran vide possible.
Un halo léger et pulsé sur la ligne « Techinov » signale que l’interface est explorable ;
il disparaît au premier clic, en même temps que la légende sous le titre.

**Accessibilité / responsive**

- Seuls les quatre chemins de navigation sont tabulables ; les éléments décoratifs sont
  retirés du parcours clavier (`tabindex="-1"`) pour ne pas le polluer.
- Focus clavier visible partout, lien d’évitement en début de page.
- `prefers-reduced-motion` respecté : pas de banderole animée, pas de compteur, pas de halo,
  pas de rotation de la suggestion.
- Sous 900 px : la barre latérale disparaît, une navigation simplifiée à trois onglets
  la remplace, et toute la fenêtre est réduite à l’échelle (`zoom`) pour rester lisible.
- Aucun débordement horizontal de 320 px à 1920 px (vérifié).

---

## Où changer quoi

### Les polices

Les fichiers sont dans `assets/fonts/` et les `@font-face` en **haut de `style.css`** (section 1).
Pour changer une graisse ou une famille :

1. Télécharger le `.woff2` sur [fontshare.com](https://www.fontshare.com/) et le déposer dans `assets/fonts/`.
2. Ajouter / modifier le bloc `@font-face` correspondant.
3. Les deux familles sont ensuite utilisées via les variables `--font-heading` et `--font-body`
   (section 2 de `style.css`). Changer la famille partout = changer ces deux lignes.

### Les chiffres

Dans `index.html`, section « Chiffres » (`<section class="section stats-section">`).
Chaque bloc porte les attributs qui pilotent l’animation :

```html
<div class="stat-value" data-count="12" data-prefix="+ de " data-suffix=" h">+ de 0 h</div>
```

- `data-count` : la valeur finale (le compteur monte de 0 jusqu’à elle).
- `data-prefix` / `data-suffix` : ce qui encadre le nombre.
- Le texte à l’intérieur de la balise est ce qui s’affiche si JS est désactivé.

Les milliers sont séparés automatiquement (`270 000`).

### Le contenu de la fausse interface

Tout est en haut de `script.js` : `PIECES` (les 8 pièces), `QUICK_ACTIONS` (les 8 cartes),
`SUGGESTIONS` (les formulations qui tournent sur l’écran C).

### Les logos de cabinets

`assets/img/cabinets/`, listés deux fois dans `index.html` (section banderole) :
une fois pour le contenu, une fois en `aria-hidden` pour que la boucle soit continue.
**Si vous ajoutez ou retirez un logo, faites-le dans les deux groupes.**
Vitesse de défilement : `animation: marquee 55s` dans `style.css`.

---

## Ce qui reste à valider

- [ ] **Le logo.** `assets/logo.svg` est un **placeholder** : c’est le wordmark PNG existant
      encapsulé dans un SVG. À remplacer par le vrai fichier vectoriel, **même nom, même
      emplacement** (`assets/logo.svg`), ratio conseillé 24/5. Il est référencé à trois endroits
      (en-tête, bandeau de bas de page, footer) et recoloré en CSS (`filter: brightness(0)` /
      `invert(1)`) : il doit donc être **monochrome noir sur fond transparent**.
      Le logotype affiché *dans* la fausse interface est un fichier distinct
      (`assets/img/hector-wordmark.webp`), repris du site actuel.

- [ ] **Les valeurs chiffrées.** Reprises de la section chiffres de hector.legal le 25/08/2026 :
      **12 h** gagnées par semaine, **344** cabinets, **270 000** actes rédigés.
      À noter : le hero du site actuel affiche des valeurs différentes (« 344+ cabinets ·
      266 000+ actes générés »). Un `TODO` est laissé dans `index.html` — **à trancher.**

- [ ] **La fidélité de la fausse interface.** Comparée écran par écran aux trois captures
      de `refs/`. Deux libertés assumées :
      1. La fenêtre fait ~1180 px de large contre ~1700 px pour les captures : les textes sont
         donc un peu plus gros proportionnellement, pour rester lisibles dans un hero.
      2. Les icônes sont redessinées en SVG inline (style Lucide, comme l’app) et non extraites
         de l’application — l’icône PDF notamment est une approximation.

- [ ] **La section « Trois outils, une solution » a été retirée**, la fausse interface la
      remplaçant comme prévu au brief. Ses trois vidéos (analyse / rédaction / gestion) ne sont
      donc plus sur la page d’accueil ; elles restent sur `/comment-ca-marche.html`. À confirmer.

- [x] **Le bandeau de garanties** (« Hébergement OVH en France · Zéro rétention IA · … »),
      présent sur le site actuel entre la vidéo et la section noire, a été **retiré** de la
      maquette. Le contenu reste couvert plus bas par la section « Sécurité & confidentialité ».

- [ ] **La vidéo** `assets/media/mieux-conclure.mp4` (11 Mo) est une copie de celle du site actuel.
      Si le repo doit rester léger, on peut la pointer directement sur
      `https://www.hector.legal/assets/media/…` — mais la maquette ne serait plus autonome.

- [x] **Le footer** utilise la plume (`assets/plume.png`), comme le site actuel. Le wordmark
      (`assets/logo.svg`) reste utilisé dans l’en-tête et dans le bandeau de bas de page.
