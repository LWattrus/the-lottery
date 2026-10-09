/*
 * THE LOTTERY — complete app.js replacement
 * Front-end only. Product prices are illustrative estimates, not live quotes.
 * Suggestion submissions are kept in this browser as pending and are not published.
 */
'use strict';

const state = {
  lang: localStorage.getItem('dreamLang') || null,
  agreed: false,
  balance: 750000000,
  drawn: false,
  dream: false,
  destination: null,
  seoulPlanning: null,
  selected: [],
  hotelNights: 2,
  view: 'main',
  notice: '',
  suggestions: JSON.parse(localStorage.getItem('dreamSuggestions') || '[]'),
  cart: [],
  category: 'all',
  search: ''
};

const WON = '₩';
const money = n => WON + Math.round(Number(n) || 0).toLocaleString('en-US');
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2,8)}`;

const T = {
  en: {
    chooseLanguage:'Choose your language', english:'English', korean:'한국어', continue:'Continue',
    warningTitle:'A little dream. A little escape.', warning:'This is a fictional entertainment experience. No real money is spent, no lottery ticket is purchased, and no prize can be won. All budgets and prices are simulated.', agree:'I understand. Let me dream.',
    ticketTitle:'What if tonight was your night?', ticketSubtitle:'Choose six numbers from 1 to 45.', selected:'selected', draw:'Draw my numbers', random:'Quick pick', reset:'Clear numbers',
    dreamTitle:'Congratulations. You won!', dreamText:'In this imaginary world, you have', startDream:'Start my dream', dreamPicker:'What would you do with your dream money?', getaway:'Your perfect getaway', shopping:'Shop the world', home:'Buy your dream home', live:'Live the dream',
    destinations:'Choose your destination', seoul:'Seoul', comingSoon:'Coming soon', back:'Back', homePage:'Seoul dream planner', tagline:'Your Seoul. Your rules. Your dream budget.',
    stay:'Stay', dine:'Dine', experience:'Experience', shop:'Shop', move:'Move', itinerary:'My itinerary', remaining:'Budget remaining', spent:'Planned spend', add:'Add to itinerary', remove:'Remove', selectedItems:'Your selections', noItems:'Nothing planned yet. Explore a category to start building your dream trip.',
    nights:'Nights', total:'Total', hotel:'Hotel', estimated:'Illustrative estimate', planTrip:'Build my Seoul trip', suggestionTitle:'Suggest a place or experience', suggestionText:'Have a great idea for Seoul? Send it for review. Suggestions stay private in this demo and are not published.', name:'Place or experience name', details:'Optional description', submitSuggestion:'Submit suggestion', pending:'Saved as pending review on this device.',
    emptyName:'Please enter a name first.', budgetLow:'This selection is over your remaining budget.', added:'Added to your itinerary.', already:'This item is already in your itinerary.', clear:'Clear itinerary', confirmClear:'Remove every item from your itinerary?',
    categories:{stay:'STAY',dine:'DINE',experience:'EXPERIENCE',shop:'SHOP',move:'MOVE'}, shopTitle:'Shop the dream', search:'Search products', addCart:'Add to bag', bag:'Your bag', checkout:'Dream checkout', emptyBag:'Your bag is empty.',
    restart:'Start over', changeLanguage:'Language', all:'All', footer:'A fictional experience. Prices are estimates, not live offers.'
  },
  ko: {
    chooseLanguage:'언어를 선택하세요', english:'English', korean:'한국어', continue:'계속',
    warningTitle:'잠시 꿈꾸는 특별한 시간', warning:'이 사이트는 가상의 엔터테인먼트 경험입니다. 실제 돈을 사용하거나 복권을 구매하지 않으며, 실제 당첨금도 없습니다. 모든 예산과 가격은 가상입니다.', agree:'이해했습니다. 시작할게요.',
    ticketTitle:'오늘 밤, 행운이 온다면?', ticketSubtitle:'1부터 45까지 숫자 6개를 선택하세요.', selected:'선택', draw:'번호 추첨하기', random:'자동 선택', reset:'초기화',
    dreamTitle:'축하합니다! 당첨입니다!', dreamText:'이 가상 세계에서 당신의 당첨금은', startDream:'꿈 시작하기', dreamPicker:'당첨금으로 무엇을 하고 싶나요?', getaway:'완벽한 여행', shopping:'세계에서 쇼핑하기', home:'꿈의 집 구매하기', live:'꿈처럼 살기',
    destinations:'여행지를 선택하세요', seoul:'서울', comingSoon:'준비 중', back:'뒤로', homePage:'서울 드림 플래너', tagline:'당신의 서울, 당신의 방식, 당신의 꿈 예산.',
    stay:'숙박', dine:'식사', experience:'체험', shop:'쇼핑', move:'이동', itinerary:'내 일정', remaining:'남은 예산', spent:'예정 지출', nights:'숙박 일수', total:'합계', hotel:'호텔', estimated:'예상 가격',
    add:'일정에 추가', remove:'삭제', selectedItems:'선택한 항목', noItems:'아직 계획이 없습니다. 카테고리를 선택해 여행을 만들어 보세요.', planTrip:'서울 여행 만들기',
    suggestionTitle:'장소 또는 체험 추천하기', suggestionText:'서울의 좋은 아이디어가 있나요? 검토를 위해 보내 주세요. 이 데모에서는 추천 내용이 이 기기에만 저장되며 공개되지 않습니다.', name:'장소 또는 체험 이름', details:'설명 (선택 사항)', submitSuggestion:'추천 제출', pending:'검토 대기 상태로 이 기기에 저장했습니다.',
    emptyName:'먼저 이름을 입력해 주세요.', budgetLow:'남은 예산보다 비싼 항목입니다.', added:'일정에 추가했습니다.', already:'이미 일정에 있는 항목입니다.', clear:'일정 비우기', confirmClear:'일정의 모든 항목을 삭제할까요?',
    categories:{stay:'숙박',dine:'식사',experience:'체험',shop:'쇼핑',move:'이동'}, shopTitle:'꿈의 쇼핑', search:'상품 검색', addCart:'가방에 담기', bag:'쇼핑 가방', checkout:'가상 결제', emptyBag:'가방이 비어 있습니다.',
    restart:'처음부터', changeLanguage:'언어', all:'전체', footer:'가상의 경험입니다. 가격은 실시간 상품 가격이 아닌 예상 금액입니다.'
  }
};
const t = key => {
  const lang = T[state.lang] || T.en;
  return key.split('.').reduce((obj,k)=>obj?.[k], lang) ?? key;
};

// Curated sample options. Prices are estimates and can be edited here at any time.
const SEOUL = {
  stay: [
    {id:'hotel-four-seasons',name:'Four Seasons Hotel Seoul',kind:'Luxury hotel',price:650000,unit:'night',area:'Gwanghwamun',desc:'Polished luxury, skyline views and a central location.',image:'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80'},
    {id:'hotel-signiel',name:'SIGNIEL Seoul',kind:'Luxury hotel',price:700000,unit:'night',area:'Jamsil',desc:'High-rise views over the city and the Han River.',image:'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80'},
    {id:'hotel-josun',name:'The Westin Josun Seoul',kind:'Luxury hotel',price:600000,unit:'night',area:'City Hall',desc:'Classic five-star comfort close to central Seoul.',image:'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80'},
    {id:'hotel-park-hyatt',name:'Park Hyatt Seoul',kind:'Luxury hotel',price:550000,unit:'night',area:'Gangnam',desc:'Contemporary design in the heart of Gangnam.',image:'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80'}
  ],
  dine: [
    {id:'dine-fine',name:'Luxury tasting-menu dinner',kind:'Fine dining',price:250000,unit:'person',area:'Gangnam / central Seoul',desc:'A special multi-course dinner for a memorable night.',image:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80'},
    {id:'dine-korean',name:'Modern Korean tasting menu',kind:'Korean cuisine',price:180000,unit:'person',area:'Jongno',desc:'Seasonal Korean ingredients in a refined setting.',image:'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80'},
    {id:'dine-rooftop',name:'Rooftop cocktail and dinner',kind:'Rooftop dining',price:150000,unit:'person',area:'Itaewon',desc:'City lights, a relaxed meal and a great view.',image:'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=80'},
    {id:'dine-cafe',name:'Designer café afternoon',kind:'Café',price:35000,unit:'visit',area:'Seongsu',desc:'Coffee, dessert and a slow afternoon.',image:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80'}
  ],
  experience: [
    {id:'exp-spa',name:'Private luxury spa session',kind:'Wellness',price:220000,unit:'person',area:'Gangnam',desc:'A restorative spa visit and treatment.',image:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80'},
    {id:'exp-hanbok',name:'Premium hanbok photoshoot',kind:'Culture',price:120000,unit:'session',area:'Gyeongbokgung',desc:'Traditional clothing and a guided photo session.',image:'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=900&q=80'},
    {id:'exp-car',name:'Private driver for a half day',kind:'Private tour',price:280000,unit:'half day',area:'Seoul',desc:'Explore the city with a private driver.',image:'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=900&q=80'},
    {id:'exp-show',name:'Premium concert or show budget',kind:'Entertainment',price:180000,unit:'ticket',area:'Seoul',desc:'A placeholder budget for a special live event.',image:'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80'}
  ],
  shop: [
    {id:'shop-fashion',name:'Designer fashion shopping budget',kind:'Fashion',price:500000,unit:'budget',area:'Cheongdam / Apgujeong',desc:'A flexible budget for a luxury shopping stop.',image:'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80'},
    {id:'shop-beauty',name:'K-beauty and skincare haul',kind:'Beauty',price:180000,unit:'budget',area:'Myeongdong',desc:'Skincare, beauty products and gifts.',image:'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=80'},
    {id:'shop-design',name:'Seongsu design stores',kind:'Lifestyle',price:150000,unit:'budget',area:'Seongsu',desc:'Independent labels, accessories and design finds.',image:'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80'}
  ],
  move: [
    {id:'move-taxi',name:'Premium taxi and local rides',kind:'Transport',price:100000,unit:'trip budget',area:'Seoul',desc:'A flexible budget for taxis and short rides.',image:'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80'},
    {id:'move-airport',name:'Airport transfer',kind:'Transfer',price:90000,unit:'one way',area:'Incheon ↔ Seoul',desc:'Estimated private transfer budget for one journey.',image:'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80'},
    {id:'move-transit',name:'Transit card and subway budget',kind:'Public transport',price:30000,unit:'trip budget',area:'Seoul',desc:'An estimated budget for subway and bus journeys.',image:'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80'}
  ]
};

function setNotice(message){ state.notice = message || ''; }
function spendTotal(){ return state.selected.reduce((sum,item)=>sum + item.price * (item.category==='stay' ? state.hotelNights : 1),0); }
function remaining(){ return state.balance - spendTotal(); }
function selectedKey(category,id){ return `${category}:${id}`; }
function isSelected(category,id){ return state.selected.some(item=>selectedKey(item.category,item.id)===selectedKey(category,id)); }
function getSelected(category,id){ return state.selected.find(item=>selectedKey(item.category,item.id)===selectedKey(category,id)); }
function categoryName(category){ return t(`categories.${category}`); }

function brandBar(){
  return `<header class="brand-bar"><button class="brand-mark" onclick="goSeoulHome()" aria-label="Seoul home">THE LOTTERY <span>✦</span></button><div class="brand-actions"><button class="text-button" onclick="showItinerary()">${escapeHTML(t('itinerary'))} · ${state.selected.length}</button><button class="text-button" onclick="changeLanguage()">${escapeHTML(t('changeLanguage'))}</button></div></header>`;
}
function languageScreen(){
  return `<main class="center-screen luxury-screen"><div class="eyebrow">THE LOTTERY</div><h1>${t('chooseLanguage')}</h1><div class="language-options"><button class="luxury-button" onclick="chooseLanguage('en')">English</button><button class="luxury-button" onclick="chooseLanguage('ko')">한국어</button></div></main>`;
}
function warningScreen(){
  return `<main class="center-screen luxury-screen"><div class="eyebrow">A DREAM, NOT REAL MONEY</div><h1>${t('warningTitle')}</h1><p class="lead">${t('warning')}</p><button class="gold-button" onclick="acceptWarning()">${t('agree')}</button></main>`;
}
function ticketScreen(){
  const balls=Array.from({length:45},(_,i)=>i+1).map(n=>`<button class="lotto-ball ${state.lottoNumbers?.includes(n)?'chosen':''}" onclick="toggleNumber(${n})">${n}</button>`).join('');
  return `${brandBar()}<main class="lottery-screen"><div class="eyebrow">YOUR IMAGINATION STARTS HERE</div><h1>${t('ticketTitle')}</h1><p>${t('ticketSubtitle')}</p><div class="lotto-grid">${balls}</div><p class="muted">${state.lottoNumbers?.length||0} / 6 ${t('selected')}</p><div class="button-row"><button class="outline-button" onclick="quickPick()">${t('random')}</button><button class="outline-button" onclick="clearNumbers()">${t('reset')}</button><button class="gold-button" ${state.lottoNumbers?.length!==6?'disabled':''} onclick="drawNumbers()">${t('draw')}</button></div></main>`;
}
function dreamPickerScreen(){
  return `${brandBar()}<main class="dream-picker"><div class="eyebrow">THE IMAGINARY JACKPOT</div><h1>${t('dreamTitle')}</h1><p class="lead">${t('dreamText')}</p><div class="jackpot-amount">${money(state.balance)}</div><h2>${t('dreamPicker')}</h2><div class="dream-cards"><button class="dream-card" onclick="chooseDream('getaway')"><span>✦</span><h3>${t('getaway')}</h3><p>Build your perfect trip, one unforgettable choice at a time.</p></button><button class="dream-card" onclick="chooseDream('shop')"><span>◇</span><h3>${t('shopping')}</h3><p>Make room for the things you have always wanted.</p></button><button class="dream-card disabled-card" onclick="comingSoon()"><span>⌂</span><h3>${t('home')}</h3><p>${t('comingSoon')}</p></button><button class="dream-card disabled-card" onclick="comingSoon()"><span>∞</span><h3>${t('live')}</h3><p>${t('comingSoon')}</p></button></div><button class="gold-button" onclick="startDream()">${t('startDream')}</button></main>`;
}
function destinationScreen(){
  return `${brandBar()}<main class="destination-screen"><div class="eyebrow">YOUR PERFECT GETAWAY</div><h1>${t('destinations')}</h1><div class="destination-grid"><button class="destination-card seoul-card" onclick="selectDestination('seoul')"><span class="destination-label">AVAILABLE NOW</span><h2>SEOUL</h2><p>Luxury, culture, food and unforgettable nights.</p><span class="destination-arrow">↗</span></button>${['NEW YORK','PARIS','TOKYO','LONDON','DUBAI'].map(name=>`<button class="destination-card unavailable" onclick="comingSoon()"><span class="destination-label">${t('comingSoon')}</span><h2>${name}</h2><p>More dream destinations are on the way.</p></button>`).join('')}</div></main>`;
}
function seoulPlannerScreen(){
  return `${brandBar()}<main class="seoul-home"><section class="seoul-hero"><div class="hero-overlay"><div class="eyebrow">YOUR PRIVATE SEOUL EDIT</div><h1>SEOUL,<br><em>YOUR WAY.</em></h1><p>${t('tagline')}</p><button class="gold-button" onclick="showItinerary()">${t('planTrip')} ↗</button></div></section><section class="budget-strip"><div><span>${t('remaining')}</span><strong>${money(remaining())}</strong></div><div><span>${t('spent')}</span><strong>${money(spendTotal())}</strong></div><div><span>${t('itinerary')}</span><strong>${state.selected.length} ${state.lang==='ko'?'개':'items'}</strong></div></section><section class="category-section"><div class="section-heading"><div><div class="eyebrow">MAKE IT YOURS</div><h2>Choose your Seoul</h2></div><button class="text-button" onclick="showItinerary()">View itinerary ↗</button></div><div class="category-tiles">${['stay','dine','experience','shop','move'].map((cat,i)=>`<button class="category-tile tile-${cat}" onclick="openCategory('${cat}')"><span class="tile-number">0${i+1}</span><span class="tile-title">${categoryName(cat)}</span><span class="tile-arrow">↗</span></button>`).join('')}</div></section><section class="suggestion-panel"><div><div class="eyebrow">YOUR LOCAL KNOWLEDGE</div><h2>${t('suggestionTitle')}</h2><p>${t('suggestionText')}</p></div><form class="suggestion-form" onsubmit="submitSuggestion(event)"><input id="suggestion-name" maxlength="100" placeholder="${t('name')}" required><textarea id="suggestion-details" maxlength="600" placeholder="${t('details')}"></textarea><button class="outline-button" type="submit">${t('submitSuggestion')} ↗</button></form></section></main>${noticeBar()}${footer()}`;
}
function noticeBar(){ return state.notice?`<div class="notice-toast" role="status">${escapeHTML(state.notice)}<button onclick="setNotice('');render()" aria-label="Close">×</button></div>`:''; }
function footer(){ return `<footer class="site-footer">${t('footer')} <button class="text-button" onclick="restartApp()">${t('restart')}</button></footer>`; }
function openCategory(category){ state.seoulPlanning=category; state.view='category'; setNotice(''); render(); window.scrollTo(0,0); }
function seoulCategoryScreen(category){
  const items=SEOUL[category]||[];
  const isStay=category==='stay';
  return `${brandBar()}<main class="category-page"><button class="back-link" onclick="goSeoulHome()">← ${t('back')} / SEOUL</button><div class="eyebrow">SEOUL · ${categoryName(category)}</div><h1>${categoryName(category)}<span class="title-period">.</span></h1><p class="lead">${categoryIntro(category)}</p>${isStay?`<div class="nights-control"><label for="hotel-nights">${t('nights')}</label><button onclick="changeNights(-1)" aria-label="Fewer nights">−</button><strong id="nights-count">${state.hotelNights}</strong><button onclick="changeNights(1)" aria-label="More nights">+</button><span>${state.lang==='ko'?'박 기준':'nights for selected hotel'}</span></div>`:''}<div class="budget-strip compact"><div><span>${t('remaining')}</span><strong>${money(remaining())}</strong></div><div><span>${t('spent')}</span><strong>${money(spendTotal())}</strong></div></div><div class="option-grid">${items.map(item=>optionCard(item,category)).join('')}</div><section class="inline-itinerary"><h2>${t('selectedItems')}</h2>${state.selected.length?selectedList(true):`<p>${t('noItems')}</p>`}<button class="gold-button" onclick="showItinerary()">${t('itinerary')} ↗</button></section></main>${noticeBar()}${footer()}`;
}
function categoryIntro(category){
 const intros={stay:'Find a place that makes the whole trip feel special.',dine:'Plan a memorable meal, from Korean flavours to rooftop evenings.',experience:'Give your trip a moment you will remember.',shop:'Set aside a dream budget for Seoul’s style and design.',move:'Make getting around the city feel easy.'};
 return intros[category]||'';
}
function optionCard(item,category){
 const picked=isSelected(category,item.id), amount=item.price*(category==='stay'?state.hotelNights:1);
 return `<article class="option-card"><div class="option-image-wrap"><img class="option-image" src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}" loading="lazy" onerror="this.style.display='none'"><span class="option-kind">${escapeHTML(item.kind)}</span></div><div class="option-content"><div class="option-area">${escapeHTML(item.area)}</div><h2>${escapeHTML(item.name)}</h2><p>${escapeHTML(item.desc)}</p><div class="option-bottom"><div><strong>${money(amount)}</strong><small>${category==='stay'?`${money(item.price)} / night × ${state.hotelNights} ${t('nights')}`:`${t('estimated')} · ${escapeHTML(item.unit)}`}</small></div><button class="${picked?'selected-button':'outline-button'}" onclick="${picked?`removeItem('${category}','${item.id}')`:`addItem('${category}','${item.id}')`}">${picked?t('remove'):t('add')}</button></div></div></article>`;
}
function selectedList(compact=false){
 if(!state.selected.length)return `<p>${t('noItems')}</p>`;
 return `<div class="selected-list">${state.selected.map(item=>`<div class="selected-row"><div><span class="selected-category">${escapeHTML(categoryName(item.category))}</span><strong>${escapeHTML(item.name)}</strong><small>${item.category==='stay'?`${money(item.price)} × ${state.hotelNights} ${t('nights')}`:money(item.price)}</small></div><strong class="selected-price">${money(item.price*(item.category==='stay'?state.hotelNights:1))}</strong><button class="remove-icon" onclick="removeItem('${item.category}','${item.id}')" aria-label="${t('remove')}">×</button></div>`).join('')}</div>`;
}
function itineraryScreen(){
 return `${brandBar()}<main class="itinerary-page"><button class="back-link" onclick="goSeoulHome()">← SEOUL</button><div class="eyebrow">YOUR PERSONAL EDIT</div><h1>${t('itinerary')}<span class="title-period">.</span></h1><p class="lead">A flexible plan for your own dream weekend in Seoul.</p><section class="itinerary-summary"><div><span>${t('remaining')}</span><strong>${money(remaining())}</strong></div><div><span>${t('spent')}</span><strong>${money(spendTotal())}</strong></div><div><span>${t('selectedItems')}</span><strong>${state.selected.length}</strong></div></section>${selectedList()}<div class="itinerary-actions"><button class="gold-button" onclick="goSeoulHome()">＋ Add more places</button>${state.selected.length?`<button class="outline-button" onclick="clearItinerary()">${t('clear')}</button>`:''}</div><section class="suggestion-panel itinerary-suggestion"><div><div class="eyebrow">MAKE SEOUL BETTER</div><h2>${t('suggestionTitle')}</h2><p>${t('suggestionText')}</p></div><form class="suggestion-form" onsubmit="submitSuggestion(event)"><input id="suggestion-name" maxlength="100" placeholder="${t('name')}" required><textarea id="suggestion-details" maxlength="600" placeholder="${t('details')}"></textarea><button class="outline-button" type="submit">${t('submitSuggestion')} ↗</button></form></section></main>${noticeBar()}${footer()}`;
}
function shopScreen(){
 const products=Array.isArray(window.DREAM_PRODUCTS)?window.DREAM_PRODUCTS:(Array.isArray(window.products)?window.products:[]);
 let filtered=products.filter(p=>{
  const name=String(p.name||p.title||'');
  const category=String(p.category||'').toLowerCase();
  const matchesCat=state.category==='all'||category===state.category;
  const matchesSearch=!state.search||name.toLowerCase().includes(state.search.toLowerCase());
  return matchesCat&&matchesSearch;
 });
 return `${brandBar()}<main class="category-page"><button class="back-link" onclick="backToDreamPicker()">← ${t('back')}</button><div class="eyebrow">THE DREAM EDIT</div><h1>${t('shopTitle')}</h1><p class="lead">A simulated shopping experience. No real purchases are made.</p><div class="shop-controls"><input placeholder="${t('search')}" value="${escapeHTML(state.search)}" oninput="updateSearch(this.value)"><select onchange="updateShopCategory(this.value)"><option value="all">${t('all')}</option>${['fashion','beauty','home','tech','travel','lifestyle'].map(c=>`<option value="${c}" ${state.category===c?'selected':''}>${c}</option>`).join('')}</select><button class="outline-button" onclick="showBag()">${t('bag')} (${state.cart.length})</button></div><div class="option-grid">${filtered.map((p,i)=>{const name=p.name||p.title||'Dream item';const price=Number(p.price||p.amount||0);const image=p.image||p.imageUrl||'';return `<article class="option-card"><div class="option-image-wrap">${image?`<img class="option-image" src="${escapeHTML(image)}" alt="${escapeHTML(name)}" onerror="this.style.display='none'">`:''}</div><div class="option-content"><div class="option-area">${escapeHTML(p.category||'Dream edit')}</div><h2>${escapeHTML(name)}</h2><p>${escapeHTML(p.description||'An item for your imaginary dream life.')}</p><div class="option-bottom"><strong>${money(price)}</strong><button class="outline-button" onclick="addToBag(${i},'${escapeHTML(name).replace(/'/g,"\\'")}',${price},'${escapeHTML(image)}')">${t('addCart')}</button></div></div></article>`;}).join('')||`<p>No matching products found. Check that products.js is loaded.</p>`}</div></main>${noticeBar()}${footer()}`;
}
function bagScreen(){
 const total=state.cart.reduce((s,i)=>s+i.price*i.qty,0);
 return `${brandBar()}<main class="itinerary-page"><button class="back-link" onclick="openShop()">← ${t('back')}</button><div class="eyebrow">YOUR DREAM BAG</div><h1>${t('bag')}</h1>${state.cart.length?`<div class="selected-list">${state.cart.map((i,n)=>`<div class="selected-row"><div><strong>${escapeHTML(i.name)}</strong><small>${money(i.price)} × ${i.qty}</small></div><strong>${money(i.price*i.qty)}</strong><button class="remove-icon" onclick="removeFromBag(${n})">×</button></div>`).join('')}</div><div class="itinerary-summary"><div><span>${t('total')}</span><strong>${money(total)}</strong></div></div><button class="gold-button" onclick="fakeCheckout()">${t('checkout')}</button>`:`<p>${t('emptyBag')}</p>`}</main>${noticeBar()}${footer()}`;
}
function render(){
 const app=document.getElementById('app');
 if(!app){console.error('Could not find #app element');return;}
 if(!state.lang){app.innerHTML=languageScreen();return;}
 if(!state.agreed){app.innerHTML=warningScreen();return;}
 if(!state.drawn){app.innerHTML=ticketScreen();return;}
 if(!state.dream){app.innerHTML=dreamPickerScreen();return;}
 if(state.view==='itinerary'){app.innerHTML=itineraryScreen();return;}
 if(state.view==='shop'){app.innerHTML=shopScreen();return;}
 if(state.view==='bag'){app.innerHTML=bagScreen();return;}
 if(state.destination==='seoul'){
   if(state.view==='category'&&state.seoulPlanning){app.innerHTML=seoulCategoryScreen(state.seoulPlanning);return;}
   app.innerHTML=seoulPlannerScreen();return;
 }
 if(state.destination){app.innerHTML=destinationScreen();return;}
 app.innerHTML=destinationScreen();
}

// Main navigation actions
function chooseLanguage(lang){state.lang=lang;localStorage.setItem('dreamLang',lang);render();}
function changeLanguage(){state.lang=null;render();}
function acceptWarning(){state.agreed=true;render();}
function toggleNumber(n){state.lottoNumbers=state.lottoNumbers||[];if(state.lottoNumbers.includes(n)){state.lottoNumbers=state.lottoNumbers.filter(x=>x!==n);}else if(state.lottoNumbers.length<6){state.lottoNumbers.push(n);}render();}
function quickPick(){const pool=Array.from({length:45},(_,i)=>i+1);state.lottoNumbers=[];while(state.lottoNumbers.length<6){const n=pool.splice(Math.floor(Math.random()*pool.length),1)[0];state.lottoNumbers.push(n);}state.lottoNumbers.sort((a,b)=>a-b);render();}
function clearNumbers(){state.lottoNumbers=[];render();}
function drawNumbers(){if((state.lottoNumbers||[]).length!==6)return;state.drawn=true;state.drawnNumbers=[...state.lottoNumbers].sort((a,b)=>a-b);render();}
function chooseDream(choice){if(choice==='shop'){state.view='shop';render();return;}startDream();}
function startDream(){state.dream=true;state.destination=null;state.view='main';render();}
function selectDestination(destination){state.destination=destination;state.seoulPlanning=null;state.view='main';render();window.scrollTo(0,0);}
function goSeoulHome(){state.destination='seoul';state.seoulPlanning=null;state.view='main';setNotice('');render();window.scrollTo(0,0);}
function showItinerary(){state.view='itinerary';render();window.scrollTo(0,0);}
function backToDreamPicker(){state.dream=false;state.view='main';state.destination=null;render();}
function comingSoon(){setNotice(t('comingSoon'));render();}
function restartApp(){if(confirm('Start the experience again? Your current itinerary will be cleared.')){state.agreed=false;state.drawn=false;state.dream=false;state.destination=null;state.seoulPlanning=null;state.view='main';state.selected=[];state.lottoNumbers=[];state.cart=[];state.balance=750000000;setNotice('');render();}}

// Seoul planner and shared budget
function addItem(category,id){
 const item=(SEOUL[category]||[]).find(x=>x.id===id);if(!item)return;
 if(isSelected(category,id)){setNotice(t('already'));render();return;}
 const cost=item.price*(category==='stay'?state.hotelNights:1);
 if(cost>remaining()){setNotice(t('budgetLow'));render();return;}
 state.selected.push({...item,category});setNotice(t('added'));render();
}
function removeItem(category,id){state.selected=state.selected.filter(item=>!(item.category===category&&item.id===id));setNotice(t('remove'));render();}
function changeNights(delta){
 const next=Math.max(1,Math.min(30,state.hotelNights+delta));
 const hotel=state.selected.find(item=>item.category==='stay');
 if(hotel&&hotel.price*next>state.balance-(spendTotal()-hotel.price*state.hotelNights)){setNotice(t('budgetLow'));render();return;}
 state.hotelNights=next;render();
}
function clearItinerary(){if(confirm(t('confirmClear'))){state.selected=[];setNotice('');render();}}
function submitSuggestion(event){
 event.preventDefault();const name=document.getElementById('suggestion-name')?.value.trim()||'';const details=document.getElementById('suggestion-details')?.value.trim()||'';
 if(!name){setNotice(t('emptyName'));render();return;}
 const suggestion={id:uid(),name,details,status:'pending',createdAt:new Date().toISOString()};
 state.suggestions.push(suggestion);try{localStorage.setItem('dreamSuggestions',JSON.stringify(state.suggestions));}catch(e){console.warn('Could not save suggestion locally',e);}
 setNotice(t('pending'));render();
}

// Optional products.js shopping area; no real checkout or payment.
function openShop(){state.view='shop';render();}
function updateSearch(value){state.search=value;const cursor=window.getSelection?.();render();const input=document.querySelector('.shop-controls input');if(input){input.focus();input.setSelectionRange(value.length,value.length);}}
function updateShopCategory(value){state.category=value;render();}
function addToBag(index,name,price,image){
 const products=Array.isArray(window.DREAM_PRODUCTS)?window.DREAM_PRODUCTS:(Array.isArray(window.products)?window.products:[]);
 const product=products[index];const realName=product?.name||product?.title||name;const realPrice=Number(product?.price||product?.amount||price)||0;const realImage=product?.image||product?.imageUrl||image||'';
 const existing=state.cart.find(i=>i.name===realName);if(existing)existing.qty++;else state.cart.push({name:realName,price:realPrice,image:realImage,qty:1});setNotice(t('added'));render();
}
function showBag(){state.view='bag';render();}
function removeFromBag(index){state.cart.splice(index,1);render();}
function fakeCheckout(){setNotice('Demo only: no payment was taken.');state.cart=[];state.view='shop';render();}

// Make inline HTML handlers available when scripts are loaded as a module or strict script.
Object.assign(window,{chooseLanguage,changeLanguage,acceptWarning,toggleNumber,quickPick,clearNumbers,drawNumbers,chooseDream,startDream,selectDestination,goSeoulHome,showItinerary,backToDreamPicker,comingSoon,restartApp,openCategory,addItem,removeItem,changeNights,clearItinerary,submitSuggestion,openShop,updateSearch,updateShopCategory,addToBag,showBag,removeFromBag,fakeCheckout,setNotice,render});

// Initialise page. This file expects index.html to contain an element with id="app".
if(!Array.isArray(state.lottoNumbers))state.lottoNumbers=[];
render();
