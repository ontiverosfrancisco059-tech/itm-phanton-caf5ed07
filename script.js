// Phanton — interacciones mínimas (comments.js gestiona login/comentarios)
(function(){
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  if(btn && nav){
    btn.addEventListener('click', function(){
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ nav.classList.remove('open'); btn.setAttribute('aria-expanded','false'); });
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape'){ nav.classList.remove('open'); btn.setAttribute('aria-expanded','false'); }
    });
  }
  var y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  // Filtro menú
  var chips = document.querySelectorAll('.chip');
  var dishes = document.querySelectorAll('.dish');
  chips.forEach(function(c){
    c.addEventListener('click', function(){
      chips.forEach(function(x){ x.classList.remove('active'); });
      c.classList.add('active');
      var f = c.getAttribute('data-filter');
      dishes.forEach(function(d){
        d.style.display = (f==='all' || d.getAttribute('data-cat')===f) ? '' : 'none';
      });
    });
  });

  // Reveal on scroll (con fallback si no hay IntersectionObserver)
  var revealEls = document.querySelectorAll('.card,.dish,.step,.destacado-visual');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target);} });
    },{threshold:.12});
    revealEls.forEach(function(el){
      el.classList.add('reveal'); io.observe(el);
    });
  } else {
    revealEls.forEach(function(el){ el.classList.add('visible'); });
  }
})();
