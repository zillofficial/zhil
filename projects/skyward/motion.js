(() => {
  const root=document.documentElement;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const hero=document.querySelector('.hero-scroll');
  const journey=document.querySelector('.journey');
  const header=document.querySelector('header');
  let queued=false;
  const clamp=v=>Math.min(1,Math.max(0,v));
  function render(){
    queued=false;
    const y=window.scrollY,vh=window.innerHeight;
    root.style.setProperty('--progress',clamp(y/Math.max(1,document.documentElement.scrollHeight-vh)).toFixed(4));
    header.classList.toggle('header-solid',y>70);
    if(reduce.matches)return;
    const heroRect=hero.getBoundingClientRect(),journeyRect=journey.getBoundingClientRect();
    const hp=clamp(-heroRect.top/Math.max(1,hero.offsetHeight));
    const jp=clamp(-journeyRect.top/Math.max(1,journey.offsetHeight-vh));
    hero.style.setProperty('--hero-p',hp.toFixed(4));
    journey.style.setProperty('--journey-p',jp.toFixed(4));
    journey.classList.toggle('stage-open',jp>.58);
  }
  function queue(){if(!queued){queued=true;requestAnimationFrame(render)}}
  function configure(){
    root.classList.toggle('motion-ready',!reduce.matches);
    if(reduce.matches){hero.style.removeProperty('--hero-p');journey.style.removeProperty('--journey-p');journey.classList.add('stage-open')}
    queue();
  }
  const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('arrived');reveal.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.destination').forEach(el=>reveal.observe(el));
  addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue,{passive:true});
  addEventListener('pageshow',queue);reduce.addEventListener('change',configure);
  configure();
})();

(() => {
  const slides=[...document.querySelectorAll('.hero-photo')];
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  let current=0,timer,generation=0;
  async function advance(run){
    if(run!==generation||document.hidden||reduce.matches)return;
    const next=(current+1)%slides.length,photo=slides[next];
    try {
      if(!photo.src)photo.src=photo.dataset.src;
      await photo.decode();
      if(run!==generation||document.hidden||reduce.matches)return;
      slides[current].classList.remove('is-active');
      slides[current].setAttribute('aria-hidden','true');
      photo.classList.add('is-active');
      photo.removeAttribute('aria-hidden');
      current=next;
    } catch { /* Keep the existing photograph if the next image cannot load. */ }
    if(run===generation)timer=setTimeout(()=>advance(run),7000);
  }
  function start(){
    clearTimeout(timer);generation++;
    if(!document.hidden&&!reduce.matches&&slides.length>1){
      const next=slides[(current+1)%slides.length];
      if(!next.src)next.src=next.dataset.src;
      const run=generation;timer=setTimeout(()=>advance(run),7000);
    }
  }
  document.addEventListener('visibilitychange',start);
  reduce.addEventListener('change',start);
  start();
})();
