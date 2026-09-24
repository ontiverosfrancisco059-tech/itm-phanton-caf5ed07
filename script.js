// Phanton — interacciones mínimas. Comentarios/login los controla comments.js
(function(){
  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('mobileNav');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ nav.classList.remove('open'); });
    });
  }
  var copy = document.getElementById('copyMsg');
  if(copy){
    copy.addEventListener('click', function(){
      var txt = 'Hola Phanton, quiero pedir:\n- 1 pizza hawaiana\n- 1 coca-cola\n- A domicilio / En local\nMi nombre es: ';
      var done = function(){ copy.textContent = 'Copiado ✓'; setTimeout(function(){ copy.textContent = 'Copiar mensaje'; },1800); };
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(txt).then(done).catch(done);
      } else {
        var ta = document.createElement('textarea');
        ta.value = txt; document.body.appendChild(ta); ta.select();
        try{ document.execCommand('copy'); }catch(e){}
        document.body.removeChild(ta); done();
      }
    });
  }
  // Resalta sección activa
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a'));
  var map = {};
  links.forEach(function(a){ map[a.getAttribute('href')] = a; });
  if('IntersectionObserver' in window){
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting && map['#'+e.target.id]){
          links.forEach(function(l){ l.style.color=''; });
          map['#'+e.target.id].style.color = '#c93b1f';
        }
      });
    }, {rootMargin:'-40% 0px -55% 0px'});
    ['nosotros','menu','pedido','visita','opiniones'].forEach(function(id){
      var s = document.getElementById(id); if(s) obs.observe(s);
    });
  }
})();
