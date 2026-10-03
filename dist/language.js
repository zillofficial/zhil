(() => {
 const translations = [
 ['.skip','Skip to content'],['.tile-about .tile-label','About'],['.tile-about .tile-links a:nth-child(1)','↗ Our story'],['.tile-about .tile-links a:nth-child(2)','↗ Our vision'],['.tile-identity .tile-label','Our identity'],['.tile-identity a','↗ What defines us'],['.tile-work .tile-label','Our work'],['.tile-work a','↗ Portfolio'],
 ['.eyebrow','ZHIL'],['.hero h1','We create a presence<br><span>that lasts.</span>'],['.hero-bottom p','We design. We create. We leave a mark.'],['.hero-foot > span','From idea to impact'],
 ['#about .section-label > span:first-child','01 / About ZHIL'],['.statement h2','Behind every great idea,<br>there is ZHIL.'],['.statement p','We believe presence is measured not only by what is seen, but by the impression it leaves. Our vision begins with a clear idea, thoughtful details, and an expression that feels like you.'],
 ['#vision .section-label > span:first-child','02 / Our vision'],['#vision .section-caption','THE WAY WE SEE IT'],['.vision h2','The idea comes first.<br><span>The impact stays.</span>'],
 ['.principles article:nth-child(1) h3','We design.'],['.principles article:nth-child(1) p','We give each idea a clear visual language, brought to life through every detail.'],['.principles article:nth-child(2) h3','We create.'],['.principles article:nth-child(2) p','We look beyond the familiar to find an expression of your personality.'],['.principles article:nth-child(3) h3','We leave a mark.'],['.principles article:nth-child(3) p','We craft a presence that catches the eye and stays in the memory.'],
 ['#identity .section-label > span:first-child','03 / Our identity'],['#identity .section-caption','LIGHT. SHADOW. CHARACTER.'],['.logo-panel p','Between light and shadow, our identity takes shape.'],['.identity-copy h2','Quiet in colour.<br>Strong in presence.'],['.identity-copy > p','Deep black, soft gold, and warm ivory. A balance that gives details room to breathe and lets the idea speak.'],
 ['#work .section-label > span:first-child','04 / Our work'],['#work .section-caption','SELECTED WORK'],['.work-intro h2','Ideas that become<br>lasting impressions.'],['.work-intro p','Our portfolio is taking shape.<br>Coming soon.'],['.footer-title','Your idea.<br><span>Our lasting impact.</span>'],['.contact-eyebrow',"Let’s start with an idea"],['label[for="contact-name"]','Your name'],['label[for="contact-email"]','Your email'],['label[for="contact-service"]','What do you need?'],['.send-row strong','Send request'],['.sling-hint','Press, or pull and release'],['.footer-meta > span:first-child','ZHIL'],['.footer-meta > span:nth-child(2)','We create a presence that lasts.'],['.footer-meta > a','Back to top ↑']
 ];
 const records=translations.map(([selector,en])=>{const el=document.querySelector(selector);return {el,en,ar:el.innerHTML};});
 const logos=[...document.querySelectorAll('svg:has(image)')].map(el=>({el,ar:el.innerHTML,view:el.getAttribute('viewBox')}));
 const arColours=['رمادي الظل','ذهبي هادئ','عاجي دافئ','برونزي عميق'], enColours=['Shadow grey','Soft gold','Warm ivory','Deep bronze'];
 const button=document.querySelector('.language-toggle');
 window.zhilText=(ar,en)=>document.documentElement.lang==='en'?en:ar;
 window.refreshLanguageState=()=>{
 const en=document.documentElement.lang==='en';
 const toggle=document.querySelector('.card-toggle'),open=toggle.getAttribute('aria-expanded')==='true';
 toggle.setAttribute('aria-label',en?(open?'Close menu':'Open menu'):(open?'إغلاق القائمة':'فتح القائمة'));
 const colours=[...document.querySelectorAll('.swatches button')];colours.forEach((el,i)=>{el.title=(en?enColours:arColours)[i];el.setAttribute('aria-label',el.title);});
 document.querySelector('.swatch-status').textContent=(en?'Logo background: ':'خلفية الشعار: ')+colours.find(el=>el.getAttribute('aria-pressed')==='true').title;
 document.querySelector('.contact-status').textContent=en?'Email submission is coming soon. You can contact us on WhatsApp.':'سيُتاح الإرسال عبر البريد قريبًا. يمكنك التواصل معنا عبر واتساب.';
 };
 function apply(lang){
 const en=lang==='en';document.documentElement.lang=en?'en':'ar';document.documentElement.dir=en?'ltr':'rtl';
 records.forEach(({el,ar,en:english})=>el.innerHTML=en?english:ar);
 logos.forEach(({el,ar,view})=>{el.setAttribute('viewBox',en?'0 0 400 160':view);el.innerHTML=en?'<text x="200" y="108" text-anchor="middle" fill="currentColor" font-family="Avenir Next,Segoe UI,Arial,sans-serif" font-size="88" font-weight="400" letter-spacing="14">ZHIL</text>':ar;el.setAttribute('aria-label',en?'ZHIL logo':'شعار ظل');});
 document.querySelectorAll('.loop-group').forEach(group=>group.querySelectorAll(':scope > span:not(.loop-logo)').forEach((el,i)=>el.textContent=(en?['We design.','We create.','We leave a mark.']:['نصمم.','نبتكر.','نترك أثرًا.'])[i]));
 const attrs=[['.skip','title','انتقل إلى المحتوى','Skip to content'],['.brand','aria-label','ظل — الرئيسية','ZHIL — Home'],['.card-content','aria-label','التنقل الرئيسي','Main navigation'],['.swatches','aria-label','اختر خلفية الشعار','Choose the logo background'],['.brand-loop','aria-label','ظل — نصمم، نبتكر، نترك أثرًا','ZHIL — We design. We create. We leave a mark.'],['#contact-name','placeholder','كيف نناديك؟','What should we call you?'],['#contact-email','placeholder','عنوان بريدك الإلكتروني','you@example.com'],['#contact-service','placeholder','احكِ لنا ما تحتاجه','Tell us what you need'],['.sling-pad','aria-label','إرسال الطلب','Send request'],['.social-icons','aria-label','تواصل مع ظل','Connect with ZHIL']];
 attrs.forEach(([s,a,ar,eng])=>document.querySelector(s).setAttribute(a,en?eng:ar));
 document.querySelectorAll('.social-icons a').forEach((el,i)=>{el.setAttribute('aria-label',(en?['WhatsApp','Instagram','Facebook']:['واتساب','إنستجرام','فيسبوك'])[i]);el.title=el.getAttribute('aria-label');});
 document.querySelector('#contact-email').dir=en?'ltr':'rtl';
 button.querySelector('span').textContent=en?'العربية':'English';button.lang=en?'ar':'en';button.setAttribute('aria-label',en?'التبديل إلى العربية':'Switch to English');
 document.title=en?'ZHIL — A presence that lasts':'ظل — نصنع حضورًا يبقى';document.querySelector('meta[name="description"]').content=en?'ZHIL — We design, create, and leave a mark. A creative vision with an identity that speaks for you.':'ظل — نصمم، نبتكر، ونترك أثرًا. رؤية إبداعية بهوية تتحدث عنك.';
 refreshLanguageState();try{localStorage.setItem('zhil-language',en?'en':'ar');}catch(_){}
 }
 button.addEventListener('click',()=>apply(document.documentElement.lang==='ar'?'en':'ar'));
 let saved;try{saved=localStorage.getItem('zhil-language');}catch(_){}apply(saved==='en'?'en':'ar');
})();
