/* Inner-page navigation and automatically animated technical illustrations. */
(() => {
  'use strict';
  const toggle=document.getElementById('navToggle'), nav=document.getElementById('siteNav');
  if(toggle&&nav){
    const setMenu=open=>{nav.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));if(open)nav.querySelector('a').focus();};
    toggle.addEventListener('click',()=>setMenu(!nav.classList.contains('open')));
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){setMenu(false);toggle.focus();}});
    for(const event of ['click','focusin'])document.addEventListener(event,e=>{if(!nav.contains(e.target)&&!toggle.contains(e.target))setMenu(false);});
    window.matchMedia('(max-width:940px)').addEventListener('change',()=>setMenu(false));
  }
  const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
  const reduce=window.matchMedia('(prefers-reduced-motion:reduce)');
  const diagrams=[...document.querySelectorAll('.diagram-content')];
  let printing=false;
  const updateMotion=()=>{
    const playing=!reduce.matches&&!document.hidden&&!printing;
    diagrams.forEach(content=>{
      content.dataset.playing=String(playing);
      content.querySelectorAll('svg').forEach(svg=>{
        if(typeof svg.pauseAnimations!=='function')return;
        if(playing)svg.unpauseAnimations();
        else{
          svg.pauseAnimations();
          // Keep the rotary-to-linear illustration legible in static views.
          if(reduce.matches||printing)svg.setCurrentTime(8.2);
        }
      });
    });
  };
  updateMotion();
  reduce.addEventListener('change',updateMotion);
  document.addEventListener('visibilitychange',updateMotion);
  window.addEventListener('pageshow',updateMotion);
  window.addEventListener('beforeprint',()=>{printing=true;updateMotion();});
  window.addEventListener('afterprint',()=>{printing=false;updateMotion();});
})();
