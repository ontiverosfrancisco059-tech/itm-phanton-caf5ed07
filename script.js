/* =========================================
   PHANTON PIZZAS — Scripts
   ========================================= */

(function () {
  'use strict';

  /* -----------------------------------------
     Navbar scroll effect
     ----------------------------------------- */
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  /* -----------------------------------------
     Mobile menu toggle
     ----------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  function closeMenu() {
    navMenu.classList.remove('open');
    navToggle.classList.remove('active');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', function () {
    const isOpen = navMenu.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      navMenu.classList.add('open');
      navToggle.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });

  /* Close mobile menu on link click */
  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  /* Close mobile menu on outside click */
  document.addEventListener('click', function (e) {
    if (
      navMenu.classList.contains('open') &&
      !navMenu.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      closeMenu();
    }
  });

  /* -----------------------------------------
     Active nav link on scroll
     ----------------------------------------- */
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    let current = '';
    sections.forEach(function (section) {
      var rect = section.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom > 120) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* -----------------------------------------
     Menu filter
     ----------------------------------------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var menuCards = document.querySelectorAll('.menu-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = this.getAttribute('data-filter');

      /* Update active button */
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');

      /* Filter cards */
      menuCards.forEach(function (card) {
        var category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(function () {
            card.style.display = 'none';
          }, 400);
        }
      });
    });
  });

  /* -----------------------------------------
     Scroll reveal animations
     ----------------------------------------- */
  function initScrollReveal() {
    var targets = document.querySelectorAll(
      '.section-header, .about-text, .about-stats, .stat, ' +
      '.menu-card, .info-card, .contact-card, .footer-content > div'
    );

    targets.forEach(function (el) {
      el.classList.add('fade-in');
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  initScrollReveal();

  /* -----------------------------------------
     Smooth scroll for anchor links
     ----------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = 70;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();