(function () {
  "use strict";

  var PROJECT_ID = "caf5ed07-fb64-4bcb-96b5-abfb4fa93d42";
  var PHONE_DISPLAY = "111 346 7889";
  var WHATSAPP_URL = "https://wa.me/521113467889";
  var CTA_TEXT = "Hola Phanton, quiero hacer un pedido de pizza";

  function initNav() {
    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("siteNav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function enhanceHeaders() {
    document.querySelectorAll("h1, h2").forEach(function (heading) {
      var text = heading.textContent.trim();
      if (text.charAt(0) !== text.charAt(0).toUpperCase()) {
        heading.textContent = text.charAt(0).toUpperCase() + text.slice(1);
      }
    });
  }

  function buildWaLinks() {
    var links = document.querySelectorAll('a[data-wa-cta]');
    links.forEach(function (link) {
      link.href = WHATSAPP_URL + "?text=" + encodeURIComponent(CTA_TEXT);
    });

    document.querySelectorAll(".menu-order").forEach(function (el) {
      var label = el.textContent.trim();
      var msg = label + " en Phanton";
      el.href = WHATSAPP_URL + "?text=" + encodeURIComponent(msg);
    });
  }

  function revealOnScroll() {
    var items = document.querySelectorAll(".menu-card, .gallery-item, .fact, .delivery-card, .featured-media, .about-media");
    if (!("IntersectionObserver" in window)) return;

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    items.forEach(function (item) {
      item.classList.add("reveal");
      io.observe(item);
    });
  }

  function initFallbackProfileNote() {
    var note = document.querySelector("[data-itm-note]");
    if (note && !note.textContent.trim()) {
      note.textContent = "Tu pedido se confirma por WhatsApp.";
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    enhanceHeaders();
    buildWaLinks();
    revealOnScroll();
    initFallbackProfileNote();
  });
})();