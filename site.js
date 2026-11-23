(function(){
  "use strict";
  const data = Array.isArray(window.MERRY_STATIC_GAMES) ? window.MERRY_STATIC_GAMES : [];
  const translations = window.MERRY_STATIC_TRANSLATIONS || {};
  const live = data.filter(game=>game.status==="live");
  const soon = data.filter(game=>game.status!=="live");
  const escapeHtml = (value)=>String(value ?? "").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[ch]));
  const safeLink = (url)=>/^https:\/\/(?:play\.google\.com|apps\.apple\.com)\//.test(url||"") ? url : "";
  const selector = document.getElementById("language");
  let lang = "tr";
  try { const stored=localStorage.getItem("merry-static-language"); if(translations[stored]) lang=stored; } catch (_) {}
  selector.value=lang;
  const action=(url,label,extra="")=>safeLink(url)?`<a class="store-button ${extra}" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(label)}">${escapeHtml(label)} <span aria-hidden="true">↗</span></a>`:"";

  const navLabels={
    tr:["Hakkımızda","Oyunlar","Uygulamalar","Bizi Puanla","İletişim"],
    en:["About","Games","Apps","Rate Us","Contact"],
    fr:["À propos","Jeux","Applications","Évaluez-nous","Contact"],
    de:["Über uns","Spiele","Apps","Bewerten","Kontakt"],
    es:["Nosotros","Juegos","Aplicaciones","Valóranos","Contacto"],
    pt:["Sobre nós","Jogos","Aplicativos","Avalie-nos","Contato"],
    id:["Tentang Kami","Game","Aplikasi","Beri Nilai","Kontak"],
    ru:["О нас","Игры","Приложения","Оценить","Контакты"]
  };
  const labels={
    tr:["Çok yakında","Bizi Puanla","Yayınlanan oyunlarımızı mağazalarda değerlendirebilirsiniz.","İletişim","Bize görüş ve önerilerini ilet.","Tür","Oyun / Uygulama","Konu","Mesajın","E-posta taslağını aç ↗","E-posta uygulamanız açılacak; göndermeyi siz onaylayacaksınız.","Oyun","Uygulama","Şikâyet / Hata","Öneri","Görüş","Diğer","Uygulama adı","Henüz yayınlanmadı","Mesajınızı yazın..."],
    en:["Coming soon","Rate Us","Rate our released games in the app stores.","Contact","Send us your feedback and suggestions.","Type","Game / App","Topic","Your message","Open email draft ↗","Your email app opens; you approve sending.","Game","App","Complaint / Issue","Suggestion","Feedback","Other","App name","Not yet released","Write your message..."],
    fr:["Bientôt","Évaluez-nous","Évaluez nos jeux disponibles.","Contact","Envoyez vos suggestions et commentaires.","Type","Jeu / App","Sujet","Votre message","Ouvrir le brouillon ↗","Vous confirmerez l’envoi dans votre messagerie.","Jeu","Application","Problème","Suggestion","Avis","Autre","Nom de l’application","Pas encore disponible","Écrivez votre message..."],
    de:["Demnächst","Bewerten","Bewerte unsere veröffentlichten Spiele.","Kontakt","Sende uns Vorschläge und Feedback.","Typ","Spiel / App","Thema","Deine Nachricht","E-Mail öffnen ↗","Du bestätigst den Versand.","Spiel","App","Problem","Vorschlag","Feedback","Sonstiges","App-Name","Noch nicht verfügbar","Schreibe deine Nachricht..."],
    es:["Muy pronto","Valóranos","Valora nuestros juegos publicados.","Contacto","Envíanos tus sugerencias y comentarios.","Tipo","Juego / App","Tema","Tu mensaje","Abrir correo ↗","Confirma el envío en tu correo.","Juego","Aplicación","Problema","Sugerencia","Opinión","Otro","Nombre de app","Aún no disponible","Escribe tu mensaje..."],
    pt:["Em breve","Avalie-nos","Avalie nossos jogos publicados.","Contato","Envie sugestões e comentários.","Tipo","Jogo / App","Assunto","Sua mensagem","Abrir e-mail ↗","Confirme o envio no seu e-mail.","Jogo","Aplicativo","Problema","Sugestão","Comentário","Outro","Nome do aplicativo","Ainda não disponível","Escreva sua mensagem..."],
    id:["Segera hadir","Beri Nilai","Beri ulasan pada game yang sudah dirilis.","Kontak","Kirim masukan dan saran Anda.","Jenis","Game / Aplikasi","Topik","Pesan Anda","Buka email ↗","Konfirmasi pengiriman di aplikasi email.","Game","Aplikasi","Keluhan / Masalah","Saran","Masukan","Lainnya","Nama aplikasi","Belum dirilis","Tulis pesan Anda..."],
    ru:["Скоро","Оценить","Оцените выпущенные игры в магазинах.","Контакты","Отправьте предложения и отзывы.","Тип","Игра / Приложение","Тема","Ваше сообщение","Открыть письмо ↗","Подтвердите отправку в почте.","Игра","Приложение","Проблема","Предложение","Отзыв","Другое","Название приложения","Ещё не выпущено","Напишите сообщение..."]
  };
  const pages=["about","games","apps","rate","contact"];
  const menu=document.getElementById("studio-nav");
  const menuBtn=document.getElementById("studio-menu-btn");
  const product=document.getElementById("contact-product");
  const contactType=document.getElementById("contact-type");
  const appName=document.getElementById("contact-appname");
  const topic=document.getElementById("contact-topic");
  function showPage(){
    const page=pages.includes(location.hash.substring(1))?location.hash.substring(1):"games";
    pages.forEach(id=>{document.getElementById(id+"-page").hidden=id!==page;});
    document.querySelectorAll("[data-nav-link]").forEach(a=>{const active=a.dataset.navLink===page;a.classList.toggle("is-active",active);if(active)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");});
    menu.classList.remove("is-open");menuBtn.setAttribute("aria-expanded","false");
    if(page!=="games")window.scrollTo(0,0);
    else if(location.hash==="#games")requestAnimationFrame(()=>document.getElementById("games").scrollIntoView());
  }
  function changeContactType(){
    const isGame=contactType.value==="game";
    product.hidden=!isGame;appName.hidden=isGame;
    if(isGame){product.innerHTML=data.map(g=>'<option value="'+escapeHtml(g.name)+'">'+escapeHtml(g.name)+'</option>').join("");appName.required=false;}
    else {appName.required=true;}
  }
  function renderOther(){
    const t=labels[lang]||labels.en;
    const nav=navLabels[lang]||navLabels.en;
    pages.forEach((id,i)=>{document.querySelector('[data-nav-link="'+id+'"]').textContent=nav[i];});
    document.getElementById("about-title").textContent=t[0];document.getElementById("apps-title").textContent=t[0];
    document.getElementById("rate-title").textContent=t[1];document.getElementById("rate-description").textContent=t[2];
    document.getElementById("contact-title").textContent=t[3];document.getElementById("contact-intro").textContent=t[4];
    ["label-type","label-product","label-topic","label-message","contact-submit","contact-hint"].forEach((id,i)=>{document.getElementById(id).textContent=t[5+i];});
    contactType.options[0].textContent=t[11];contactType.options[1].textContent=t[12];
    ["complaint","suggestion","feedback","other"].forEach((v,i)=>{topic.options[i].textContent=t[13+i];});
    appName.placeholder=t[17];document.getElementById("contact-message").placeholder=t[19];
    document.getElementById("rate-list").innerHTML=data.map(g=>{
      const links=[g.googlePlay?'<a href="'+escapeHtml(g.googlePlay)+'" target="_blank" rel="noopener noreferrer">Google Play ↗</a>':"",g.appStore?'<a href="'+escapeHtml(g.appStore)+'" target="_blank" rel="noopener noreferrer">App Store ↗</a>':""].filter(Boolean).join("");
      return '<div class="rate-item"><strong>'+escapeHtml(g.name)+'</strong><div class="rate-actions">'+(links||'<small>'+escapeHtml(t[18])+'</small>')+'</div></div>';
    }).join("");
  }
  menuBtn.addEventListener("click",()=>{const opened=!menu.classList.contains("is-open");menu.classList.toggle("is-open",opened);menuBtn.setAttribute("aria-expanded",String(opened));});
  window.addEventListener("hashchange",showPage);
  contactType.addEventListener("change",changeContactType);
  document.getElementById("studio-contact-form").addEventListener("submit",e=>{
    e.preventDefault();
    const msg=document.getElementById("contact-message").value.trim();if(!msg)return;
    const typ=contactType.options[contactType.selectedIndex].text;
    const name=contactType.value==="game"?product.value:appName.value.trim();
    if(!name)return;
    const subject="MERRY STATIC | "+typ+" | "+name+" | "+topic.options[topic.selectedIndex].text;
    const body=typ+": "+name+"\n"+topic.options[topic.selectedIndex].text+"\n\n"+msg;
    window.location.href="mailto:merrystaticgamesstudio@gmail.com?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);
  });
  changeContactType();
  function render(){
    const t=translations[lang]||translations.tr;
    const htmlText = (selector,content) => { const node=document.querySelector(selector); if(node) node.innerHTML=content; };
    const plainText = (selector,content) => { const node=document.querySelector(selector); if(node) node.textContent=content; };
    document.documentElement.lang=lang;
    selector.value=lang;
    document.title="MERRY STATIC — Games Studios";
    plainText("#language-caption",t.langLabel);
    selector.setAttribute("aria-label",t.langLabel);
    plainText(".eyebrow",t.eyebrow+" ✦");
    htmlText(".hero h1",t.headline);
    plainText(".hero-description",t.description);
    htmlText(".hero-cta",escapeHtml(t.explore)+" <span aria-hidden='true'>↘</span>");
    plainText(".section-kicker",t.sectionKicker);
    htmlText(".section-heading h2",escapeHtml(t.ourGames)+"<span class='period'>.</span>");
    plainText(".coming-heading [data-en]",t.soon);
    plainText(".studio-note h2",t.noteTitle);
    plainText(".studio-note p",t.noteBody);
    plainText(".footer>span",t.footer);
    plainText("#game-count",`${String(live.length).padStart(2,"0")} ${t.liveShort} · ${String(soon.length).padStart(2,"0")} ${t.soon}`);
    plainText("#soon-count",`${String(soon.length).padStart(2,"0")} ${t.upcoming}`);
    renderOther();
    const gameText = g=>t.games?.[g.id] || [g.subtitle,g.description];
    document.getElementById("live-games").innerHTML=live.map(g=>{
      const [subtitle,description]=gameText(g);
      return `<article class="live-card"><img src="${escapeHtml(g.image)}" alt="${escapeHtml(g.name)}" loading="lazy"/><div class="card-content"><span class="live-pill"><i></i>${escapeHtml(t.live)}</span><h3>${escapeHtml(g.name)}</h3><p class="subtitle">${escapeHtml(subtitle)}</p><p class="desc">${escapeHtml(description)}</p><div class="store-buttons">${action(g.googlePlay,t.googlePlay)}${action(g.appStore,t.appStore,"secondary")}</div></div><span class="corner-orb"></span></article>`;
    }).join("");
    document.getElementById("soon-games").innerHTML=soon.map(g=>{
      const [subtitle,description]=gameText(g);
      return `<article class="coming-card"><img src="${escapeHtml(g.image)}" alt="${escapeHtml(g.name)}" loading="lazy"/><div class="coming-meta"><div><h3>${escapeHtml(g.name)}</h3><p class="subtitle">${escapeHtml(subtitle)}</p></div><span class="soon-pill">✦ ${escapeHtml(t.soon)}</span></div><p class="desc">${escapeHtml(description)}</p></article>`;
    }).join("");
  }
  selector.addEventListener("change",()=>{
    if(translations[selector.value]){
      lang=selector.value;
      try{localStorage.setItem("merry-static-language",lang);}catch(_){}
      render();
    }
  });
  document.getElementById("year").textContent=new Date().getFullYear();
  render();
  showPage();
})();
