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

    // Le titre du bloc reste affiché : seul le halo de la ligne s'éteint.
    function stopPulse() {
      if (pulsingRow) pulsingRow.classList.remove('is-pulsing');
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
     Fonctionnalités : cartes empilées pilotées au scroll

     La piste (.stack-track) mesure ~100vh par carte. On y calcule une
     progression p de 0 à 1, convertie en position continue « pos » entre
     0 et n-1. Chaque carte i en dérive son état à partir de d = pos - i :

       d < 0  carte encore derrière : décalée vers le bas, réduite, assombrie
       d = 0  carte active : aucune transformation
       d > 0  carte sortie : remontée hors champ et effacée

     Rien n'est jamais basculé d'un état à l'autre : tout est interpolé sur
     le scroll. Seules transform et opacity sont écrites, donc aucun reflow.
     ----------------------------------------------------------------- */
  var stackTrack = document.getElementById('stack-track');
  var stackDeck = document.getElementById('stack-deck');

  if (stackTrack && stackDeck) {
    var features = document.getElementById('fonctionnalites');
    var dots = document.querySelectorAll('#stack-dots .stack-dot');

    // Les cartes sont en ordre inverse dans le DOM : on les range par data-card.
    var cardNodes = stackDeck.querySelectorAll('.stack-card');
    var cards = [];
    for (var c = 0; c < cardNodes.length; c++) {
      cards[parseInt(cardNodes[c].getAttribute('data-card'), 10)] = cardNodes[c];
    }
    var count = cards.length;

    // Réglages lus depuis le CSS : une seule source de vérité.
    var css = getComputedStyle(features);
    function setting(name, fallback) {
      var v = parseFloat(css.getPropertyValue(name));
      return isNaN(v) ? fallback : v;
    }
    var DEPTH_Y = setting('--stack-depth-y', 24);
    var DEPTH_SCALE = setting('--stack-depth-scale', 0.04);
    var DEPTH_DIM = setting('--stack-depth-dim', 0.14);
    var MAX_DEPTH = 2;   // au-delà, les cartes ne s'enfoncent plus

    var narrow = window.matchMedia('(max-width: 900px)');
    var simplified = false;
    var lastActive = -1;

    function setActive(index) {
      if (index === lastActive) return;
      lastActive = index;
      for (var i = 0; i < count; i++) {
        var active = i === index;
        // Seule la carte active est cliquable et atteignable au clavier ;
        // sans cela, une carte sortie mais encore peinte au-dessus
        // intercepterait les clics destinés à la carte visible.
        cards[i].style.pointerEvents = active ? 'auto' : 'none';
        cards[i].setAttribute('aria-hidden', String(!active));
        var link = cards[i].querySelector('.stack-card__link');
        if (link) link.setAttribute('tabindex', active ? '0' : '-1');
      }
      for (var k = 0; k < dots.length; k++) {
        var on = k === index;
        dots[k].classList.toggle('is-active', on);
        if (on) dots[k].setAttribute('aria-current', 'true');
        else dots[k].removeAttribute('aria-current');
      }
    }

    function paint(pos) {
      for (var i = 0; i < count; i++) {
        var card = cards[i];
        var scrim = card.querySelector('.stack-card__scrim');
        var d = pos - i;
        var ty, scale, opacity, dim;

        if (d <= 0) {
          var depth = Math.min(-d, MAX_DEPTH);
          ty = (depth * DEPTH_Y) + 'px';
          scale = 1 - depth * DEPTH_SCALE;
          opacity = 1;
          dim = depth * DEPTH_DIM;
        } else {
          var t = Math.min(d, 1);
          ty = (-t * 90) + '%';        // 90 % de sa propre hauteur : hors champ
          scale = 1;
          opacity = Math.max(0, 1 - t * 1.5);  // s'efface avant d'avoir fini de monter
          dim = 0;
        }

        card.style.transform = 'translate3d(0, ' + ty + ', 0) scale(' + scale.toFixed(4) + ')';
        card.style.opacity = opacity.toFixed(3);
        if (scrim) scrim.style.opacity = dim.toFixed(3);
      }
    }

    function clearInline() {
      for (var i = 0; i < count; i++) {
        cards[i].style.transform = '';
        cards[i].style.opacity = '';
        cards[i].style.pointerEvents = '';
        cards[i].removeAttribute('aria-hidden');
        var link = cards[i].querySelector('.stack-card__link');
        if (link) link.removeAttribute('tabindex');
        var scrim = cards[i].querySelector('.stack-card__scrim');
        if (scrim) scrim.style.opacity = '';
      }
      lastActive = -1;
    }

    function progress() {
      var span = stackTrack.offsetHeight - window.innerHeight;
      if (span <= 0) return 0;
      var scrolled = -stackTrack.getBoundingClientRect().top;
      return Math.max(0, Math.min(1, scrolled / span));
    }

    var ticking = false;
    function update() {
      ticking = false;
      if (simplified) return;
      var pos = progress() * (count - 1);
      paint(pos);
      setActive(Math.round(pos));
    }
    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }

    // Aller directement à une carte : on déplace le scroll, le rendu suit.
    for (var b = 0; b < dots.length; b++) {
      (function (i) {
        dots[b].addEventListener('click', function () {
          if (simplified) {
            cards[i].scrollIntoView({ block: 'center', behavior: reduceMotion ? 'auto' : 'smooth' });
            return;
          }
          var span = stackTrack.offsetHeight - window.innerHeight;
          var top = window.scrollY + stackTrack.getBoundingClientRect().top + (i / (count - 1)) * span;
          window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
        });
      })(b);
    }

    // Repli sur mobile et en mouvement réduit : cartes qui se suivent,
    // aucun sticky à tenir, aucun calcul au scroll.
    function syncMode() {
      var next = narrow.matches || reduceMotion;
      if (next === simplified) return;
      simplified = next;
      features.classList.toggle('is-simplified', simplified);

      // La hauteur de piste est posée en inline : il faut la retirer en mode
      // simplifié, sinon elle l'emporterait sur le `height: auto` du CSS.
      if (simplified) {
        stackTrack.style.height = '';
        clearInline();
      } else {
        stackTrack.style.height = (count * 100) + 'vh';
        update();
      }
    }

    if (narrow.addEventListener) narrow.addEventListener('change', syncMode);
    else if (narrow.addListener) narrow.addListener(syncMode);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () {
      syncMode();
      onScroll();
    });

    syncMode();
    update();
  }

  /* -----------------------------------------------------------------
     Compteurs animés — démarrent à l'entrée dans le viewport
     ----------------------------------------------------------------- */
  var counters = document.querySelectorAll('[data-count]');

  function format(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); // espace fine insécable
  }

  function render(el, value) {
    el.textContent = (el.getAttribute('data-prefix') || '') + format(value) + (el.getAttribute('data-suffix') || '');
  }

  function animate(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (reduceMotion) { render(el, target); return; }

    var duration = 1600;
    var start = null;

    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      render(el, Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (counters.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animate(entry.target);
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      for (var c = 0; c < counters.length; c++) io.observe(counters[c]);
    } else {
      for (var d = 0; d < counters.length; d++) render(counters[d], parseInt(counters[d].getAttribute('data-count'), 10));
    }
  }
})();
