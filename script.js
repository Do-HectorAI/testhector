/* =====================================================================
   Hector AI — maquette de refonte de la page d'accueil
   Aucun backend, aucun appel réseau : toutes les données de la fausse
   interface sont en dur ci-dessous.
   ===================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -----------------------------------------------------------------
     Données de la fausse interface (reprises des captures de /refs)
     ----------------------------------------------------------------- */

  // Écran B — les huit pièces du dossier Techinov.
  // Les descriptions sont du contenu de document : l'orthographe
  // « TECHINNOV » y est conservée telle quelle, cf. PROMPT.md.
  var PIECES = [
    {
      title: 'Attestation sur l’honneur du directeur général de Techinov',
      desc: 'Attestation signée par Jean-Marc Durand, président de Techinov, détaillant la situation critique de l’entreprise liée à une commande impérative pour EUROMOTIVE (livraison au 05/10/2025), bloquée par une rétention abusive de LOGISTRANS sur des marchandises stockées, avec risques financiers majeurs (pénalités, perte de contrat) et menace de dépôt…'
    },
    {
      title: 'Bon de commande TECHINNOV pour EUROMOTIVE du 20/08/2025',
      desc: 'Bon de commande n° BC-2025-08-1547 émis par EUROMOTIVE GROUP pour l’achat de 9 références de composants électroniques auprès de TECHINNOV, totalisant 2 291 000 € HT (2 749 200 € TTC). Livraison impérative au 05/10/2025 avec pénalités de retard de 15 000 €/jour et résiliation possible du contrat-cadre.'
    },
    {
      title: 'Bon de dépôt et inventaire des marchandises TECHINNOV du 05/08/2025',
      desc: 'Bon de dépôt n° BD-2025-0847 pour stockage de 1 247 palettes de composants électroniques (valeur totale 850 000 €) attribuées sur 4 zones d’entrepôt LOGISTRANS à Lyon. Conditions de stockage sécurisées avec assurance AXA plafonnée à 2M€. Durée prévisionnelle de 2 mois jusqu’au 05/10/2025.'
    },
    {
      title: 'Contestation de factures logistiques du 12/09/2025',
      desc: 'Courrier de contestation de trois factures (LOG-2025-EXC-001 à 003) pour prestations logistiques non prévues au contrat et non réalisées, avec demande d’annulation et mise en garde contre une surfacturation abusive.'
    },
    {
      title: 'Contrat-cadre de fourniture de composants électroniques entre EUROMOTIVE et TECHINNOV du 15/03/2024',
      desc: 'Contrat-cadre définissant les conditions de fourniture de composants électroniques par TECHINNOV à EUROMOTIVE pour une durée de 3 ans avec volumes annuels indicatifs et pénalités de retard de 15 000€ par jour. Clauses de résiliation pour manquement grave et garanties en cas de rupture du contrat.'
    },
    {
      title: 'Contrat de prestation logistique TECHINNOV LOGISTRANS du 01/02/2022',
      desc: 'Contrat entre la société TECHINNOV (Client) et LOGISTRANS (Prestataire) pour la gestion logistique de composants électroniques : stockage, manutention, transport et gestion des stocks. Durée de 3 ans renouvelable. Tarification mensuelle incluant frais de stockage, réception et transport.'
    },
    {
      title: 'Courrier de rétention de marchandises pour impayés',
      desc: 'Courrier électronique de Logistrans annonçant la suspension des prestations logistiques et l’exercice du droit de rétention sur des marchandises pour un montant total de 48 570,00 € TTC, avec inventaire de 1 247 palettes de composants électroniques d’une valeur de 850 000 €.'
    },
    {
      title: 'Échanges de courriels entre TECHINNOV et LOGISTRANS du 20 au 28 septembre 2025',
      desc: 'Correspondance urgente entre les deux sociétés concernant une rétention de marchandises pour créance contestée de 48 570 €, avec proposition transactionnelle de 30 000 € et menace de procédure judiciaire en cas de non-règlement.'
    }
  ];

  // Écran C — actions rapides
  var QUICK_ACTIONS = [
    ['Synthèse du dossier', 'Vue d’ensemble avec structure et pièces citées'],
    ['Arguments pour mon client', 'Stratégie argumentaire avec recherche de jurisprudence'],
    ['Rédiger mail client', 'Point d’étape clair et sans jargon pour le client'],
    ['Répondre aux arguments adverses', 'Analyse des écritures adverses et contre-argumentaire'],
    ['Tableau récapitulatif des pièces', 'Inventaire structuré des documents du dossier'],
    ['Rechercher de la jurisprudence', 'Recherche automatique sur les enjeux du dossier'],
    ['Vérifier mes sources', 'Contrôle des citations juridiques du document'],
    ['Points de vigilance', 'Risques, faiblesses et éléments manquants']
  ];

  // Écran C — suggestion qui tourne lentement
  var SUGGESTIONS = [
    'Synthétiser les faits du dossier',
    'Rédiger un jeu de conclusions',
    'Analyser les écritures adverses',
    'Établir la chronologie du dossier'
  ];

  function icon(id, cls) {
    return '<svg class="i' + (cls ? ' ' + cls : '') + '"><use href="#' + id + '"/></svg>';
  }

  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* -----------------------------------------------------------------
     Rendu des listes en dur
     ----------------------------------------------------------------- */
  var piecesEl = document.getElementById('pieces');
  if (piecesEl) {
    piecesEl.innerHTML = PIECES.map(function (p) {
      return '<article class="piece">' +
        icon('i-pdf', 'piece-icon') +
        '<div class="piece-body">' +
          '<h3 class="piece-title">' + esc(p.title) + '</h3>' +
          '<p class="piece-desc">' + esc(p.desc) + '</p>' +
        '</div>' +
        '<div class="piece-aside">' +
          '<span class="badge-ready">' + icon('i-check-circle') + 'Prêt</span>' +
          '<span class="piece-date">24/08/2026</span>' +
          icon('i-eye') +
          icon('i-dots') +
        '</div>' +
      '</article>';
    }).join('');
  }

  var quickEl = document.getElementById('quick-grid');
  if (quickEl) {
    quickEl.innerHTML = QUICK_ACTIONS.map(function (a) {
      return '<button type="button" class="quick-card" tabindex="-1">' +
        '<h4>' + esc(a[0]) + '</h4><p>' + esc(a[1]) + '</p>' +
      '</button>';
    }).join('');
  }

  /* -----------------------------------------------------------------
     Navigation entre les trois écrans
     ----------------------------------------------------------------- */
  var app = document.getElementById('app');

  if (app) {
    var screens = app.querySelectorAll('.screen');
    var sideDossiers = document.getElementById('side-dossiers');
    var sideLabel = document.getElementById('side-label');
    var sideConv = document.getElementById('side-conv');
    var mobileTabs = document.querySelectorAll('.app-mobile-nav [data-goto]');
    var pulsingRow = document.getElementById('row-techinov');
    var demoHint = document.getElementById('demo-hint');

    function showScreen(name) {
      app.setAttribute('data-screen', name);

      for (var i = 0; i < screens.length; i++) {
        screens[i].hidden = screens[i].getAttribute('data-name') !== name;
      }

      // Barre latérale : états actifs selon l'écran, cf. captures
      sideDossiers.classList.toggle('is-active', name === 'dossiers');
      sideLabel.textContent = name === 'dossier' ? 'Dans ce dossier' : 'Mes conversations';
      sideConv.classList.toggle('is-active', name === 'dossier');

      for (var j = 0; j < mobileTabs.length; j++) {
        mobileTabs[j].setAttribute('aria-selected', String(mobileTabs[j].getAttribute('data-goto') === name));
      }

      // La liste des pièces repart du haut
      if (name === 'dossier' && piecesEl) piecesEl.scrollTop = 0;
    }

    // Au premier clic, l'utilisateur a compris que l'interface répond :
    // le halo de la ligne et l'indication de départ s'effacent.
    function stopPulse() {
      if (pulsingRow) pulsingRow.classList.remove('is-pulsing');
      if (demoHint) demoHint.classList.add('is-hidden');
    }

    // Tout élément porteur de data-goto navigue ; le premier clic
    // n'importe où dans la fenêtre éteint l'indication visuelle.
    app.addEventListener('click', function (e) {
      stopPulse();
      var target = e.target.closest('[data-goto]');
      if (target && app.contains(target)) showScreen(target.getAttribute('data-goto'));
    });

    for (var k = 0; k < mobileTabs.length; k++) {
      mobileTabs[k].addEventListener('click', function () {
        stopPulse();
        showScreen(this.getAttribute('data-goto'));
      });
    }

    showScreen('dossiers');

    // Les éléments décoratifs restent survolables mais sortent du parcours
    // clavier : seuls les quatre chemins de navigation sont tabulables.
    var decorative = app.querySelectorAll('button:not([data-goto])');
    for (var t = 0; t < decorative.length; t++) decorative[t].setAttribute('tabindex', '-1');

    /* --- Suggestion qui tourne lentement (écran C) --- */
    var suggestionEl = document.getElementById('ask-suggestion');
    if (suggestionEl && !reduceMotion) {
      var idx = 0;
      setInterval(function () {
        if (app.getAttribute('data-screen') !== 'conversation') return;
        suggestionEl.classList.add('is-fading');
        setTimeout(function () {
          idx = (idx + 1) % SUGGESTIONS.length;
          suggestionEl.textContent = SUGGESTIONS[idx];
          suggestionEl.classList.remove('is-fading');
        }, 400);
      }, 4000);
    }
  }

  /* -----------------------------------------------------------------
     Hero : le média se rétracte sur les côtés au scroll

     Le hero est une section normale : la page défile comme partout ailleurs,
     rien n'est épinglé. On mesure simplement la part du hero déjà passée
     au-dessus du viewport, et on n'agit que sur sa seconde moitié :

       0 → 50 % défilé   : rien ne bouge, image pleine largeur
       50 → 100 % défilé : les côtés se rétractent et les coins s'arrondissent

     La valeur ne dépend que de la position de scroll, jamais du sens : en
     remontant, l'image se ré-étend d'elle-même.

     Seul clipPath est écrit, donc aucun recalcul de mise en page par image.
     Aucun écouteur de scroll : un IntersectionObserver démarre et arrête une
     boucle requestAnimationFrame, active seulement hero à l'écran.
     Réglages : jetons --hero-clip-* en tête de la section 6 de style.css.
     ----------------------------------------------------------------- */
  var heroEl = document.querySelector('.hero');

  if (heroEl && !reduceMotion &&
      window.CSS && CSS.supports && CSS.supports('clip-path', 'inset(1px round 1px)')) {
    var clipped = [heroEl.querySelector('.hero-media'), heroEl.querySelector('.hero-marquee')];
    var heroCss = getComputedStyle(heroEl);

    function token(name, fallback) {
      var v = parseFloat(heroCss.getPropertyValue(name));
      return isNaN(v) ? fallback : v;
    }
    // clamp(min, vw, max) reconstruit en JS : getComputedStyle ne résout pas
    // les clamp() écrits dans une propriété personnalisée.
    function clampVw(min, vw, max) {
      return Math.max(min, Math.min(vw * window.innerWidth / 100, max));
    }

    var xMin = token('--hero-clip-x-min', 16), xVw = token('--hero-clip-x-vw', 5), xMax = token('--hero-clip-x-max', 76);
    var rMin = token('--hero-clip-r-min', 16), rVw = token('--hero-clip-r-vw', 2), rMax = token('--hero-clip-r-max', 32);
    var yMax = token('--hero-clip-y-max', 0);
    var startFrac = token('--hero-clip-start', .5);
    var runFrac = token('--hero-clip-run', .5);

    var running = false;
    var last = -1;

    function paintHero() {
      var h = heroEl.offsetHeight;
      var scrolled = -heroEl.getBoundingClientRect().top;
      var begin = startFrac * h;          // rien avant la mi-hauteur
      var span = runFrac * h;             // durée de la rétraction
      var p = span > 0 ? (scrolled - begin) / span : 0;
      p = Math.max(0, Math.min(1, p));
      var eased = 1 - Math.pow(1 - p, 3); // ease-out cubique

      if (Math.abs(eased - last) > 0.001) {
        last = eased;
        var x = (clampVw(xMin, xVw, xMax) * eased).toFixed(1);
        var y = (yMax * eased).toFixed(1);
        var r = (clampVw(rMin, rVw, rMax) * eased).toFixed(1);
        clipped[0].style.clipPath = 'inset(' + y + 'px ' + x + 'px ' + y + 'px ' + x + 'px round ' + r + 'px)';
        // La banderole suit la marge latérale mais pas l'arrondi : ses logos
        // déborderaient sinon du panneau, sur le fond clair de la page.
        if (clipped[1]) clipped[1].style.clipPath = 'inset(0px ' + x + 'px 0px ' + x + 'px)';
      }
      if (running) requestAnimationFrame(paintHero);
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        var visible = entries[0].isIntersecting;
        if (visible && !running) { running = true; requestAnimationFrame(paintHero); }
        else if (!visible) { running = false; }
      }, { threshold: 0 }).observe(heroEl);
    } else {
      running = true; requestAnimationFrame(paintHero);
    }

    // Les plafonds dépendent de la largeur : on repeint au redimensionnement.
    window.addEventListener('resize', function () {
      last = -1;
      if (!running) paintHero();
    });
  }

  /* -----------------------------------------------------------------
     Vidéo de la démonstration : pas de lecture automatique si
     l'utilisateur limite les animations. Les contrôles restent là.
     ----------------------------------------------------------------- */
  var demoVideo = document.querySelector('.demo-video video');
  if (demoVideo && reduceMotion) {
    demoVideo.removeAttribute('autoplay');
    demoVideo.autoplay = false;
    demoVideo.pause();
  }

  /* -----------------------------------------------------------------
     En-tête : opaque une fois le hero dépassé
     ----------------------------------------------------------------- */
  var header = document.getElementById('site-header');
  var hero = document.querySelector('.hero');
  if (header && hero) {
    var onScroll = function () {
      var limit = hero.offsetHeight - header.offsetHeight;
      var pastHero = window.scrollY > limit;
      header.classList.toggle('is-solid', pastHero);
      header.classList.toggle('is-dark', !pastHero && window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }

  /* -----------------------------------------------------------------
     Menu mobile
     ----------------------------------------------------------------- */
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* -----------------------------------------------------------------
     Fonctionnalités : carrousel à onglets
     Motif ARIA « tabs » : un seul onglet tabulable à la fois (roving
     tabindex), flèches pour circuler, Home/Fin pour les extrémités.
     Les cartes masquées restent dans le DOM pour permettre le
     glissement, mais sont neutralisées (inert + aria-hidden).
     ----------------------------------------------------------------- */
  var carousel = document.getElementById('features-carousel');

  if (carousel) {
    var rail = document.getElementById('feat-rail');
    var tabs = carousel.querySelectorAll('.feat-tab');
    var cards = carousel.querySelectorAll('.feat-card');
    var current = 0;

    function selectFeature(index, moveFocus) {
      current = index;

      for (var i = 0; i < tabs.length; i++) {
        var active = i === index;
        tabs[i].classList.toggle('is-active', active);
        tabs[i].setAttribute('aria-selected', String(active));
        // Roving tabindex : seul l'onglet actif est atteignable au clavier.
        tabs[i].setAttribute('tabindex', active ? '0' : '-1');

        // La carte inactive sort du parcours clavier et des lecteurs d'écran.
        // `inert` suffit là où il est reconnu ; aria-hidden et le tabindex du
        // lien assurent le repli sur les navigateurs plus anciens.
        cards[i].inert = !active;
        cards[i].setAttribute('aria-hidden', String(!active));
        var link = cards[i].querySelector('.feat-card__link');
        if (link) link.setAttribute('tabindex', active ? '0' : '-1');
      }

      rail.style.transform = 'translateX(' + (-index * (100 / tabs.length)) + '%)';
      if (moveFocus) tabs[index].focus();
    }

    for (var t = 0; t < tabs.length; t++) {
      (function (i) {
        tabs[i].addEventListener('click', function () { selectFeature(i, false); });
      })(t);
    }

    carousel.querySelector('.feat-tabs').addEventListener('keydown', function (e) {
      var last = tabs.length - 1;
      var next;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = current === last ? 0 : current + 1;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = current === 0 ? last : current - 1;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = last;
      else return;

      e.preventDefault();
      selectFeature(next, true);
    });

    selectFeature(0, false);
  }

  /* -----------------------------------------------------------------
     Chiffres : séquence plein écran

     Le bloc est épinglé sur trois hauteurs d'écran, une par chiffre. On
     mesure la progression sur la section, on la convertit en position
     continue entre 0 et n-1, et chaque chiffre en déduit son opacité selon
     sa distance d à cette position :

       |d| <= hold   : pleinement visible
       hold → fade   : il s'efface
       |d| >= fade   : invisible

     Avec hold .25 et fade .5, un chiffre a totalement disparu avant que le
     suivant ne commence à apparaître : à mi-chemin l'écran est vide, ce qui
     donne bien « il disparaît, puis l'autre apparaît » plutôt qu'un fondu
     enchaîné. La séquence se rejoue à l'envers en remontant, puisque la
     position ne dépend que du scroll.

     Seuls transform et opacity sont écrits : aucun recalcul de mise en page.
     Aucun écouteur de scroll ; un IntersectionObserver démarre et arrête une
     boucle requestAnimationFrame.
     ----------------------------------------------------------------- */
  var statsSection = document.querySelector('.stats');

  if (statsSection && !reduceMotion) {
    var stats = statsSection.querySelectorAll('.stat');
    var statCount = stats.length;

    if (statCount > 1) {
      var statsCss = getComputedStyle(statsSection);
      function statToken(name, fallback) {
        var v = parseFloat(statsCss.getPropertyValue(name));
        return isNaN(v) ? fallback : v;
      }
      var HOLD = statToken('--stats-hold', .25);
      var FADE = statToken('--stats-fade', .5);
      var RISE = statToken('--stats-rise', 40);

      var statsRunning = false;
      var statsLast = -1;

      function paintStats() {
        var span = statsSection.offsetHeight - window.innerHeight;
        var scrolled = -statsSection.getBoundingClientRect().top;
        var p = span > 0 ? Math.max(0, Math.min(1, scrolled / span)) : 0;
        var pos = p * (statCount - 1);

        if (Math.abs(pos - statsLast) > 0.002) {
          statsLast = pos;
          for (var i = 0; i < statCount; i++) {
            var d = pos - i;
            var t = Math.abs(d);
            var o = t <= HOLD ? 1 : Math.max(0, 1 - (t - HOLD) / (FADE - HOLD));
            // Le chiffre monte en sortant et arrive par le bas : la
            // translation suit le fondu, pas la position, pour qu'il ne
            // dérive pas pendant qu'il est pleinement visible.
            var shift = (d > 0 ? -1 : 1) * (1 - o) * RISE;
            stats[i].style.opacity = o.toFixed(3);
            stats[i].style.transform = 'translate3d(0,' + shift.toFixed(1) + 'px,0)';
          }
        }
        if (statsRunning) requestAnimationFrame(paintStats);
      }

      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
          var visible = entries[0].isIntersecting;
          if (visible && !statsRunning) { statsRunning = true; requestAnimationFrame(paintStats); }
          else if (!visible) { statsRunning = false; }
        }, { threshold: 0 }).observe(statsSection);
      } else {
        statsRunning = true; requestAnimationFrame(paintStats);
      }

      window.addEventListener('resize', function () {
        statsLast = -1;
        if (!statsRunning) paintStats();
      });
    }
  }
})();
