document.addEventListener('DOMContentLoaded',function(){
  var header=document.getElementById('header');
  var navToggle=document.getElementById('navToggle');
  var navMenu=document.getElementById('navMenu');
  var navLinks=document.querySelectorAll('.nav__link');

  navToggle.addEventListener('click',function(){
    navMenu.classList.toggle('open');
  });

  navLinks.forEach(function(link){
    link.addEventListener('click',function(){
      navMenu.classList.remove('open');
    });
  });

  var sections=document.querySelectorAll('section[id]');
  function onScroll(){
    var scrollY=window.scrollY;
    if(scrollY>80){
      header.style.boxShadow='0 2px 20px rgba(0,0,0,.5)';
    }else{
      header.style.boxShadow='none';
    }
    sections.forEach(function(section){
      var top=section.offsetTop-100;
      var height=section.offsetHeight;
      var id=section.getAttribute('id');
      if(scrollY>=top&&scrollY<top+height){
        navLinks.forEach(function(l){l.classList.remove('active')});
        var active=document.querySelector('.nav__link[href="#'+id+'"]');
        if(active)active.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();
});