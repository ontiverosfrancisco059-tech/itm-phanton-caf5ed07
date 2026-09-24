// Phanton — interacciones del sitio (sin sistema propio de comentarios: eso lo hace comments.js)
(function () {
  var toggle = document.getElementById('navToggle');
  var mobile = document.getElementById('mobileNav');
  if (toggle && mobile) {
    toggle.addEventListener('click', function () {
      var open = mobile.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobile.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { mobile.classList.remove('open'); });
    });
  }

  // Filtro de menú por categoría
  var tabs = document.querySelectorAll('.tab');
  var dishes = document.querySelectorAll('.dish');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      var f = tab.getAttribute('data-filter');
      dishes.forEach(function (d) {
        d.classList.toggle('hide', f !== 'all' && d.getAttribute('data-cat') !== f);
      });
    });
  });

  // Constructor de mensaje de pedido por WhatsApp
  var btn = document.getElementById('buildOrder');
  if (btn) {
    btn.addEventListener('click', function () {
      var haw = parseInt(document.getElementById('qHaw').value || '0', 10);
      var pep = parseInt(document.getElementById('qPep').value || '0', 10);
      var mex = parseInt(document.getElementById('qMex').value || '0', 10);
      var name = (document.getElementById('qName').value || '').trim();
      var parts = [];
      if (haw > 0) parts.push(haw + 'x hawaiana');
      if (pep > 0) parts.push(pep + 'x pepperoni');
      if (mex > 0) parts.push(mex + 'x mexicana');
      var msg = 'Hola Phanton, quiero pedir: ' + (parts.length ? parts.join(', ') : '(elige tus pizzas)') + (name ? '. ' + name : '');
      var url = 'https://wa.me/521113467889?text=' + encodeURIComponent(msg);
      var prev = document.getElementById('orderPreview');
      prev.innerHTML = '';
      var span = document.createElement('span');
      span.textContent = msg + ' ';
      var link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener';
      link.className = 'link';
      link.textContent = 'Enviar por WhatsApp →';
      prev.appendChild(span);
      prev.appendChild(link);
    });
  }
})();
