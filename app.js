(function () {
  "use strict";

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  var navToggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("click", function (e) {
      if (nav.classList.contains("is-open") &&
          !nav.contains(e.target) &&
          !navToggle.contains(e.target)) {
        closeNav();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) closeNav();
    });

    function closeNav() {
      nav.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  }

  var chips = document.querySelectorAll(".chip[data-filter]");
  var items = document.querySelectorAll(".menu-item[data-category]");

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) {
        var active = c === chip;
        c.classList.toggle("is-active", active);
        c.setAttribute("aria-selected", String(active));
      });

      var filter = chip.dataset.filter;
      items.forEach(function (item) {
        var show = filter === "todas" || item.dataset.category === filter;

        if (show) {
          item.classList.remove("is-hidden");
          item.style.animation = "none";
          void item.offsetWidth;
          item.style.animation = "";
        } else {
          item.classList.add("is-hidden");
        }
      });
    });
  });
})();