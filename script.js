/* ==========================================================================
   phanton · Pizzas artesanales — Campeche
   Interacciones: navegación, reveal on scroll, WhatsApp, galería y más
   ========================================================================== */
(function () {
  "use strict";

  var PHONE_INT = "1113467889";
  var WA_BASE = "https://wa.me/521113467889";

  document.addEventListener("DOMContentLoaded", function () {
    setupHeader();
    setupNavToggle();
    setupWhatsAppLinks();
    setupReveal();
    setupNavHighlight();
    setupLightbox();
    setupToTop();
    setupYear();
  });

  function setupHeader() {
    var header = document.getElementById("site-header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function setupNavToggle() {
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("primary-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function setupWhatsAppLinks() {
    var links = document.querySelectorAll("[data-wa]");
    if (!links.length) return;

    var defaultText = "Hola, quiero hacer un pedido a phanton";

    links.forEach(function (link) {
      var text = link.getAttribute("data-wa-message") || defaultText;
      link.setAttribute("href", WA_BASE + "?text=" + encodeURIComponent(text));
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener");
    });
  }

  function setupReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  function setupNavHighlight() {
    var navLinks = Array.prototype.slice.call(
      document.querySelectorAll(".primary-nav a")
    );
    if (!navLinks.length) return;

    var sections = navLinks
      .map(function (link) {
        var id = link.getAttribute("href").replace("#", "");
        return document.getElementById(id);
      })
      .filter(Boolean);

    if (!sections.length) return;

    var onScroll = function () {
      var pos = window.scrollY + 120;
      var current = sections[0];
      sections.forEach(function (section) {
        if (section.offsetTop <= pos) current = section;
      });

      navLinks.forEach(function (link) {
        link.classList.toggle(
          "is-active",
          link.getAttribute("href") === "#" + current.id
        );
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function setupLightbox() {
    var lightbox = document.getElementById("lightbox");
    var img = document.getElementById("lightbox-img");
    var caption = document.getElementById("lightbox-caption");
    var close = document.getElementById("lightbox-close");
    if (!lightbox || !img || !close) return;

    var items = document.querySelectorAll(".gallery-item");

    function open(item) {
      var picture = item.querySelector("img");
      img.setAttribute("src", picture.getAttribute("src"));
      img.setAttribute("alt", picture.getAttribute("alt"));
      caption.textContent = item.getAttribute("data-caption") || "";
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }

    function closeBox() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    items.forEach(function (item) {
      item.addEventListener("click", function () {
        open(item);
      });
    });

    close.addEventListener("click", closeBox);

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closeBox();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeBox();
    });
  }

  function setupToTop() {
    var button = document.getElementById("to-top");
    if (!button) return;

    var onScroll = function () {
      button.classList.toggle("is-visible", window.scrollY > 640);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    button.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function setupYear() {
    var yearEl = document.querySelector("[data-year]");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }
})();