(() => {
 const header=document.querySelector('.card-header');
 const trigger=header.querySelector('.card-toggle');
 const panel=document.getElementById('card-links');
 const setOpen=open=>{
   header.classList.toggle('is-open',open);panel.inert=!open;
   trigger.setAttribute('aria-expanded',String(open));
   trigger.setAttribute('aria-label',open?'إغلاق القائمة':'فتح القائمة');
 };
 trigger.addEventListener('click',()=>setOpen(!header.classList.contains('is-open')));
 panel.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setOpen(false)));
 document.addEventListener('pointerdown',event=>{if(!header.contains(event.target))setOpen(false);});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&header.classList.contains('is-open')){setOpen(false);trigger.focus();}});
 header.addEventListener('focusout',()=>requestAnimationFrame(()=>{if(!header.contains(document.activeElement))setOpen(false);}));
})();
(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || !('IntersectionObserver' in window)) return;
  const elements = [...document.querySelectorAll('.about h2, .about p, .section-label, .vision h2, .principles article, .identity-copy h2, .identity-copy p, .logo-panel p, .footer-title, .work-intro h2, .work-intro p')];
  let observer;
  const reveal = element => element.classList.remove('reveal-pending');
  try {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -12% 0px" });
    elements.forEach(element => {
      if (element.getBoundingClientRect().top < window.innerHeight) return;
      element.classList.add('scroll-reveal', 'reveal-pending');
      element.style.setProperty('--reveal-delay', element.matches('p') ? '140ms' : '0ms');
      observer.observe(element);
    });
    preference.addEventListener('change', event => {
      if (event.matches) { elements.forEach(reveal); observer.disconnect(); }
    });
    window.addEventListener('beforeprint', () => elements.forEach(reveal));
  } catch (_) {
    elements.forEach(reveal);
    observer?.disconnect();
  }
})();

(() => {const strip=document.querySelector('.brand-loop');const button=strip.querySelector('.loop-pause');button.addEventListener('click',()=>{const paused=strip.classList.toggle('is-paused');button.setAttribute('aria-pressed',String(paused));button.setAttribute('aria-label',paused?'تشغيل حركة الشريط':'إيقاف حركة الشريط');button.textContent=paused?'تشغيل الحركة':'إيقاف الحركة';});})();

(() => {const button=document.querySelector('.glass-contact');const reduced=matchMedia('(prefers-reduced-motion: reduce)');button.addEventListener('pointermove',event=>{if(reduced.matches)return;const r=button.getBoundingClientRect();const angle=Math.atan2(event.clientY-r.top-r.height/2,event.clientX-r.left-r.width/2)*180/Math.PI+90;button.style.setProperty('--shine-angle',angle+'deg');});})();

(() => {
 const form=document.querySelector('#contact-form'),pad=form.querySelector('.sling-pad'),root=pad.parentElement,arrow=pad.querySelector('.sling-arrow'),fx=root.querySelector('.sling-band'),status=form.querySelector('.contact-status');
 fx.innerHTML='<path class="elastic-band"/><circle class="power-arc" cx="34" cy="34" r="33" pathLength="1"/>';
 const band=fx.querySelector('path'),arc=fx.querySelector('circle'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let grip=null,x=0,y=0,ux=0,uy=1,frame=0,skip=false;
 const paint=()=>{const d=Math.hypot(x,y),p=Math.min(d/48,1);pad.style.transform=`translate(${x}px,${y}px)`;root.classList.toggle('is-loaded',d>=48);let path='';if(d>.5){const a=Math.atan2(y,x),b=Math.acos(Math.min(1,7/d));path=[a+b,a-b].map(t=>`M${34+33*Math.cos(t)},${34+33*Math.sin(t)} L${34+x+26*Math.cos(t)},${34+y+26*Math.sin(t)}`).join(' ');}band.setAttribute('d',path);arc.setAttribute('stroke-dasharray',`${p} ${1-p}`);arc.setAttribute('stroke-dashoffset',p/2);arc.setAttribute('transform',`rotate(${Math.atan2(-uy,-ux)*180/Math.PI} 34 34)`);arc.style.opacity=grip?String(p):'0';};
 const relax=()=>{arrow.style.transition=reduced.matches?'none':'transform 360ms cubic-bezier(.23,1,.32,1)';arrow.style.transform='rotate(0deg)';};
 const burst=()=>{if(reduced.matches)return;const angle=Math.atan2(-uy,-ux);for(let i=0;i<14;i++){const dot=document.createElement('i');dot.className='sling-particle';root.append(dot);const a=angle+(i? (Math.random()+Math.random()-1)*Math.PI/6:0),reach=i?60+Math.random()*110:160,size=i?3+Math.random()*4:8;dot.style.width=dot.style.height=size+'px';const cx=Math.cos(a),cy=Math.sin(a);dot.animate([{transform:`translate(${cx*34}px,${cy*34}px) scale(1)`,opacity:1},{transform:`translate(${cx*reach}px,${cy*reach}px) scale(.35)`,opacity:0}],{duration:i?400+Math.random()*250:500,easing:'cubic-bezier(.23,1,.32,1)'}).onfinish=()=>dot.remove();}};
 const settle=fire=>{cancelAnimationFrame(frame);if(reduced.matches){x=y=0;paint();relax();return;}let vx=-ux*(fire?2300:500),vy=-uy*(fire?2300:500),last=performance.now(),start=last,launched=false;const tick=now=>{const dt=Math.min((now-last)/1000,.025);last=now;vx+=(-480*x-29*vx)*dt;vy+=(-480*y-29*vy)*dt;x+=vx*dt;y+=vy*dt;paint();if(fire&&!launched&&(x*ux+y*uy<=14||now-start>150)){launched=true;burst();relax();}if(now-start<750&&(Math.hypot(x,y)>.15||Math.hypot(vx,vy)>1)){frame=requestAnimationFrame(tick);}else{x=y=0;paint();relax();}};frame=requestAnimationFrame(tick);};
 pad.addEventListener('pointerdown',e=>{if(e.button!==0||grip)return;cancelAnimationFrame(frame);grip={id:e.pointerId,x:e.clientX,y:e.clientY,moved:false};skip=false;pad.setPointerCapture(e.pointerId);root.classList.add('is-held');});
 pad.addEventListener('pointermove',e=>{if(!grip||e.pointerId!==grip.id)return;const dx=e.clientX-grip.x,dy=e.clientY-grip.y,raw=Math.hypot(dx,dy);grip.moved ||= raw>5;if(raw<.01){x=y=0;paint();return;}ux=dx/raw;uy=dy/raw;const d=160*raw/(160+raw);x=d*ux;y=d*uy;arrow.style.transition='none';arrow.style.transform=`rotate(${(Math.atan2(-uy,-ux)*180/Math.PI+90)*Math.min(d/12,1)}deg)`;paint();});
 const release=(e,cancelled=false)=>{if(!grip||e.pointerId!==grip.id)return;const moved=grip.moved,fire=moved&&Math.hypot(x,y)>=48&&!cancelled;grip=null;root.classList.remove('is-held');skip=moved||cancelled;if(pad.hasPointerCapture(e.pointerId))pad.releasePointerCapture(e.pointerId);if(!fire)relax();settle(fire);/* Visual launch is independent of form validation. */if(fire)form.requestSubmit(pad);};
 pad.addEventListener('pointerup',e=>release(e));pad.addEventListener('pointercancel',e=>release(e,true));pad.addEventListener('lostpointercapture',e=>release(e,true));
 pad.addEventListener('keydown',e=>{if(e.key==='Escape'&&grip)release({pointerId:grip.id},true);if(e.key==='Enter'||e.key===' ')skip=false;});
 pad.addEventListener('click',e=>{if(skip){e.preventDefault();skip=false;}});
 form.addEventListener('submit',e=>{e.preventDefault();status.textContent='سيُتاح الإرسال عبر البريد قريبًا. يمكنك التواصل معنا الآن عبر أيقونة واتساب.';});
})();

(() => {
 const panel=document.querySelector('#identity-preview'),buttons=[...document.querySelectorAll('.swatches button')],status=document.querySelector('.swatch-status');
 buttons.forEach(button=>button.addEventListener('click',()=>{
   buttons.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
   panel.style.backgroundColor=button.dataset.color;
   panel.dataset.ink=button.dataset.ink;
   status.textContent='خلفية الشعار: '+button.getAttribute('aria-label');
 }));
})();
