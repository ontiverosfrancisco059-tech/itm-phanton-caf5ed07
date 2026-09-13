(function () {
  'use strict';

  var WHATSAPP_NUMBER = '521113467889';
  var WHATSAPP_MESSAGE = 'Hola Phanton, quiero hacer un pedido de pizza';

  function waLink() {
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(WHATSAPP_MESSAGE);
  }

  document.querySelectorAll('[data-whatsapp]').forEach(function (el) {
    el.setAttribute('href', waLink());
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  var header = document.getElementById('siteHeader');

  function onScroll() {
    if (window.scrollY > 8) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var nav = document.getElementById('siteNav');
  var navToggle = document.getElementById('navToggle');

  navToggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  var sections = document.querySelectorAll('section[id], main[id]');
  var navLinks = Array.prototype.slice.call(nav.querySelectorAll('.site-nav__link'));

  var spy = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          var active = link.getAttribute('href') === '#inicio' && id === 'inicio';
          if (link.getAttribute('href') === '#' + id) {
            active = true;
          }
          link.classList.toggle('is-active', active);
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach(function (section) {
    spy.observe(section);
  });

  var revealEls = document.querySelectorAll('.section-head, .section-title, .kicker, .featured__card, .about__copy, .about__visual, .steps, .menu-card, .delivery__cta, .hours__block, .hours__location, .cta__inner');
  var revealObs = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );

  revealEls.forEach(function (el) {
    if (!el.classList.contains('menu-card') && !el.closest('.menu__grid')) {
      el.classList.add('reveal');
      revealObs.observe(el);
    }
  });

  var tabs = document.querySelectorAll('.menu__filter');
  var cards = Array.prototype.slice.call(document.querySelectorAll('.menu-card'));

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        var active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      var filter = tab.getAttribute('data-filter');

      cards.forEach(function (card, index) {
        var match = filter === 'todos' || card.getAttribute('data-category') === filter;
        card.classList.toggle('is-hidden', !match);
        if (match) {
          card.classList.remove('animate-in');
          void card.offsetWidth;
          card.style.animationDelay = index * 40 + 'ms';
          card.classList.add('animate-in');
        }
      });
    });
  });

  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();