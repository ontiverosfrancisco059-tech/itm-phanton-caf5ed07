// Phanton — interacciones del sitio (el widget de comentarios lo controla comments.js)
(function () {
  var menuBtn = document.getElementById('menuBtn');
  var mobileNav = document.getElementById('mobileNav');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function () {
      var open = mobileNav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Filtro de categorías del menú
  var tabs = document.querySelectorAll('.tab');
  var dishes = document.querySelectorAll('.dish');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      var f = tab.getAttribute('data-filter');
      dishes.forEach(function (d) {
        var show = f === 'all' || d.getAttribute('data-cat') === f;
        d.classList.toggle('hidden', !show);
      });
    });
  });

  // Nav activa por scroll
  var links = document.querySelectorAll('.nav-link');
  var sections = ['inicio', 'menu', 'local', 'proceso', 'opiniones', 'contacto']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  function onScroll() {
    var y = window.scrollY + 140;
    var current = 'inicio';
    sections.forEach(function (s) {
      if (s.offsetTop <= y) current = s.id;
    });
    links.forEach(function (l) {
      l.classList.toggle('is-active', l.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Aparición suave
  var revealEls = document.querySelectorAll('.dish, .process-card, .local-copy, .reviews-shell, .contact-card');
  revealEls.forEach(function (el) { el.classList.add('reveal'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }
})();
