const state = {
  lang: localStorage.getItem("dreamLang") || null,
  agreed: false,
  balance: 750000000,
  category: "all",
  search: "",
  cart: [],
  drawn: false,
  selected: []
};

const T = {
  en: {
    title:"THE LOTTERY", subtitle:"Win a fortune. Then decide what your life looks like.",
    warningTitle:"Before you play", warning1:"This is a fictional simulation. No money, prizes, purchases or deliveries are real.",
    warning2:"The products shown are real products, but this prototype does not sell them.",
    warning3:"Prices are prototype game values and may not match current retail prices.",
    agree:"I UNDERSTAND — LET'S PLAY", back:"BACK",
    ticket:"YOUR LOTTERY TICKET", pick:"Choose six numbers. Make them yours.", selected:"selected",
    draw:"DRAW THE NUMBERS", drawing:"DRAWING...", congrats:"CONGRATULATIONS",
    won:"YOU WON", continue:"START MY DREAM", shopTitle:"WHAT ARE YOU GOING TO DO WITH IT?",
    shopSub:"Spend your fictional fortune on real-world things you love.",
    all:"Everything", beauty:"Beauty", electronics:"Electronics", fashion:"Fashion", lifestyle:"Lifestyle",
    hotels:"Hotels", dining:"Dining", add:"ADD TO DREAM", cart:"YOUR DREAM", checkout:"CHECK OUT",
    empty:"Your dream is empty.", total:"Total", remaining:"Remaining", receipt:"DREAM CONFIRMED",
    receiptText:"Nothing was charged. Nothing will be delivered. This is your fictional dream.",
    close:"CLOSE", search:"Search products...", items:"items", reset:"START OVER",
    chooseSix:"Choose 6 numbers to continue.", lotteryReady:"YOUR NUMBERS"
  },
  ko: {
    title:"THE LOTTERY", subtitle:"당첨금을 받고, 내가 원하는 삶을 만들어 보세요.",
    warningTitle:"게임을 시작하기 전에", warning1:"이 사이트는 가상 시뮬레이션입니다. 돈, 당첨금, 구매 및 배송은 실제가 아닙니다.",
    warning2:"표시되는 상품과 장소는 실제 존재하지만, 이 프로토타입에서는 판매하지 않습니다.",
    warning3:"가격은 게임용 예시 가격이며 실제 판매 가격과 다를 수 있습니다.",
    agree:"확인했습니다 — 시작하기", back:"뒤로가기",
    ticket:"나의 복권", pick:"직접 6개의 번호를 선택하세요.", selected:"선택",
    draw:"번호 추첨하기", drawing:"추첨 중...", congrats:"축하합니다",
    won:"당첨금", continue:"내 꿈 시작하기", shopTitle:"이 돈으로 무엇을 할까요?",
    shopSub:"실제로 존재하는 상품과 장소로 나만의 꿈을 만들어 보세요.",
    all:"전체", beauty:"뷰티", electronics:"전자제품", fashion:"패션", lifestyle:"라이프스타일",
    hotels:"호텔", dining:"다이닝", add:"꿈에 담기", cart:"나의 꿈", checkout:"꿈 완성하기",
    empty:"아직 담은 것이 없습니다.", total:"합계", remaining:"남은 금액", receipt:"꿈이 완성되었습니다",
    receiptText:"실제 결제는 없으며 상품이 배송되지 않습니다. 이것은 가상의 꿈입니다.",
    close:"닫기", search:"상품 검색...", items:"개", reset:"처음부터",
    chooseSix:"6개의 번호를 선택해 주세요.", lotteryReady:"나의 번호"
  }
};

const money = n => "₩" + Math.round(n).toLocaleString("ko-KR");
const t = k => T[state.lang || "en"][k] || k;

function setLang(lang){
  state.lang=lang;
  localStorage.setItem("dreamLang",lang);
  render();
}

function render(){
  const app=document.getElementById("app");
  if(!state.lang){ app.innerHTML=languageScreen(); return; }
  if(!state.agreed){ app.innerHTML=warningScreen(); return; }
  if(!state.drawn){ app.innerHTML=ticketScreen(); return; }
  app.innerHTML=shopScreen();
}

function languageScreen(){
  return `<div class="screen language-screen center"><div class="lang-card">
    <div class="eyebrow">DREAM LIFE</div><div class="logo">THE<br>LOTTERY</div>
    <p class="subtitle">Choose your language / 언어를 선택하세요</p>
    <div class="lang-buttons">
      <button onclick="setLang('en')">🇬🇧 English</button>
      <button onclick="setLang('ko')">🇰🇷 한국어</button>
    </div>
  </div></div>`;
}

function warningScreen(){
  return `<div class="screen language-screen center"><div class="lang-card">
    <div class="eyebrow">THE LOTTERY</div>
    <h2>${t("warningTitle")}</h2>
    <div class="warning"><ul>
      <li>${t("warning1")}</li><li>${t("warning2")}</li><li>${t("warning3")}</li>
    </ul><div class="warning-actions">
      <button class="primary" onclick="state.agreed=true;render()">${t("agree")}</button>
      <button class="secondary" onclick="state.lang=null;localStorage.removeItem('dreamLang');render()">${t("back")}</button>
    </div></div>
  </div></div>`;
}

const ballColor = n => n <= 10 ? "yellow" : n <= 20 ? "blue" : n <= 30 ? "red" : n <= 40 ? "gray" : "green";

function lottoMark(n, extra=""){
  return `<button class="lotto-mark ${extra}" onclick="toggleNumber(${n})" aria-label="Number ${n}" aria-pressed="${extra.includes("selected") ? "true" : "false"}"><span>${n}</span></button>`;
}

function ticketScreen(){
  const selected = state.selected;
  return `<div class="hero"><div class="topbar"><div class="wordmark">${t("title")}</div><button class="lang-toggle" onclick="setLang(state.lang==='en'?'ko':'en')">${state.lang==='en'?'🇰🇷 한국어':'🇬🇧 English'}</button></div>
    <div class="hero-main"><div class="ticket-wrap">
      <div class="eyebrow">DREAM LIFE</div>
      <h1>${t("ticket")}</h1>
      <div class="ticket korean-ticket">
        <div class="ticket-brand"><span>동행복권</span><strong>Lotto <b>6/45</b></strong></div>
        <div class="ticket-price">₩1,000 <span>GAME</span></div>
        <p class="ticket-instruction">${t("pick")}</p>
        <div class="selected-label">${t("lotteryReady")}: <strong>${selected.length}/6</strong></div>
        <div class="selected-balls selected-marks">
          ${selected.map(n=>lottoMark(n,"selected chosen")).join("") || `<span class="empty-selection">${state.lang==='ko'?'번호를 선택하세요':'Choose your numbers'}</span>`}
        </div>
        <div class="number-grid lotto-grid">
          ${Array.from({length:45},(_,i)=>i+1).map(n=>lottoMark(n, selected.includes(n) ? "selected" : "")).join("")}
        </div>
        <div class="ticket-bottom"><span>● ${state.lang==='ko'?'수동 선택':'MANUAL'}</span><span>${selected.length}/6</span></div>
        <div class="draw-area" id="drawArea"></div>
        <button class="draw-button" id="drawBtn" onclick="drawLottery()" ${selected.length!==6?"disabled":""}>${t("draw")}</button>
        ${selected.length!==6 ? `<div class="choose-note">${t("chooseSix")}</div>` : ""}
      </div>
    </div></div></div>`;
}

function toggleNumber(n){
  if(state.selected.includes(n)){
    state.selected=state.selected.filter(x=>x!==n);
  } else if(state.selected.length<6){
    state.selected=[...state.selected,n].sort((a,b)=>a-b);
  }
  render();
}

function drawLottery(){
  if(state.selected.length!==6)return;
  const btn=document.getElementById("drawBtn");
  btn.disabled=true;
  btn.textContent=t("drawing");
  const area=document.getElementById("drawArea");
  area.innerHTML="";
  state.selected.forEach((n,i)=>{
    setTimeout(()=>{
      area.innerHTML+=`<div class="ball ${ballColor(n)} draw-ball" style="animation-delay:${i*30}ms">${n}</div>`;
    },i*520);
  });
  setTimeout(showWin,state.selected.length*520+700);
}

function showWin(){
  const el=document.createElement("div");
  el.className="win";
  el.innerHTML=`<div class="win-card"><div class="eyebrow">${t("congrats")}</div><h1>${t("won")}</h1><div class="win-amount" id="winAmount">₩0</div><div class="bank-count">${t("remaining")}: <strong>₩750,000,000</strong></div><button class="primary" onclick="state.drawn=true;render()">${t("continue")}</button></div>`;
  document.body.appendChild(el);
  let start=0,target=750000000,dur=2200,startTime=null;
  const tick=ts=>{
    if(!startTime)startTime=ts;
    const p=Math.min((ts-startTime)/dur,1);
    const eased=1-Math.pow(1-p,3);
    const amount=start+(target-start)*eased;
    const amountEl=document.getElementById("winAmount");
    if(amountEl)amountEl.textContent=money(amount);
    if(p<1)requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const labels={all:"all",beauty:"beauty",electronics:"electronics",fashion:"fashion",lifestyle:"lifestyle",hotels:"hotels",dining:"dining"};

function filtered(){
  const q=state.search.toLowerCase();
  return PRODUCTS.filter(p=>(state.category==="all"||p.cat===state.category) && (!q || `${p.brand} ${p.name} ${p.ko}`.toLowerCase().includes(q)));
}

function productCard(p){
  const initials=p.brand.split(/\s+/).map(x=>x[0]).slice(0,2).join("").toUpperCase();
  return `<article class="product"><div class="product-art"><div class="product-cat">${t(p.cat)}</div><span>${initials}</span></div><div class="product-info"><div class="brand">${p.brand}</div><div class="product-name">${p.name}</div><div class="product-ko">${p.ko}</div><div class="price">${money(p.price)}</div><button class="add" onclick="addToCart('${p.id}')">${t("add")}</button></div></article>`;
}

function shopScreen(){
  const list=filtered();
  return `<div class="shop"><div class="shopbar"><div class="shopnav"><div class="wordmark">${t("title")}</div><input class="search" placeholder="${t("search")}" value="${state.search.replaceAll('"','&quot;')}" oninput="state.search=this.value;render()"><div class="balance">${money(state.balance)}</div></div>
  <div class="categories">${Object.keys(labels).map(c=>`<button class="cat ${state.category===c?'active':''}" onclick="state.category='${c}';render()">${t(c)}</button>`).join("")}</div></div>
  <div class="shop-heading"><div><div class="eyebrow">60 REAL-WORLD PICKS</div><h1>${t("shopTitle")}</h1><p>${t("shopSub")}</p></div><button class="lang-toggle" onclick="setLang(state.lang==='en'?'ko':'en')">${state.lang==='en'?'🇰🇷 한국어':'🇬🇧 English'}</button></div>
  ${list.length ? `<div class="grid">${list.map(productCard).join("")}</div>` : `<div class="empty-shop">${t("empty")}</div>`}
  ${cartDrawer()}</div>`;
}

function addToCart(id){
  const p=PRODUCTS.find(x=>x.id===id);
  if(!p)return;
  if(p.price>state.balance){
    alert(state.lang==='ko'?"잔액이 부족합니다.":"You don't have enough fictional money.");
    return;
  }
  state.cart.push(p);
  state.balance-=p.price;
  render();
}

function cartDrawer(){
  if(!state.cart.length)return "";
  const total=state.cart.reduce((s,p)=>s+p.price,0);
  return `<div class="cart-drawer"><div class="cart-head"><strong>${t("cart")} · ${state.cart.length}${t("items")}</strong><span>${money(state.balance)}</span></div><div class="cart-items">${state.cart.map(p=>`<div class="cart-item"><span>${p.brand} ${p.name}</span><strong>${money(p.price)}</strong></div>`).join("")}</div><div class="cart-total"><span>${t("total")}</span><span>${money(total)}</span></div><div class="cart-actions"><button onclick="resetDream()">${t("reset")}</button><button class="checkout" onclick="checkout()">${t("checkout")}</button></div></div>`;
}

function resetDream(){
  state.balance=750000000;
  state.cart=[];
  render();
}

function checkout(){
  const total=state.cart.reduce((s,p)=>s+p.price,0);
  const modal=document.createElement("div");
  modal.className="receipt";
  modal.innerHTML=`<div class="receipt-card"><div class="eyebrow">THE LOTTERY</div><h2>${t("receipt")}</h2><p>${t("receiptText")}</p>${state.cart.map(p=>`<div class="receipt-line"><span>${p.brand} ${p.name}</span><strong>${money(p.price)}</strong></div>`).join("")}<div class="receipt-line"><strong>${t("total")}</strong><strong>${money(total)}</strong></div><p class="small">${t("remaining")}: ${money(state.balance)}</p><button class="add" onclick="this.closest('.receipt').remove()">${t("close")}</button></div>`;
  document.body.appendChild(modal);
}

render();
