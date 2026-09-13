/* Phanton — interacciones del sitio */
(function () {
  "use strict";

  const WHATSAPP = "521113467889";

  /* Header con fondo al hacer scroll */
  const header = document.querySelector("[data-header]");
  if (header) {
    const onScroll = () =>
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Navegación móvil */
  const toggle = document.querySelector("[data-nav-toggle]");
  const navMenu = document.querySelector(".nav-menu");
  if (toggle && navMenu) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      navMenu.classList.toggle("is-open", !open);
    });
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("is-open");
      });
    });
  }

  /* Aparición suave de secciones */
  const reveals = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* Filtro de categorías del menú */
  const filters = document.querySelectorAll("[data-filter]");
  const categories = document.querySelectorAll("[data-category]");
  if (filters.length && categories.length) {
    filters.forEach((btn) => {
      btn.addEventListener("click", () => {
        const value = btn.getAttribute("data-filter");
        filters.forEach((f) =>
          f.classList.toggle("is-active", f === btn)
        );
        categories.forEach((cat) => {
          const match =
            value === "all" || cat.getAttribute("data-category") === value;
          cat.hidden = !match;
          if (match) {
            cat.classList.remove("is-visible");
            requestAnimationFrame(() => cat.classList.add("is-visible"));
          }
        });
        const anchor = document.querySelector(".filters");
        if (anchor) {
          const top =
            anchor.getBoundingClientRect().top + window.scrollY - 96;
          if (window.scrollY > top) {
            window.scrollTo({ top, behavior: "smooth" });
          }
        }
      });
    });
  }

  /* Formulario de pedido -> WhatsApp */
  const orderForm = document.querySelector("[data-order-form]");
  if (orderForm) {
    orderForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(orderForm);
      const name = (data.get("nombre") || "").toString().trim();
      const order = (data.get("pedido") || "").toString().trim();
      const address = (data.get("direccion") || "").toString().trim();
      const notes = (data.get("notas") || "").toString().trim();

      let message = "¡Hola Phanton! Quiero hacer un pedido.\n\n";
      message += "Nombre: " + (name || "(sin nombre)") + "\n";
      message += "Pedido: " + (order || "(por definir)") + "\n";
      if (address) message += "Entrega: " + address + "\n";
      if (notes) message += "Notas: " + notes + "\n";
      message += "\n¿Me confirman el total y el tiempo de entrega?";

      const url =
        "https://wa.me/" +
        WHATSAPP +
        "?text=" +
        encodeURIComponent(message);
      window.open(url, "_blank", "noopener");
    });
  }
})();