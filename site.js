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
    tr:["Çok yakında","Bizi Puanla","Yayınlanan oyunlarımızı mağazalarda değerlendirebilirsiniz.","İletişim","Bize görüş ve önerilerini ilet.","Tür","Oyun / Uygulama","Konu","Mesajın","Mesajı Gönder ↗","Mesajın doğrudan stüdyomuza iletilir; e-posta uygulaması açılmaz.","Oyun","Uygulama","Şikâyet / Hata","Öneri","Görüş","Diğer","Uygulama adı","Henüz yayınlanmadı","Mesajınızı yazın..."],
    en:["Coming soon","Rate Us","Rate our released games in the app stores.","Contact","Send us your feedback and suggestions.","Type","Game / App","Topic","Your message","Send Message ↗","Your message is sent to our studio without opening an email app.","Game","App","Complaint / Issue","Suggestion","Feedback","Other","App name","Not yet released","Write your message..."],
    fr:["Bientôt","Évaluez-nous","Évaluez nos jeux disponibles.","Contact","Envoyez vos suggestions et commentaires.","Type","Jeu / App","Sujet","Votre message","Ouvrir le brouillon ↗","Vous confirmerez l’envoi dans votre messagerie.","Jeu","Application","Problème","Suggestion","Avis","Autre","Nom de l’application","Pas encore disponible","Écrivez votre message..."],
    de:["Demnächst","Bewerten","Bewerte unsere veröffentlichten Spiele.","Kontakt","Sende uns Vorschläge und Feedback.","Typ","Spiel / App","Thema","Deine Nachricht","E-Mail öffnen ↗","Du bestätigst den Versand.","Spiel","App","Problem","Vorschlag","Feedback","Sonstiges","App-Name","Noch nicht verfügbar","Schreibe deine Nachricht..."],
    es:["Muy pronto","Valóranos","Valora nuestros juegos publicados.","Contacto","Envíanos tus sugerencias y comentarios.","Tipo","Juego / App","Tema","Tu mensaje","Abrir correo ↗","Confirma el envío en tu correo.","Juego","Aplicación","Problema","Sugerencia","Opinión","Otro","Nombre de app","Aún no disponible","Escribe tu mensaje..."],
    pt:["Em breve","Avalie-nos","Avalie nossos jogos publicados.","Contato","Envie sugestões e comentários.","Tipo","Jogo / App","Assunto","Sua mensagem","Abrir e-mail ↗","Confirme o envio no seu e-mail.","Jogo","Aplicativo","Problema","Sugestão","Comentário","Outro","Nome do aplicativo","Ainda não disponível","Escreva sua mensagem..."],
    id:["Segera hadir","Beri Nilai","Beri ulasan pada game yang sudah dirilis.","Kontak","Kirim masukan dan saran Anda.","Jenis","Game / Aplikasi","Topik","Pesan Anda","Buka email ↗","Konfirmasi pengiriman di aplikasi email.","Game","Aplikasi","Keluhan / Masalah","Saran","Masukan","Lainnya","Nama aplikasi","Belum dirilis","Tulis pesan Anda..."],
    ru:["Скоро","Оценить","Оцените выпущенные игры в магазинах.","Контакты","Отправьте предложения и отзывы.","Тип","Игра / Приложение","Тема","Ваше сообщение","Открыть письмо ↗","Подтвердите отправку в почте.","Игра","Приложение","Проблема","Предложение","Отзыв","Другое","Название приложения","Ещё не выпущено","Напишите сообщение..."]
  };
  const appText={
  "tr": {
    "kicker": "GÜNLÜK HAYATI KOLAYLAŞTIR",
    "title": "Uygulamalarımız",
    "intro": "Her gün işe yarayan sade ve akıllı çözümler.",
    "soon": "YAKINDA",
    "subtitle": "Akıllı Alışveriş Listesi & Fiyat Hafızası",
    "description": "Listen cebinde, alışverişin kontrol altında. Ürünlerini saniyeler içinde ekle; alışveriş geçmişini, son mağazayı ve birim fiyatları tek yerde hatırla.",
    "features": [
      "Hızlı liste",
      "Alışveriş geçmişi",
      "Fiyat hafızası",
      "Favoriler"
    ],
    "future": "Fiş tarama ve ortak aile listesi geliştirme planında.",
    "slogan": "Listen Cebinde!",
    "appSoon": "01 YAKINDA"
  },
  "en": {
    "kicker": "MAKE EVERYDAY EASIER",
    "title": "Our Apps",
    "intro": "Simple, smart tools for everyday life.",
    "soon": "COMING SOON",
    "subtitle": "Smart Shopping List & Price Memory",
    "description": "Your list, always at hand. Add items in seconds and keep your purchase history, last store, and unit prices in one simple place.",
    "features": [
      "Quick lists",
      "Purchase history",
      "Price memory",
      "Favorites"
    ],
    "future": "Receipt scanning and shared family lists are planned for future updates.",
    "slogan": "Your List, In Your Pocket!",
    "appSoon": "01 COMING SOON"
  },
  "fr": {
    "kicker": "SIMPLIFIEZ LE QUOTIDIEN",
    "title": "Nos Applications",
    "intro": "Des outils simples et pratiques au quotidien.",
    "soon": "BIENTÔT",
    "subtitle": "Liste de courses et mémoire des prix",
    "description": "Votre liste à portée de main. Ajoutez des articles en quelques secondes et retrouvez vos achats, magasins et prix unitaires.",
    "features": [
      "Liste rapide",
      "Historique des achats",
      "Mémoire des prix",
      "Favoris"
    ],
    "future": "La lecture des tickets et les listes familiales sont prévues.",
    "slogan": "Votre liste dans la poche !",
    "appSoon": "01 À VENIR"
  },
  "de": {
    "kicker": "ALLTAG EINFACHER MACHEN",
    "title": "Unsere Apps",
    "intro": "Einfache, clevere Helfer für jeden Tag.",
    "soon": "DEMNÄCHST",
    "subtitle": "Einkaufsliste & Preisgedächtnis",
    "description": "Deine Liste immer dabei. Füge Artikel in Sekunden hinzu und behalte Einkäufe, Geschäfte und Stückpreise im Blick.",
    "features": [
      "Schnelle Liste",
      "Einkaufsverlauf",
      "Preisgedächtnis",
      "Favoriten"
    ],
    "future": "Bon-Scan und gemeinsame Familienlisten sind geplant.",
    "slogan": "Deine Liste in der Tasche!",
    "appSoon": "01 DEMNÄCHST"
  },
  "es": {
    "kicker": "SIMPLIFICA TU DÍA",
    "title": "Nuestras Apps",
    "intro": "Herramientas sencillas e inteligentes para cada día.",
    "soon": "PRÓXIMAMENTE",
    "subtitle": "Lista de compras y memoria de precios",
    "description": "Tu lista siempre contigo. Añade productos en segundos y recuerda tus compras, tiendas y precios unitarios.",
    "features": [
      "Lista rápida",
      "Historial de compras",
      "Memoria de precios",
      "Favoritos"
    ],
    "future": "El escaneo de tickets y las listas familiares están previstos.",
    "slogan": "¡Tu lista en el bolsillo!",
    "appSoon": "01 PRÓXIMAMENTE"
  },
  "pt": {
    "kicker": "FACILITE SEU DIA",
    "title": "Nossos Apps",
    "intro": "Ferramentas simples e inteligentes para o dia a dia.",
    "soon": "EM BREVE",
    "subtitle": "Lista de compras e histórico de preços",
    "description": "Sua lista sempre por perto. Adicione itens em segundos e acompanhe compras, lojas e preços unitários.",
    "features": [
      "Lista rápida",
      "Histórico de compras",
      "Memória de preços",
      "Favoritos"
    ],
    "future": "Leitura de recibos e listas familiares compartilhadas estão planejadas.",
    "slogan": "Sua lista no bolso!",
    "appSoon": "01 EM BREVE"
  },
  "id": {
    "kicker": "PERMUDAH HARI-HARIMU",
    "title": "Aplikasi Kami",
    "intro": "Alat sederhana dan cerdas untuk sehari-hari.",
    "soon": "SEGERA HADIR",
    "subtitle": "Daftar Belanja & Riwayat Harga",
    "description": "Daftar belanja selalu di tangan. Tambahkan barang dalam hitungan detik dan ingat riwayat pembelian, toko, serta harga satuan.",
    "features": [
      "Daftar cepat",
      "Riwayat belanja",
      "Memori harga",
      "Favorit"
    ],
    "future": "Pemindaian struk dan daftar keluarga bersama direncanakan.",
    "slogan": "Daftarmu di Saku!",
    "appSoon": "01 SEGERA HADIR"
  },
  "ru": {
    "kicker": "УПРОСТИТЕ КАЖДЫЙ ДЕНЬ",
    "title": "Наши Приложения",
    "intro": "Простые и умные инструменты на каждый день.",
    "soon": "СКОРО",
    "subtitle": "Список покупок и память цен",
    "description": "Список покупок всегда под рукой. Добавляйте товары за секунды и сохраняйте историю, магазины и цены за единицу.",
    "features": [
      "Быстрый список",
      "История покупок",
      "Память цен",
      "Избранное"
    ],
    "future": "Сканирование чеков и семейные списки запланированы.",
    "slogan": "Ваш список в кармане!",
    "appSoon": "01 СКОРО"
  }
};
  const apps=[{id:"ms-listcep",name:"MS ListCep",image:"assets/ms-listcep-hd.svg",status:"soon",googlePlay:"",appStore:""}];
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
    product.hidden=false;appName.hidden=true;appName.required=false;
    const choices=isGame?data:apps;
    const oldValue=product.value;
    product.innerHTML=choices.map(g=>'<option value="'+escapeHtml(g.name)+'">'+escapeHtml(g.name)+'</option>').join("");
    if(choices.some(g=>g.name===oldValue))product.value=oldValue;
  }
  function renderOther(){
    const t=labels[lang]||labels.en;
    const nav=navLabels[lang]||navLabels.en;
    pages.forEach((id,i)=>{document.querySelector('[data-nav-link="'+id+'"]').textContent=nav[i];});
    document.getElementById("about-title").textContent=t[0];
    document.getElementById("rate-title").textContent=t[1];document.getElementById("rate-description").textContent=t[2];
    document.getElementById("contact-title").textContent=t[3];document.getElementById("contact-intro").textContent=t[4];
    ["label-type","label-product","label-topic","label-message","contact-submit","contact-hint"].forEach((id,i)=>{document.getElementById(id).textContent=t[5+i];});
    contactType.options[0].textContent=t[11];contactType.options[1].textContent=t[12];
    ["complaint","suggestion","feedback","other"].forEach((v,i)=>{topic.options[i].textContent=t[13+i];});
    appName.placeholder=t[17];document.getElementById("contact-message").placeholder=t[19];
    document.getElementById("rate-list").innerHTML=[...data,...apps].map(g=>{
      const links=[g.googlePlay?'<a href="'+escapeHtml(g.googlePlay)+'" target="_blank" rel="noopener noreferrer">Google Play ↗</a>':"",g.appStore?'<a href="'+escapeHtml(g.appStore)+'" target="_blank" rel="noopener noreferrer">App Store ↗</a>':""].filter(Boolean).join("");
      return '<div class="rate-item"><strong>'+escapeHtml(g.name)+'</strong><div class="rate-actions">'+(links||'<small>'+escapeHtml(t[18])+'</small>')+'</div></div>';
    }).join("");
  }
  menuBtn.addEventListener("click",()=>{const opened=!menu.classList.contains("is-open");menu.classList.toggle("is-open",opened);menuBtn.setAttribute("aria-expanded",String(opened));});
  window.addEventListener("hashchange",showPage);
  contactType.addEventListener("change",changeContactType);
  document.getElementById("studio-contact-form").addEventListener("submit",async e=>{
    e.preventDefault();
    const content=document.getElementById("contact-message").value.trim();
    const result=document.getElementById("contact-result");
    const send=document.getElementById("contact-submit");
    const spam=document.getElementById("contact-website");
    if(!content||spam.value)return;
    const isGame=contactType.value==="game";
    const productName=product.value;
    if(!productName)return;
    const selectedTopic=topic.options[topic.selectedIndex].textContent;
    const selectedKind=contactType.options[contactType.selectedIndex].textContent;
    const locale=lang;
    const tr=locale==="tr";
    result.hidden=false;result.className="";result.textContent=tr?"Mesaj gönderiliyor...":"Sending message...";
    send.disabled=true;
    const formData={
      _subject:"MERRY STATIC | "+selectedKind+" | "+productName+" | "+selectedTopic,
      _captcha:"true",
      _honey:"",
      origin:"https://merrystatic.github.io/",
      language:locale,
      category:selectedKind,
      product:productName,
      topic:selectedTopic,
      message:content
    };
    try{
      const response=await fetch("https://formsubmit.co/ajax/merrystaticgamesstudio@gmail.com",{
        method:"POST",
        headers:{"Content-Type":"application/json","Accept":"application/json"},
        body:JSON.stringify(formData)
      });
      const data=await response.json();
      const msg=String(data.message||"");
      if(/activat|confirm|verify|doğrula/i.test(msg)){
        result.className="contact-result-pending";
        result.textContent=tr?"E-posta teslimi için etkinleştirme gerekli. merrystaticgamesstudio@gmail.com gelen kutusuna gelen FormSubmit onay bağlantısı açılmalı.":"Email delivery requires activation. Please confirm the FormSubmit activation email sent to the studio inbox.";
      }else if(!response.ok || data.success===false || data.success==="false" || /error|fail/i.test(msg)){
        throw new Error(msg||"Delivery service rejected the request");
      }
      else if(data.success===true || data.success==="true"){
        result.className="contact-result-success";
        result.textContent=tr?"Mesajın form hizmetine iletildi. Teşekkür ederiz!":"Your message was submitted. Thank you!";
        document.getElementById("contact-message").value="";
      }else{
        result.className="contact-result-pending";
        result.textContent=tr?"İstek alındı; e-posta teslimi henüz doğrulanamadı. Lütfen daha sonra tekrar kontrol et.":"Request received, but email delivery could not be confirmed.";
      }
    }catch(error){
      result.className="contact-result-error";
      result.textContent=tr?"Mesaj gönderilemedi. İnternet bağlantını kontrol edip tekrar dene.":"Message could not be sent. Please check your connection and try again.";
    }finally{send.disabled=false;}
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
    const at=appText[lang]||appText.tr;
    plainText("#apps-kicker",at.kicker);
    htmlText("#apps-title",escapeHtml(at.title)+"<span class='period'>.</span>");
    plainText("#apps-intro",at.intro);
    plainText("#apps-count",at.appSoon);
    document.getElementById("apps-list").innerHTML=apps.map(app=>'<article class="app-showcase"><div class="app-art"><img src="'+escapeHtml(app.image)+'" alt="'+escapeHtml(app.name)+'" loading="lazy" width="256" height="256"></div><div class="app-details"><span class="app-status">✦ '+escapeHtml(at.soon)+'</span><h2>'+escapeHtml(app.name)+'</h2><p class="app-subtitle">'+escapeHtml(at.subtitle)+'</p><p class="app-description">'+escapeHtml(at.description)+'</p><div class="app-chips">'+at.features.map(feature=>'<span>'+escapeHtml(feature)+'</span>').join("")+'</div><p class="app-roadmap">'+escapeHtml(at.future)+'</p><p class="app-slogan">MS ListCep — '+escapeHtml(at.slogan)+'</p></div></article>').join("");
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
