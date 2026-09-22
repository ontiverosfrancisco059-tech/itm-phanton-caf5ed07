// Phanton — interacciones del sitio (no gestiona comentarios: eso lo hace comments.js)
(function(){
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function(e){
      if(e.target.tagName === 'A'){ nav.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); }
    });
  }

  // Tabs del menú
  var tabs = document.querySelectorAll('.tab');
  tabs.forEach(function(btn){
    btn.addEventListener('click', function(){
      tabs.forEach(function(b){ b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected','true');
      var key = btn.getAttribute('data-tab');
      document.querySelectorAll('.panel').forEach(function(p){
        var show = p.id === 'panel-' + key;
        p.classList.toggle('active', show);
        if(show){ p.removeAttribute('hidden'); } else { p.setAttribute('hidden',''); }
      });
    });
  });

  // Reveal on scroll
  var els = document.querySelectorAll('.section, .hero-media, .framed, .menu-list, .comments-shell');
  els.forEach(function(el){ el.classList.add('reveal'); });
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){ en.target.classList.add('visible'); io.unobserve(en.target); }
      });
    }, {threshold: .12});
    els.forEach(function(el){ io.observe(el); });
  } else {
    els.forEach(function(el){ el.classList.add('visible'); });
  }

  var y = document.getElementById('year');
  if(y){ y.textContent = new Date().getFullYear(); }
})();
