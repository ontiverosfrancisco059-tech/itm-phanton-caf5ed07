(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  var navMenu = document.querySelector(".nav__menu");
  var fab = document.querySelector(".fab");
  var navLinks = document.querySelectorAll(".nav__link");
  var year = document.getElementById("year");

  if (year) year.textContent = new Date().getFullYear();

  // Sticky header state
  var onScroll = function () {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 10);
    if (fab) fab.classList.toggle("visible", window.scrollY > 480);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  if (toggle && navMenu) {
    toggle.addEventListener("click", function () {
      var open = navMenu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      document.body.style.overflow = open ? "hidden" : "";
    });

    navMenu.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        navMenu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menú");
        document.body.style.overflow = "";
      }
    });
  }

  // Close mobile menu on escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navMenu && navMenu.classList.contains("open")) {
      navMenu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });

  // Active nav link highlighting
  var sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window && sections.length && navLinks.length) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.getAttribute("id");
          navLinks.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + id);
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(function (s) {
      spy.observe(s);
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll(".section");
  revealEls.forEach(function (el) {
    el.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    var reveal = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            reveal.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) {
      reveal.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.remove("reveal");
    });
  }
})();