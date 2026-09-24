// Phanton — interacciones mínimas (comments.js controla login/comentarios)
(function(){
  var toggle = document.getElementById('navToggle');
  var mobile = document.getElementById('mobileNav');
  if(toggle && mobile){
    toggle.addEventListener('click', function(){
      var open = mobile.hasAttribute('hidden');
      if(open){ mobile.removeAttribute('hidden'); toggle.setAttribute('aria-expanded','true'); }
      else{ mobile.setAttribute('hidden',''); toggle.setAttribute('aria-expanded','false'); }
    });
    mobile.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ mobile.setAttribute('hidden',''); toggle.setAttribute('aria-expanded','false'); });
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && !mobile.hasAttribute('hidden')){ mobile.setAttribute('hidden',''); toggle.setAttribute('aria-expanded','false'); toggle.focus(); }
    });
    window.addEventListener('resize', function(){
      if(window.innerWidth > 900 && !mobile.hasAttribute('hidden')){ mobile.setAttribute('hidden',''); toggle.setAttribute('aria-expanded','false'); }
    });
  }
  // Filtro de menú
  var tabs = document.querySelectorAll('.tab');
  var cards = document.querySelectorAll('#menuGrid .menu-card');
  tabs.forEach(function(btn){
    btn.addEventListener('click', function(){
      tabs.forEach(function(b){ b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
      btn.classList.add('active'); btn.setAttribute('aria-selected','true');
      var f = btn.getAttribute('data-filter');
      cards.forEach(function(c){
        c.style.display = (f === 'all' || c.getAttribute('data-cat') === f) ? '' : 'none';
      });
    });
  });
})();
