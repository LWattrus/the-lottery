const state = {
  lang: localStorage.getItem("dreamLang") || null,
  agreed: false,
  balance: 750000000,
  category: "all",
  search: "",
  cart: [],
  drawn: false,
  dream: false,
  destination: null,
  seoulPlanning: false,
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
  state.lang = lang;
  localStorage.setItem("dreamLang", lang);
  render();
}

function render(){
  const app = document.getElementById("app");

  if(!state.lang){
    app.innerHTML = languageScreen();
    return;
  }

  if(!state.agreed){
    app.innerHTML = warningScreen();
    return;
  }

    if(!state.drawn){
    app.innerHTML=ticketScreen();
    return;
  }

  if(!state.dream){
    app.innerHTML=dreamPickerScreen();
    return;
  }

    if(state.destination === "seoul"){
    if(state.seoulPlanning === "stay"){
      app.innerHTML=seoulHotelsScreen();
      return;
    }

    app.innerHTML=seoulPlannerScreen();
    return;
  }

  app.innerHTML=destinationScreen();
}


/* =========================================================
   DREAM PICKER
   ========================================================= */

function dreamPickerScreen(){
  return `
    <div class="luxury-dream-picker">

      <div class="luxury-topbar">
        <div class="luxury-wordmark">
          <span>THE</span>
          LOTTERY
        </div>

        <button
          class="luxury-lang-toggle"
          onclick="setLang(state.lang==='en'?'ko':'en')"
        >
          ${state.lang==='en'?'한국어':'English'}
        </button>
      </div>

      <main class="luxury-content">

        <div class="luxury-eyebrow">
          ${state.lang==="ko" ? "당신의 새로운 삶" : "YOUR NEW LIFE"}
        </div>

        <h1>
          ${
            state.lang==="ko"
            ? "어떤 꿈을 만들어 볼까요?"
            : "WHAT'S YOUR DREAM?"
          }
        </h1>

        <p class="luxury-intro">
          ${
            state.lang==="ko"
            ? "이제 당신에게는 ₩750,000,000이 있습니다. 어떤 삶을 만들어 볼까요?"
            : "You have ₩750,000,000. Now imagine the life you've always wanted."
          }
        </p>

        <div class="fortune-display">

          <span>
            ${
              state.lang==="ko"
              ? "당신의 가상 재산"
              : "YOUR FICTIONAL FORTUNE"
            }
          </span>

          <strong>₩750,000,000</strong>

        </div>


        <section class="luxury-dream-grid">


          <!-- PERFECT GETAWAY -->

          <article
            class="luxury-dream-card luxury-featured"
            onclick="openGetaway()"
          >

            <div class="luxury-card-number">
              01
            </div>

            <div class="luxury-card-image getaway-image">

              <div class="luxury-image-overlay"></div>

              <div class="luxury-card-image-text">
                <span>
                  ${state.lang==="ko" ? "여행" : "TRAVEL"}
                </span>

                <strong>
                  THE WORLD
                </strong>
              </div>

            </div>

            <div class="luxury-card-content">

              <div class="luxury-card-eyebrow">
                ${state.lang==="ko" ? "완벽한 휴가" : "YOUR PERFECT GETAWAY"}
              </div>

              <h2>
                ${
                  state.lang==="ko"
                  ? "세상 어디든 떠나보세요."
                  : "GO ANYWHERE."
                }
              </h2>

              <p>
                ${
                  state.lang==="ko"
                  ? "항공권, 호텔, 다이닝, 쇼핑과 특별한 경험으로 꿈의 여행을 만들어 보세요."
                  : "Fly somewhere extraordinary. Choose your hotel, dining, experiences and everything in between."
                }
              </p>

              <div class="luxury-card-tags">
                <span>FLIGHTS</span>
                <span>HOTELS</span>
                <span>DINING</span>
                <span>EXPERIENCES</span>
              </div>

              <button class="luxury-card-button">
                ${
                  state.lang==="ko"
                  ? "여행 시작하기"
                  : "CHOOSE YOUR DESTINATION"
                }
                <span>→</span>
              </button>

            </div>

          </article>


          <!-- SHOP THE WORLD -->

          <article class="luxury-dream-card">

            <div class="luxury-card-number">
              02
            </div>

            <div class="luxury-card-image shopping-image">

              <div class="luxury-image-overlay"></div>

              <div class="luxury-card-image-text">
                <span>
                  ${state.lang==="ko" ? "쇼핑" : "SHOPPING"}
                </span>

                <strong>
                  THE WORLD
                </strong>
              </div>

              <div class="coming-soon">
                COMING SOON
              </div>

            </div>

            <div class="luxury-card-content">

              <div class="luxury-card-eyebrow">
                ${state.lang==="ko" ? "세상의 모든 것" : "SHOP THE WORLD"}
              </div>

              <h2>
                ${
                  state.lang==="ko"
                  ? "원하는 것은 무엇이든."
                  : "BUY WHAT YOU WANT."
                }
              </h2>

              <p>
                ${
                  state.lang==="ko"
                  ? "패션, 시계, 전자제품, 뷰티와 럭셔리 아이템을 마음껏 담아보세요."
                  : "Fashion, watches, technology, beauty and the things you've always wanted."
                }
              </p>

              <div class="luxury-card-tags">
                <span>FASHION</span>
                <span>WATCHES</span>
                <span>TECH</span>
                <span>BEAUTY</span>
              </div>

            </div>

          </article>


          <!-- DREAM HOME -->

          <article class="luxury-dream-card">

            <div class="luxury-card-number">
              03
            </div>

            <div class="luxury-card-image home-image">

              <div class="luxury-image-overlay"></div>

              <div class="luxury-card-image-text">
                <span>
                  ${state.lang==="ko" ? "부동산" : "REAL ESTATE"}
                </span>

                <strong>
                  YOUR HOME
                </strong>
              </div>

              <div class="coming-soon">
                COMING SOON
              </div>

            </div>

            <div class="luxury-card-content">

              <div class="luxury-card-eyebrow">
                ${state.lang==="ko" ? "꿈의 집" : "BUY YOUR DREAM HOME"}
              </div>

              <h2>
                ${
                  state.lang==="ko"
                  ? "완벽한 집을 만들어 보세요."
                  : "CREATE YOUR PERFECT HOME."
                }
              </h2>

              <p>
                ${
                  state.lang==="ko"
                  ? "꿈의 집, 인테리어, 가구, 자동차와 라이프스타일까지 상상해 보세요."
                  : "Find your dream property, furnish it beautifully and build the lifestyle around it."
                }
              </p>

              <div class="luxury-card-tags">
                <span>PROPERTY</span>
                <span>INTERIORS</span>
                <span>FURNITURE</span>
                <span>LIFESTYLE</span>
              </div>

            </div>

          </article>


          <!-- LIVE THE DREAM -->

          <article class="luxury-dream-card">

            <div class="luxury-card-number">
              04
            </div>

            <div class="luxury-card-image lifestyle-image">

              <div class="luxury-image-overlay"></div>

              <div class="luxury-card-image-text">
                <span>
                  ${state.lang==="ko" ? "라이프스타일" : "LIFESTYLE"}
                </span>

                <strong>
                  LIVE MORE
                </strong>
              </div>

              <div class="coming-soon">
                COMING SOON
              </div>

            </div>

            <div class="luxury-card-content">

              <div class="luxury-card-eyebrow">
                ${state.lang==="ko" ? "꿈의 라이프스타일" : "LIVE THE DREAM"}
              </div>

              <h2>
                ${
                  state.lang==="ko"
                  ? "돈으로 시간을 사세요."
                  : "LIVE UNFORGETTABLY."
                }
              </h2>

              <p>
                ${
                  state.lang==="ko"
                  ? "최고의 다이닝, 엔터테인먼트, 자동차와 특별한 경험을 상상해 보세요."
                  : "Cars, dining, entertainment, adventures and unforgettable experiences."
                }
              </p>

              <div class="luxury-card-tags">
                <span>CARS</span>
                <span>DINING</span>
                <span>ENTERTAINMENT</span>
                <span>EXPERIENCES</span>
              </div>

            </div>

          </article>

        </section>


        <div class="luxury-footer-note">

          <span>THE LOTTERY</span>

          <p>
            ${
              state.lang==="ko"
              ? "당신의 꿈은 여기서 시작됩니다."
              : "Your fortune. Your imagination. Your life."
            }
          </p>

        </div>

      </main>

    </div>
  `;
}


function openGetaway(){
  state.dream = true;
  state.destination = null;
  render();
}


function destinationScreen(){

  return `
    <div class="luxury-destination">

      <div class="luxury-topbar">

        <button
          class="luxury-back"
          onclick="state.dream=false;state.destination=null;render()"
        >
          ←
          ${
            state.lang==="ko"
            ? "뒤로"
            : "BACK"
          }
        </button>

        <div class="luxury-wordmark">
          <span>THE</span>
          LOTTERY
        </div>

        <button
          class="luxury-lang-toggle"
          onclick="setLang(state.lang==='en'?'ko':'en')"
        >
          ${state.lang==='en'?'한국어':'English'}
        </button>

      </div>


      <main class="destination-content">

        <div class="luxury-eyebrow">
          ${
            state.lang==="ko"
            ? "완벽한 휴가"
            : "YOUR PERFECT GETAWAY"
          }
        </div>

        <h1>
          ${
            state.lang==="ko"
            ? "어디로 떠날까요?"
            : "WHERE WILL YOU GO?"
          }
        </h1>

        <p>
          ${
            state.lang==="ko"
            ? "꿈의 여행을 시작할 도시를 선택하세요."
            : "Choose a destination for your dream escape."
          }
        </p>


        <div class="destination-grid">


          <article
            class="destination-card seoul-destination"
            onclick="selectDestination('seoul')"
          >

            <div class="destination-overlay"></div>

            <div class="destination-info">

              <span>01</span>

              <small>ASIA</small>

              <h2>SEOUL</h2>

              <p>
                ${
                  state.lang==="ko"
                  ? "완벽한 서울 주말"
                  : "THE PERFECT WEEKEND"
                }
              </p>

              <button>
                ${
                  state.lang==="ko"
                  ? "선택하기"
                  : "EXPLORE SEOUL"
                }
                →
              </button>

            </div>

          </article>


          <article class="destination-card new-york-destination">

            <div class="destination-overlay"></div>

            <div class="destination-info">

              <span>02</span>

              <small>NORTH AMERICA</small>

              <h2>NEW YORK</h2>

              <p>COMING SOON</p>

            </div>

          </article>


          <article class="destination-card paris-destination">

            <div class="destination-overlay"></div>

            <div class="destination-info">

              <span>03</span>

              <small>EUROPE</small>

              <h2>PARIS</h2>

              <p>COMING SOON</p>

            </div>

          </article>


          <article class="destination-card tokyo-destination">

            <div class="destination-overlay"></div>

            <div class="destination-info">

              <span>04</span>

              <small>ASIA</small>

              <h2>TOKYO</h2>

              <p>COMING SOON</p>

            </div>

          </article>


          <article class="destination-card london-destination">

            <div class="destination-overlay"></div>

            <div class="destination-info">

              <span>05</span>

              <small>EUROPE</small>

              <h2>LONDON</h2>

              <p>COMING SOON</p>

            </div>

          </article>


          <article class="destination-card dubai-destination">

            <div class="destination-overlay"></div>

            <div class="destination-info">

              <span>06</span>

              <small>MIDDLE EAST</small>

              <h2>DUBAI</h2>

              <p>COMING SOON</p>

            </div>

          </article>

        </div>

      </main>

    </div>
  `;
}


function selectDestination(destination){

  state.destination = destination;

  render();

}


function seoulPlannerScreen(){
  return `
    <section class="seoul-hero">

      <div class="seoul-atmosphere"></div>

      <div class="seoul-hero-content">

        <div class="seoul-kicker">
          SEOUL · 서울
        </div>

        <div class="seoul-divider">
          <span></span>
          <b>✦</b>
          <span></span>
        </div>

        <h1>
          THE PERFECT<br>
          WEEKEND
        </h1>

        <p class="seoul-subtitle">
          Three days. One extraordinary city.
        </p>

        <div class="seoul-budget">
          <span>YOUR DREAM BUDGET</span>
          <strong>₩${state.balance.toLocaleString()}</strong>
        </div>

        <button class="seoul-build-button" onclick="startSeoulPlanning()">
          BUILD MY WEEKEND
          <span>→</span>
        </button>

      </div>

      <div class="seoul-scroll">
        <span>EXPLORE SEOUL</span>
        <i></i>
      </div>

    </section>

    <section class="seoul-intro">

      <div class="seoul-intro-label">
        YOUR SEOUL ESCAPE
      </div>

      <h2>
        Imagine the weekend<br>
        you've always wanted.
      </h2>

      <p>
        Choose where you stay, where you dine, what you experience
        and how you spend your dream budget.
      </p>

    </section>

    <section class="seoul-categories">

      <div class="seoul-category">
        <div class="seoul-category-number">01</div>
        <h3>STAY</h3>
        <p>Hotels worthy of the weekend.</p>
        <button onclick="startSeoulPlanning()">EXPLORE →</button>
      </div>

      <div class="seoul-category">
        <div class="seoul-category-number">02</div>
        <h3>DINE</h3>
        <p>Seoul's finest tables.</p>
        <button onclick="startSeoulPlanning()">EXPLORE →</button>
      </div>

      <div class="seoul-category">
        <div class="seoul-category-number">03</div>
        <h3>EXPERIENCE</h3>
        <p>Culture, adventure and unforgettable moments.</p>
        <button onclick="startSeoulPlanning()">EXPLORE →</button>
      </div>

      <div class="seoul-category">
        <div class="seoul-category-number">04</div>
        <h3>SHOP</h3>
        <p>From Korean designers to global luxury.</p>
        <button onclick="startSeoulPlanning()">EXPLORE →</button>
      </div>

      <div class="seoul-category">
        <div class="seoul-category-number">05</div>
        <h3>MOVE</h3>
        <p>Travel Seoul in comfort.</p>
        <button onclick="startSeoulPlanning()">EXPLORE →</button>
      </div>

    </section>

    <section class="seoul-footer-line">
      <span></span>
      <p>SEOUL · 서울</p>
      <span></span>
    </section>
  `;
}


function seoulHotelsScreen(){
  const hotels = [
    {
      name: "Four Seasons Hotel Seoul",
      area: "Gwanghwamun",
      price: 650000,
      description: "Refined luxury in the heart of historic Seoul.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945"
    },
    {
      name: "SIGNIEL Seoul",
      area: "Jamsil",
      price: 700000,
      description: "A spectacular high-rise stay above the city.",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
    },
    {
      name: "Josun Palace",
      area: "Gangnam",
      price: 600000,
      description: "Contemporary Korean elegance and five-star comfort.",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd"
    },
    {
      name: "The Shilla Seoul",
      area: "Jangchung-dong",
      price: 550000,
      description: "Classic hospitality, beautiful grounds and fine dining.",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d"
    }
  ];

  return `
    <section class="seoul-intro">
      <div class="seoul-intro-label">YOUR SEOUL ESCAPE</div>
      <h2>Find your perfect stay.</h2>
      <p>Choose a hotel worthy of your dream weekend.</p>
      <div class="seoul-budget">
        <span>YOUR DREAM BUDGET</span>
        <strong>₩${state.balance.toLocaleString()}</strong>
      </div>
      <button class="seoul-build-button" onclick="backToSeoul()">
        ← BACK TO SEOUL
      </button>
    </section>

    <section class="seoul-hotels">
      ${hotels.map((hotel, index) => `
        <article class="seoul-category">
          <img
            src="${hotel.image}"
            alt="${hotel.name}"
            style="width:100%;height:210px;object-fit:cover;"
            loading="lazy"
          >
          <div class="seoul-category-number">
            ${String(index + 1).padStart(2, "0")}
          </div>
          <h3>${hotel.name}</h3>
          <p>${hotel.area}</p>
          <p>${hotel.description}</p>
          <p>From ₩${hotel.price.toLocaleString()} / night</p>
          <button onclick="selectSeoulHotel('${hotel.name}', ${hotel.price})">
            SELECT THIS STAY →
          </button>
        </article>
      `).join("")}
    </section>
  `;
}

function backToSeoul(){
  state.seoulPlanning = false;
  render();
}

function selectSeoulHotel(name, price){
  state.selected = state.selected.filter(item => item.type !== "hotel");
  state.selected.push({
    type: "hotel",
    name: name,
    price: price
  });

  render();
}


function startSeoulPlanning(){
  state.seoulPlanning = "stay";
  render();
}

/* =========================================================
   LANGUAGE SCREEN
   ========================================================= */

function languageScreen(){
  return `
    <div class="screen language-screen center">
      <div class="lang-card">

        <div class="eyebrow">
          DREAM LIFE
        </div>

        <div class="logo">
          THE<br>LOTTERY
        </div>

        <p class="subtitle">
          Choose your language / 언어를 선택하세요
        </p>

        <div class="lang-buttons">

          <button onclick="setLang('en')">
            🇬🇧 English
          </button>

          <button onclick="setLang('ko')">
            🇰🇷 한국어
          </button>

        </div>

      </div>
    </div>
  `;
}


/* =========================================================
   WARNING SCREEN
   ========================================================= */

function warningScreen(){
  return `
    <div class="screen language-screen center">

      <div class="lang-card">

        <div class="eyebrow">
          THE LOTTERY
        </div>

        <h2>
          ${t("warningTitle")}
        </h2>

        <div class="warning">

          <ul>
            <li>${t("warning1")}</li>
            <li>${t("warning2")}</li>
            <li>${t("warning3")}</li>
          </ul>

          <div class="warning-actions">

            <button
              class="primary"
              onclick="state.agreed=true;render()"
            >
              ${t("agree")}
            </button>

            <button
              class="secondary"
              onclick="state.lang=null;localStorage.removeItem('dreamLang');render()"
            >
              ${t("back")}
            </button>

          </div>

        </div>

      </div>

    </div>
  `;
}


/* =========================================================
   LOTTERY
   ========================================================= */

const ballColor = n =>
  n <= 10 ? "yellow" :
  n <= 20 ? "blue" :
  n <= 30 ? "red" :
  n <= 40 ? "gray" :
  "green";


function lottoMark(n, extra=""){
  return `
    <button
      class="lotto-mark ${extra}"
      onclick="toggleNumber(${n})"
      aria-label="Number ${n}"
      aria-pressed="${extra.includes("selected") ? "true" : "false"}"
    >
      <span>${n}</span>
    </button>
  `;
}


function ticketScreen(){

  const selected = state.selected;

  return `
    <div class="hero">

      <div class="topbar">

        <div class="wordmark">
          ${t("title")}
        </div>

        <button
          class="lang-toggle"
          onclick="setLang(state.lang==='en'?'ko':'en')"
        >
          ${state.lang==='en'?'🇰🇷 한국어':'🇬🇧 English'}
        </button>

      </div>

      <div class="hero-main">

        <div class="ticket-wrap">

          <div class="eyebrow">
            DREAM LIFE
          </div>

          <h1>
            ${t("ticket")}
          </h1>

          <div class="ticket korean-ticket">

            <div class="ticket-brand">
              <span>동행복권</span>
              <strong>
                Lotto <b>6/45</b>
              </strong>
            </div>

            <div class="ticket-price">
              ₩1,000 <span>GAME</span>
            </div>

            <p class="ticket-instruction">
              ${t("pick")}
            </p>

            <div class="selected-label">
              ${t("lotteryReady")}:
              <strong>${selected.length}/6</strong>
            </div>

            <div class="selected-balls selected-marks">

              ${
                selected.map(n =>
                  lottoMark(n,"selected chosen")
                ).join("")
                ||
                `<span class="empty-selection">
                  ${
                    state.lang==='ko'
                    ? '번호를 선택하세요'
                    : 'Choose your numbers'
                  }
                </span>`
              }

            </div>

            <div class="number-grid lotto-grid">

              ${
                Array.from(
                  {length:45},
                  (_,i)=>i+1
                )
                .map(n =>
                  lottoMark(
                    n,
                    selected.includes(n)
                    ? "selected"
                    : ""
                  )
                )
                .join("")
              }

            </div>

            <div class="ticket-bottom">

              <span>
                ● ${state.lang==='ko'?'수동 선택':'MANUAL'}
              </span>

              <span>
                ${selected.length}/6
              </span>

            </div>

            <div
              class="draw-area"
              id="drawArea"
            ></div>

            <button
              class="draw-button"
              id="drawBtn"
              onclick="drawLottery()"
              ${selected.length!==6 ? "disabled" : ""}
            >
              ${t("draw")}
            </button>

            ${
              selected.length!==6
              ? `<div class="choose-note">${t("chooseSix")}</div>`
              : ""
            }

          </div>

        </div>

      </div>

    </div>
  `;
}


function toggleNumber(n){

  if(state.selected.includes(n)){

    state.selected =
      state.selected.filter(x => x !== n);

  } else if(state.selected.length < 6){

    state.selected =
      [...state.selected,n].sort((a,b)=>a-b);

  }

  render();
}


/* =========================================================
   LOTTERY DRAW ANIMATION
   ========================================================= */

function drawLottery(){

  if(state.selected.length !== 6){
    return;
  }

  const btn = document.getElementById("drawBtn");
  const area = document.getElementById("drawArea");

  if(!btn || !area){
    return;
  }

  btn.disabled = true;
  btn.style.display = "none";


  /* Add draw animation CSS once */

  if(!document.getElementById("lottery-draw-animation-style")){

    const style = document.createElement("style");

    style.id = "lottery-draw-animation-style";

    style.textContent = `

      .lottery-draw-stage{
        margin:24px auto 10px;
        padding:22px 12px 18px;
        background:#ffffff;
        border:2px solid #222;
        border-radius:16px;
        text-align:center;
        overflow:hidden;
      }

      .lottery-draw-title{
        font-size:13px;
        font-weight:900;
        letter-spacing:.08em;
        margin-bottom:18px;
        color:#222;
      }

      .lottery-machine{
        width:150px;
        height:92px;
        margin:0 auto 22px;
        border:4px solid #222;
        border-radius:80px 80px 20px 20px;
        background:
          radial-gradient(
            circle at 50% 30%,
            #ffffff 0%,
            #f5f5f5 55%,
            #d9d9d9 100%
          );
        position:relative;
        box-shadow:
          inset 0 -9px 0 rgba(0,0,0,.08),
          0 4px 0 rgba(0,0,0,.12);
      }

      .lottery-machine:before{
        content:"";
        position:absolute;
        width:80px;
        height:15px;
        left:50%;
        top:14px;
        transform:translateX(-50%);
        border-radius:50%;
        background:rgba(255,255,255,.8);
      }

      .machine-window{
        position:absolute;
        left:50%;
        bottom:-18px;
        transform:translateX(-50%);
        width:48px;
        height:42px;
        border:4px solid #222;
        border-radius:8px 8px 18px 18px;
        background:#fff;
      }

      .machine-window:after{
        content:"";
        position:absolute;
        left:50%;
        top:-15px;
        transform:translateX(-50%);
        width:13px;
        height:13px;
        background:#222;
        border-radius:50%;
      }

      .draw-ball-row{
        min-height:68px;
        display:flex;
        justify-content:center;
        align-items:center;
        gap:8px;
        flex-wrap:wrap;
        padding-top:4px;
      }

      .draw-ball-animated{
        width:50px;
        height:50px;
        min-width:50px;
        border-radius:50%;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:18px;
        font-weight:900;
        color:#111;
        border:3px solid rgba(0,0,0,.35);
        box-shadow:
          0 5px 0 rgba(0,0,0,.18),
          inset 3px 3px 8px rgba(255,255,255,.75);
        animation:
          lotteryBallIn .7s cubic-bezier(.2,.9,.25,1.3) both;
      }

      .draw-ball-animated.yellow{
        background:#f4d35e;
      }

      .draw-ball-animated.blue{
        background:#4c8eda;
        color:white;
      }

      .draw-ball-animated.red{
        background:#e74c3c;
        color:white;
      }

      .draw-ball-animated.gray{
        background:#b9b9b9;
      }

      .draw-ball-animated.green{
        background:#58b957;
        color:white;
      }

      .draw-ball-animated.latest{
        animation:
          lotteryBallIn .7s cubic-bezier(.2,.9,.25,1.3) both,
          lotteryBallPulse .55s ease-out .7s;
      }

      .draw-status{
        margin-top:14px;
        font-size:12px;
        font-weight:800;
        letter-spacing:.05em;
        color:#555;
      }

      @keyframes lotteryBallIn{

        0%{
          opacity:0;
          transform:
            translateY(-70px)
            scale(.35)
            rotate(-25deg);
        }

        55%{
          opacity:1;
          transform:
            translateY(10px)
            scale(1.08)
            rotate(8deg);
        }

        78%{
          transform:
            translateY(-5px)
            scale(.96)
            rotate(-3deg);
        }

        100%{
          opacity:1;
          transform:
            translateY(0)
            scale(1)
            rotate(0);
        }

      }

      @keyframes lotteryBallPulse{

        0%{
          transform:scale(1);
        }

        50%{
          transform:scale(1.15);
        }

        100%{
          transform:scale(1);
        }

      }

      @media(max-width:480px){

        .lottery-draw-stage{
          padding:18px 7px 15px;
        }

        .lottery-machine{
          width:130px;
          height:78px;
        }

        .draw-ball-row{
          gap:6px;
        }

        .draw-ball-animated{
          width:45px;
          height:45px;
          min-width:45px;
          font-size:16px;
        }

      }

      @media(prefers-reduced-motion:reduce){

        .draw-ball-animated{
          animation:none !important;
          opacity:1;
          transform:none;
        }

      }

    `;

    document.head.appendChild(style);
  }


  /* Draw screen */

  area.innerHTML = `

    <div class="lottery-draw-stage">

      <div class="lottery-draw-title">
        ${
          state.lang==="ko"
          ? "나의 번호를 추첨하고 있습니다..."
          : "YOUR NUMBERS ARE BEING DRAWN..."
        }
      </div>

      <div class="lottery-machine">

        <div class="machine-window"></div>

      </div>

      <div
        class="draw-ball-row"
        id="drawBallRow"
      ></div>

      <div
        class="draw-status"
        id="drawStatus"
      >
        1 / 6
      </div>

    </div>

  `;


  const row =
    document.getElementById("drawBallRow");

  const status =
    document.getElementById("drawStatus");


  /* Draw the six selected numbers */

  state.selected.forEach((n,i)=>{

    setTimeout(()=>{

      const ball =
        document.createElement("div");

      ball.className =
        `draw-ball-animated ${ballColor(n)} latest`;

      ball.textContent = n;

      ball.setAttribute(
        "aria-label",
        `Drawn number ${n}`
      );

      row.appendChild(ball);

      if(status){
        status.textContent =
          `${i+1} / 6`;
      }

      setTimeout(()=>{
        ball.classList.remove("latest");
      },1200);

    }, i * 900);

  });


  /* Show winning screen after all balls */

  setTimeout(
    showWin,
    state.selected.length * 900 + 1300
  );
}


/* =========================================================
   WIN SCREEN
   ========================================================= */

function showWin(){

  const el =
    document.createElement("div");

  el.className = "win";


  /*
    IMPORTANT:
    The win overlay is attached directly to the body.
    Therefore the button must remove the overlay before
    rendering the Dream Picker.
  */

  el.innerHTML = `

    <div class="win-card">

      <div class="eyebrow">
        ${t("congrats")}
      </div>

      <h1>
        ${t("won")}
      </h1>

      <div
        class="win-amount"
        id="winAmount"
      >
        ₩0
      </div>

      <div class="bank-count">
        ${t("remaining")}:
        <strong>
          ₩750,000,000
        </strong>
      </div>

      <button
        class="primary"
        onclick="
          this.closest('.win').remove();
          state.drawn=true;
          state.dream=false;
          render();
        "
      >
        ${t("continue")}
      </button>

    </div>

  `;

  document.body.appendChild(el);


  /* Count the money up */

  let start = 0;
  const target = 750000000;
  const dur = 2200;
  let startTime = null;


  const tick = ts => {

    if(!startTime){
      startTime = ts;
    }

    const p =
      Math.min(
        (ts-startTime)/dur,
        1
      );

    const eased =
      1-Math.pow(1-p,3);

    const amount =
      start +
      (target-start)*eased;

    const amountEl =
      document.getElementById("winAmount");

    if(amountEl){
      amountEl.textContent =
        money(amount);
    }

    if(p < 1){
      requestAnimationFrame(tick);
    }

  };


  requestAnimationFrame(tick);
}


/* =========================================================
   SHOP
   ========================================================= */

const labels = {
  all:"all",
  beauty:"beauty",
  electronics:"electronics",
  fashion:"fashion",
  lifestyle:"lifestyle",
  hotels:"hotels",
  dining:"dining"
};


function filtered(){

  const q =
    state.search.toLowerCase();

  return PRODUCTS.filter(p =>

    (state.category==="all" ||
     p.cat===state.category)

    &&

    (
      !q ||
      `${p.brand} ${p.name} ${p.ko}`
      .toLowerCase()
      .includes(q)
    )

  );
}


function productCard(p){

  const initials =
    p.brand
      .split(/\s+/)
      .map(x=>x[0])
      .slice(0,2)
      .join("")
      .toUpperCase();

  return `

    <article class="product">

      <div class="product-art">

        <div class="product-cat">
          ${t(p.cat)}
        </div>

        <span>
          ${initials}
        </span>

      </div>

      <div class="product-info">

        <div class="brand">
          ${p.brand}
        </div>

        <div class="product-name">
          ${p.name}
        </div>

        <div class="product-ko">
          ${p.ko}
        </div>

        <div class="price">
          ${money(p.price)}
        </div>

        <button
          class="add"
          onclick="addToCart('${p.id}')"
        >
          ${t("add")}
        </button>

      </div>

    </article>

  `;
}


function shopScreen(){

  const list = filtered();

  return `

    <div class="shop">

      <div class="shopbar">

        <div class="shopnav">

          <div class="wordmark">
            ${t("title")}
          </div>

          <input
            class="search"
            placeholder="${t("search")}"
            value="${state.search.replaceAll('"','&quot;')}"
            oninput="state.search=this.value;render()"
          >

          <div class="balance">
            ${money(state.balance)}
          </div>

        </div>

        <div class="categories">

          ${
            Object.keys(labels)
              .map(c => `

                <button
                  class="cat ${state.category===c?'active':''}"
                  onclick="state.category='${c}';render()"
                >
                  ${t(c)}
                </button>

              `)
              .join("")
          }

        </div>

      </div>


      <div class="shop-heading">

        <div>

          <div class="eyebrow">
            60 REAL-WORLD PICKS
          </div>

          <h1>
            ${t("shopTitle")}
          </h1>

          <p>
            ${t("shopSub")}
          </p>

        </div>

        <button
          class="lang-toggle"
          onclick="setLang(state.lang==='en'?'ko':'en')"
        >
          ${state.lang==='en'?'🇰🇷 한국어':'🇬🇧 English'}
        </button>

      </div>


      ${
        list.length
        ?
        `<div class="grid">
          ${list.map(productCard).join("")}
        </div>`
        :
        `<div class="empty-shop">
          ${t("empty")}
        </div>`
      }


      ${cartDrawer()}

    </div>

  `;
}


/* =========================================================
   CART
   ========================================================= */

function addToCart(id){

  const p =
    PRODUCTS.find(x=>x.id===id);

  if(!p){
    return;
  }

  if(p.price > state.balance){

    alert(
      state.lang==='ko'
      ? "잔액이 부족합니다."
      : "You don't have enough fictional money."
    );

    return;
  }

  state.cart.push(p);

  state.balance -= p.price;

  render();
}


function cartDrawer(){

  if(!state.cart.length){
    return "";
  }

  const total =
    state.cart.reduce(
      (s,p)=>s+p.price,
      0
    );

  return `

    <div class="cart-drawer">

      <div class="cart-head">

        <strong>
          ${t("cart")} ·
          ${state.cart.length}${t("items")}
        </strong>

        <span>
          ${money(state.balance)}
        </span>

      </div>


      <div class="cart-items">

        ${
          state.cart
            .map(p => `

              <div class="cart-item">

                <span>
                  ${p.brand} ${p.name}
                </span>

                <strong>
                  ${money(p.price)}
                </strong>

              </div>

            `)
            .join("")
        }

      </div>


      <div class="cart-total">

        <span>
          ${t("total")}
        </span>

        <span>
          ${money(total)}
        </span>

      </div>


      <div class="cart-actions">

        <button onclick="resetDream()">
          ${t("reset")}
        </button>

        <button
          class="checkout"
          onclick="checkout()"
        >
          ${t("checkout")}
        </button>

      </div>

    </div>

  `;
}


function resetDream(){

  state.balance = 750000000;
  state.cart = [];

  render();
}


/* =========================================================
   CHECKOUT
   ========================================================= */

function checkout(){

  const total =
    state.cart.reduce(
      (s,p)=>s+p.price,
      0
    );

  const modal =
    document.createElement("div");

  modal.className = "receipt";


  modal.innerHTML = `

    <div class="receipt-card">

      <div class="eyebrow">
        THE LOTTERY
      </div>

      <h2>
        ${t("receipt")}
      </h2>

      <p>
        ${t("receiptText")}
      </p>

      ${
        state.cart
          .map(p => `

            <div class="receipt-line">

              <span>
                ${p.brand} ${p.name}
              </span>

              <strong>
                ${money(p.price)}
              </strong>

            </div>

          `)
          .join("")
      }

      <div class="receipt-line">

        <strong>
          ${t("total")}
        </strong>

        <strong>
          ${money(total)}
        </strong>

      </div>

      <p class="small">
        ${t("remaining")}:
        ${money(state.balance)}
      </p>

      <button
        class="add"
        onclick="this.closest('.receipt').remove()"
      >
        ${t("close")}
      </button>

    </div>

  `;


  document.body.appendChild(modal);
}


/* =========================================================
   START APP
   ========================================================= */

render();
