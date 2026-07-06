
(function(){
  // mobile nav
  var btn=document.querySelector('.nav-toggle');
  var nav=document.getElementById('site-nav');
  if(btn&&nav){
    btn.addEventListener('click',function(){
      var open=nav.classList.toggle('open');
      btn.setAttribute('aria-expanded',open?'true':'false');
    });
  }
  // header shadow on scroll
  var header=document.querySelector('.site-header');
  function onScroll(){header.classList.toggle('scrolled',window.scrollY>10);}
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();
  // scroll reveals
  var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els=document.querySelectorAll('[data-reveal],.timeline');
  if(reduced||!('IntersectionObserver' in window)){
    els.forEach(function(el){el.classList.add('in');});
  }else{
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
      });
    },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(el){io.observe(el);});
  }
  // animated 40 counter in hero
  var forty=document.querySelector('.hero-40 .num');
  if(forty&&!reduced){
    var t0=null,dur=4500;
    function tick(t){
      if(!t0)t0=t;
      var p=Math.min((t-t0)/dur,1);
      p=1-Math.pow(1-p,3);
      forty.textContent=Math.round(p*40);
      if(p<1)requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
})();
