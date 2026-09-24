// phanton — interacciones mínimas (no toca comentarios: los controla comments.js)
(function(){
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      toggle.textContent = open ? '✕' : '☰';
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ nav.classList.remove('open'); toggle.textContent='☰'; toggle.setAttribute('aria-expanded','false'); });
    });
    document.addEventListener('keydown', function(ev){
      if(ev.key === 'Escape' && nav.classList.contains('open')){
        nav.classList.remove('open');
        toggle.textContent='☰';
        toggle.setAttribute('aria-expanded','false');
        toggle.focus();
      }
    });
  }

  // Filtro de menú por categoría
  var tabs = document.querySelectorAll('.tab');
  var dishes = document.querySelectorAll('.dish');
  tabs.forEach(function(btn){
    btn.addEventListener('click', function(){
      tabs.forEach(function(b){ b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected','true');
      var f = btn.getAttribute('data-filter');
      dishes.forEach(function(d){
        var show = (f === 'all' || d.getAttribute('data-cat') === f);
        d.style.display = show ? '' : 'none';
      });
    });
  });

  // Año dinámico
  var y = document.getElementById('year');
  if(y){ y.textContent = String(new Date().getFullYear()); }

  // Reveal on scroll con fallbacks (sin ocultar contenido si falla)
  var els = document.querySelectorAll('.card,.dish,.step,.feature-visual,.map-card,.comments-card');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!els.length){ return; }
  if(reduceMotion || !('IntersectionObserver' in window)){
    els.forEach(function(el){ el.classList.add('visible'); });
    return;
  }
  try{
    els.forEach(function(el){ el.classList.add('reveal'); });
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
    },{threshold:.12});
    els.forEach(function(el){ io.observe(el); });
    // Seguridad: si tras 3s algo sigue oculto fuera del viewport observado, no bloquear
    setTimeout(function(){
      els.forEach(function(el){
        var r = el.getBoundingClientRect();
        if(r.top < window.innerHeight * 1.2){ el.classList.add('visible'); }
      });
    }, 3000);
  }catch(e){
    els.forEach(function(el){ el.classList.add('visible'); });
  }
})();
