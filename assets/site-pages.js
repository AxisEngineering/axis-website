/* Inner-page navigation and user-controlled technical illustrations. */
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
  const diagrams=[...document.querySelectorAll('.diagram-disclosure')];
  const controllers=[];
  diagrams.forEach(details=>{
    const content=details.querySelector('.diagram-content'),button=details.querySelector('.animation-toggle'),svgs=[...content.querySelectorAll('svg')];
    const setPlaying=playing=>{
      playing=playing&&details.open&&!reduce.matches;
      content.dataset.playing=String(playing);
      button.setAttribute('aria-pressed',String(playing));
      button.textContent=reduce.matches?'Reduced motion: paused':playing?'Pause animation':'Play animation';
      button.disabled=reduce.matches;
      if(content.getAnimations)content.getAnimations({subtree:true}).forEach(a=>playing?a.play():a.pause());
      svgs.forEach(svg=>{if(typeof svg.pauseAnimations==='function'){if(playing)svg.unpauseAnimations();else svg.pauseAnimations();}});
    };
    button.style.display='inline-flex';
    svgs.forEach(svg=>{if(typeof svg.setCurrentTime==='function'){svg.setCurrentTime(8.2);svg.pauseAnimations();}});
    setPlaying(false);
    button.addEventListener('click',()=>setPlaying(content.dataset.playing!=='true'));
    details.addEventListener('toggle',()=>{if(!details.open)setPlaying(false);});
    controllers.push(()=>setPlaying(false));
  });
  reduce.addEventListener('change',()=>controllers.forEach(pause=>pause()));
  document.addEventListener('visibilitychange',()=>{if(document.hidden)controllers.forEach(pause=>pause());});
  const revealAnchor=()=>{
    let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}
    const element=document.getElementById(id),details=element&&element.closest('.diagram-disclosure');
    if(details){details.open=true;requestAnimationFrame(()=>element.scrollIntoView());}
  };
  revealAnchor();window.addEventListener('hashchange',revealAnchor);
  let closedForPrint=[];
  window.addEventListener('beforeprint',()=>{closedForPrint=diagrams.filter(d=>!d.open);diagrams.forEach(d=>d.open=true);controllers.forEach(pause=>pause());});
  window.addEventListener('afterprint',()=>{closedForPrint.forEach(d=>d.open=false);closedForPrint=[];});
})();
