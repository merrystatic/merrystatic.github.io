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
})();
