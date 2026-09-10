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
     Scène : écran fixe, contenu piloté au scroll

     ── LA TIMELINE ──────────────────────────────────────────────────
     Tout le déroulé est décrit dans SEQUENCES ci-dessous. Chaque étape
     porte sa position `at` (0 à 1 dans sa séquence) et, si elle dure,
     sa `span`. On réordonne, retime ou ajoute une étape en modifiant
     ces données : la mécanique plus bas n'a pas à changer.

       at    quand l'étape commence, en part de la séquence
       span  sa durée, pour les effets continus
       on    blocs à allumer          off  blocs à éteindre
       type  frappe progressive       list révélation ligne à ligne
       pct   progression [de, à]      phase pastille active
       press pression du bouton       cursor déplacement du curseur
       view  vue affichée             scroll défilement d'une liste

     ── POURQUOI UN REJEU COMPLET ────────────────────────────────────
     À chaque changement, on remet la scène à zéro puis on rejoue toutes
     les étapes jusqu'à la position courante. L'état ne dépend donc que
     du scroll, jamais du chemin parcouru : remonter puis redescendre
     redonne exactement la même image.
     ----------------------------------------------------------------- */

  var MSG_1 = 'LOGISTRANS nous assigne en paiement de ses trois factures. Prépare les conclusions en défense pour TECHINNOV, avec une demande reconventionnelle au titre de la rétention.';
  var MSG_2 = 'Le plan me convient. Rédige les conclusions en défense complètes à partir de ce plan.';

  var SEQUENCES = [
    {
      id: 'rediger',
      phrase: 'Du dossier au plan détaillé, argumenté et sourcé.',
      steps: [
        { at: 0,    view: 'conversation', on: ['welcome'] },
        { at: .05,  span: .19, type: MSG_1 },
        { at: .25,  press: true },
        { at: .28,  off: ['welcome'], on: ['thread', 'sent'] },
        { at: .34,  on: ['reply'] },
        { at: .40,  on: ['prog', 'working'], phase: 'arguments' },
        { at: .40,  span: .46, pct: [10, 100] },
        { at: .46,  off: ['working'], on: ['args'], span: .12, list: 'arg' },
        { at: .58,  phase: 'jp', on: ['jp'], span: .16, list: 'jp' },
        { at: .74,  phase: 'synthese' },
        { at: .80,  phase: 'insertion' },
        { at: .86,  phase: 'done', on: ['canvas'] },
        { at: .90,  on: ['attach'] },
        { at: .94,  on: ['final'] },
        { at: .96,  span: .04, type: MSG_2 }
      ]
    },
    {
      id: 'organiser',
      phrase: 'Vos pièces numérotées, classées, prêtes à verser.',
      steps: [
        { at: 0,    view: 'dossiers' },
        { at: .14,  cursor: '#row-techinov' },
        { at: .34,  cursor: '#row-techinov', press: true },
        { at: .40,  view: 'dossier' },
        { at: .55,  span: .45, scroll: ['#pieces', 0, .75] }
      ]
    }
  ];

  /* ── Mécanique ──────────────────────────────────────────────────── */
  var stage = document.getElementById('stage');
  var stageApp = document.getElementById('app');

  if (stage && stageApp) {
    var desk = document.getElementById('stage-screen');
    var cursor = document.getElementById('sim-cursor');
    var phraseEl = stage.querySelector('[data-phrase]');
    var stepBtns = stage.querySelectorAll('.stage-step');
    var typedEl = stageApp.querySelector('[data-typed]');
    var sendBtn = stageApp.querySelector('[data-send]');
    var fillEl = stageApp.querySelector('[data-fill]');
    var pctEl = stageApp.querySelector('[data-pct]');
    var views = stageApp.querySelectorAll('[data-view]');
    var onBlocks = stageApp.querySelectorAll('[data-on]');
    var phasePills = stageApp.querySelectorAll('.prog-step');
    var args = stageApp.querySelectorAll('.arg');
    var jps = stageApp.querySelectorAll('.jp');
    var piecesBox = stageApp.querySelector('#pieces');

    var PHASES = ['arguments', 'jp', 'synthese', 'insertion'];
    var seqCount = SEQUENCES.length;

    function css(name, fallback) {
      var v = parseFloat(getComputedStyle(stage).getPropertyValue(name));
      return isNaN(v) ? fallback : v;
    }
    var SEQ_H = css('--stage-seq-h', 130);   // vh de piste par séquence
    var RUN = css('--stage-run', .78);       // part jouée, le reste est un palier

    stage.style.height = (seqCount * SEQ_H) + 'vh';

    /* Remise à zéro : la scène ne garde aucune trace de l'étape précédente. */
    function reset() {
      for (var i = 0; i < onBlocks.length; i++) onBlocks[i].classList.remove('is-on');
      for (var v = 0; v < views.length; v++) views[v].hidden = true;
      for (var p = 0; p < phasePills.length; p++) phasePills[p].className = 'prog-step';
      for (var a = 0; a < args.length; a++) args[a].classList.remove('is-on');
      for (var j = 0; j < jps.length; j++) jps[j].className = 'jp';
      if (typedEl) { typedEl.textContent = ''; typedEl.classList.remove('is-typing'); }
      if (sendBtn) sendBtn.classList.remove('is-press');
      if (fillEl) fillEl.style.transform = 'scaleX(0)';
      if (pctEl) pctEl.textContent = '10 %';
      if (cursor) cursor.classList.remove('is-on');
      if (piecesBox) piecesBox.scrollTop = 0;
    }

    function block(name, on) {
      var el = stageApp.querySelector('[data-on="' + name + '"]');
      if (el) el.classList.toggle('is-on', on !== false);
    }

    function moveCursor(sel, pressed) {
      if (!cursor || !desk) return;
      var t = stageApp.querySelector(sel);
      if (!t) return;
      var a = t.getBoundingClientRect(), b = desk.getBoundingClientRect();
      var x = a.left - b.left + a.width * .38;
      var y = a.top - b.top + a.height * .5;
      cursor.classList.add('is-on');
      cursor.style.transform = 'translate(' + x.toFixed(0) + 'px,' + y.toFixed(0) + 'px) scale(' + (pressed ? .78 : 1) + ')';
    }

    /* Rejoue toutes les étapes jusqu'à la position p de la séquence. */
    function render(seq, p) {
      reset();
      var steps = seq.steps;

      for (var i = 0; i < steps.length; i++) {
        var st = steps[i];
        if (p < st.at) continue;
        var t = st.span ? Math.max(0, Math.min(1, (p - st.at) / st.span)) : 1;

        if (st.view) {
          for (var v = 0; v < views.length; v++) {
            views[v].hidden = views[v].getAttribute('data-view') !== st.view;
          }
        }
        if (st.off) for (var o = 0; o < st.off.length; o++) block(st.off[o], false);
        if (st.on) for (var n = 0; n < st.on.length; n++) block(st.on[n], true);

        if (st.type && typedEl) {
          var cut = Math.round(t * st.type.length);
          typedEl.textContent = st.type.slice(0, cut);
          typedEl.classList.toggle('is-typing', t < 1);
        }
        if (st.press && sendBtn) sendBtn.classList.toggle('is-press', t < 1);

        if (st.pct) {
          var val = Math.round(st.pct[0] + (st.pct[1] - st.pct[0]) * t);
          if (fillEl) fillEl.style.transform = 'scaleX(' + (val / 100).toFixed(3) + ')';
          if (pctEl) pctEl.textContent = val + ' %';
        }
        if (st.phase) {
          var idx = PHASES.indexOf(st.phase);
          for (var q = 0; q < phasePills.length; q++) {
            phasePills[q].className = 'prog-step' +
              (idx < 0 || q < idx ? ' is-done' : (q === idx ? ' is-active' : ''));
          }
        }
        if (st.list === 'arg') {
          var na = Math.round(t * args.length);
          for (var k = 0; k < args.length; k++) args[k].classList.toggle('is-on', k < na);
        }
        if (st.list === 'jp') {
          var nj = t * jps.length;
          for (var m = 0; m < jps.length; m++) {
            jps[m].className = 'jp' + (m < Math.floor(nj) ? ' is-done' : (m < nj + 1 ? ' is-searching' : ''));
            var stateEl = jps[m].querySelector('.jp-state');
            if (stateEl) stateEl.textContent = m < Math.floor(nj) ? 'Recherche terminée' : 'Recherche en cours…';
          }
        }
        if (st.cursor) moveCursor(st.cursor, !!st.press);
        if (st.scroll) {
          var box = stageApp.querySelector(st.scroll[0]);
          if (box) {
            var span = box.scrollHeight - box.clientHeight;
            box.scrollTop = span * (st.scroll[1] + (st.scroll[2] - st.scroll[1]) * t);
          }
        }
      }
    }

    /* ── Pilotage au scroll ──────────────────────────────────────── */
    var lastKey = '';
    var stageRunning = false;
    var activeSeq = -1;
    var SEQ0_MS = 18000;   // durée de la séquence « Rédigez », en millisecondes
    var seq0Start = 0;     // remis à zéro à chaque sortie de la scène

    function paintStage() {
      var span = stage.offsetHeight - window.innerHeight;
      var scrolled = -stage.getBoundingClientRect().top;
      var g = span > 0 ? Math.max(0, Math.min(1, scrolled / span)) : 0;

      var raw = g * seqCount;
      var idx = Math.min(seqCount - 1, Math.floor(raw));

      // Séquence 1 : elle se joue seule, sur son horloge, dès que la scène
      // entre à l'écran. Le scroll ne la pilote pas — il ne sert qu'à passer
      // à la séquence suivante, une fois celle-ci terminée.
      // Séquence 2 : pilotée au scroll, comme prévu.
      var local;
      if (idx === 0) {
        if (!seq0Start) seq0Start = performance.now();
        local = Math.min(1, (performance.now() - seq0Start) / SEQ0_MS);
      } else {
        seq0Start = 0;                      // rejouable si l'on remonte
        local = Math.min(1, (raw - idx) / RUN);
      }

      // Signature : on ne repeint que si l'image change vraiment.
      var key = idx + ':' + Math.round(local * 600);
      if (key !== lastKey) {
        lastKey = key;
        render(SEQUENCES[idx], local);
        if (idx !== activeSeq) {
          activeSeq = idx;
          for (var b = 0; b < stepBtns.length; b++) {
            var on = b === idx;
            stepBtns[b].classList.toggle('is-active', on);
            stepBtns[b].setAttribute('aria-selected', String(on));
            if (on) stepBtns[b].setAttribute('aria-current', 'step');
            else stepBtns[b].removeAttribute('aria-current');
          }
          if (phraseEl) {
            phraseEl.classList.add('is-swapping');
            setTimeout(function () {
              phraseEl.textContent = SEQUENCES[activeSeq].phrase;
              phraseEl.classList.remove('is-swapping');
            }, 200);
          }
        }
      }
      if (stageRunning) requestAnimationFrame(paintStage);
    }

    // Une seule boucle à la fois : l'observateur l'amorce et l'arrête.
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        var vis = entries[0].isIntersecting;
        if (vis && !stageRunning && !reduceMotion) {
          stageRunning = true;
          requestAnimationFrame(paintStage);
        } else if (!vis) {
          stageRunning = false;
          seq0Start = 0;      // la séquence se rejoue proprement au retour
          lastKey = '';
        }
      }, { threshold: 0 }).observe(stage);
    } else if (!reduceMotion) {
      stageRunning = true;
      requestAnimationFrame(paintStage);
    }

    // Repli mobile : les libellés basculent l'image au lieu de scroller.
    var fallbacks = stage.querySelectorAll('[data-fallback]');
    function showFallback(i) {
      for (var f = 0; f < fallbacks.length; f++) fallbacks[f].hidden = f !== i;
    }

    // Les libellés amènent au début de leur séquence.
    for (var s = 0; s < stepBtns.length; s++) {
      (function (i) {
        stepBtns[i].addEventListener('click', function () {
          showFallback(i);
          for (var b = 0; b < stepBtns.length; b++) {
            stepBtns[b].classList.toggle('is-active', b === i);
            stepBtns[b].setAttribute('aria-selected', String(b === i));
          }
          if (phraseEl) phraseEl.textContent = SEQUENCES[i].phrase;
          var span = stage.offsetHeight - window.innerHeight;
          if (span <= 0) return;   // repli mobile : rien à faire défiler
          var top = window.scrollY + stage.getBoundingClientRect().top + (i / seqCount) * span;
          window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
        });
      })(s);
    }

    window.addEventListener('resize', function () {
      lastKey = '';
      stage.style.height = (seqCount * SEQ_H) + 'vh';
      if (!stageRunning && !reduceMotion) paintStage();
    });

    // Mouvement réduit : pas de frappe, pas de curseur, pas de progression.
    // Chaque séquence montre directement son état final.
    if (reduceMotion) {
      stage.style.height = 'auto';
      render(SEQUENCES[0], 1);
      for (var z = 0; z < stepBtns.length; z++) {
        (function (i) {
          stepBtns[i].addEventListener('click', function () {
            render(SEQUENCES[i], 1);
            for (var b = 0; b < stepBtns.length; b++) {
              stepBtns[b].classList.toggle('is-active', b === i);
              stepBtns[b].setAttribute('aria-selected', String(b === i));
            }
            if (phraseEl) phraseEl.textContent = SEQUENCES[i].phrase;
          });
        })(z);
      }
    } else {
      render(SEQUENCES[0], 0);
    }
  }

  /* -----------------------------------------------------------------
     Apparition au scroll

     Les éléments marqués data-reveal apparaissent une fois, à leur entrée
     dans le viewport : opacité et légère montée, avec une cascade entre
     éléments voisins. On retire l'observation après coup — l'effet ne se
     rejoue pas si l'on remonte.

     La classe .js-reveal est posée ici : sans JavaScript, la règle qui
     masque les éléments ne s'applique jamais et le contenu reste visible.
     ----------------------------------------------------------------- */
  var toReveal = document.querySelectorAll('[data-reveal]');

  if (toReveal.length && !reduceMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-reveal');

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        // Cascade : le rang au sein du parent donne le retard.
        var rank = 0, sib = el;
        while ((sib = sib.previousElementSibling)) {
          if (sib.hasAttribute('data-reveal')) rank++;
        }
        el.style.transitionDelay = (rank * 90) + 'ms';
        el.classList.add('is-in');
        revealObserver.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    for (var r = 0; r < toReveal.length; r++) revealObserver.observe(toReveal[r]);
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
