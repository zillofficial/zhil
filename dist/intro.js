(() => {
 const root=document.documentElement,overlay=document.querySelector('.door-intro');
 if(!root.classList.contains('intro-active')){overlay.remove();return;}
 const main=document.querySelector('main'),header=document.querySelector('header');
 main.inert=header.inert=true;
 let done=false;
 const finish=()=>{if(done)return;done=true;root.classList.remove('intro-active');main.inert=header.inert=false;overlay.remove();try{sessionStorage.setItem('zhil-intro-seen','1');}catch(_){};document.removeEventListener('keydown',escape);};
 const escape=e=>{if(e.key==='Escape')finish();};document.addEventListener('keydown',escape);
 overlay.querySelector('button').addEventListener('click',finish);
 let english=false;try{english=localStorage.getItem('zhil-language')==='en';}catch(_){}
 overlay.querySelector('button').textContent=english?'Skip intro':'تخطي المقدمة';
 const image=new Image();image.src='hero.png';
 const ready=image.decode?image.decode().catch(()=>{}):new Promise(resolve=>{image.onload=image.onerror=resolve;if(image.complete)resolve();});
 const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 Promise.all([delay(1500),Promise.race([ready,delay(2800)])]).then(()=>{
 if(done)return;overlay.classList.add('entering');setTimeout(finish,750);
 });
 setTimeout(finish,4200);
})();
