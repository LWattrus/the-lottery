const PRODUCTS = [
  {
    "id": "b01",
    "cat": "beauty",
    "brand": "COSRX",
    "name": "Peptide-132 Ultra Perfect Hair Bonding Treatment",
    "ko": "COSRX 펩타이드-132 울트라 퍼펙트 헤어 본딩 트리트먼트",
    "price": 25000
  },
  {
    "id": "b02",
    "cat": "beauty",
    "brand": "Anua",
    "name": "Heartleaf 77% Soothing Toner",
    "ko": "아누아 어성초 77% 수딩 토너",
    "price": 28000
  },
  {
    "id": "b03",
    "cat": "beauty",
    "brand": "Beauty of Joseon",
    "name": "Relief Sun: Rice + Probiotics SPF50+",
    "ko": "조선미녀 맑은쌀 선크림 SPF50+",
    "price": 18000
  },
  {
    "id": "b04",
    "cat": "beauty",
    "brand": "VT Cosmetics",
    "name": "Reedle Shot 100",
    "ko": "VT 리들샷 100",
    "price": 24000
  },
  {
    "id": "b05",
    "cat": "beauty",
    "brand": "Mediheal",
    "name": "Essential Mask Pack",
    "ko": "메디힐 에센셜 마스크팩",
    "price": 10000
  },
  {
    "id": "b06",
    "cat": "beauty",
    "brand": "Anua",
    "name": "Rice 70 Glow Milky Toner",
    "ko": "아누아 라이스 70 글로우 밀키 토너",
    "price": 28000
  },
  {
    "id": "b07",
    "cat": "beauty",
    "brand": "SKIN1004",
    "name": "Madagascar Centella Probio-Cica Essence Toner",
    "ko": "SKIN1004 마다가스카르 센텔라 프로바이오 시카 에센스 토너",
    "price": 29000
  },
  {
    "id": "b08",
    "cat": "beauty",
    "brand": "Bioderma",
    "name": "Sensibio H2O Micellar Water 500ml",
    "ko": "바이오더마 센시비오 H2O 500ml",
    "price": 21000
  },
  {
    "id": "b09",
    "cat": "beauty",
    "brand": "Anua",
    "name": "Heartleaf Quercetinol Pore Deep Cleansing Foam",
    "ko": "아누아 어성초 포어 딥 클렌징폼",
    "price": 16000
  },
  {
    "id": "b10",
    "cat": "beauty",
    "brand": "Olaplex",
    "name": "No.3 Hair Perfector",
    "ko": "올라플렉스 No.3 헤어 퍼펙터",
    "price": 45000
  },
  {
    "id": "e01",
    "cat": "electronics",
    "brand": "Samsung",
    "name": "Galaxy Watch",
    "ko": "삼성 갤럭시 워치",
    "price": 399000
  },
  {
    "id": "e02",
    "cat": "electronics",
    "brand": "Samsung",
    "name": "Galaxy Buds4 Pro",
    "ko": "삼성 갤럭시 버즈4 프로",
    "price": 349000
  },
  {
    "id": "e03",
    "cat": "electronics",
    "brand": "Apple",
    "name": "AirPods Pro",
    "ko": "애플 에어팟 프로",
    "price": 349000
  },
  {
    "id": "e04",
    "cat": "electronics",
    "brand": "Apple",
    "name": "iPhone 17 Pro Max",
    "ko": "애플 아이폰 17 프로 맥스",
    "price": 1699000
  },
  {
    "id": "e05",
    "cat": "electronics",
    "brand": "Apple",
    "name": "MacBook Air",
    "ko": "애플 맥북 에어",
    "price": 1590000
  },
  {
    "id": "e06",
    "cat": "electronics",
    "brand": "Sony",
    "name": "WH-1000XM6 Wireless Headphones",
    "ko": "소니 WH-1000XM6 무선 헤드폰",
    "price": 549000
  },
  {
    "id": "e07",
    "cat": "electronics",
    "brand": "Nintendo",
    "name": "Nintendo Switch 2",
    "ko": "닌텐도 스위치 2",
    "price": 699000
  },
  {
    "id": "e08",
    "cat": "electronics",
    "brand": "Dyson",
    "name": "V15 Detect Absolute",
    "ko": "다이슨 V15 디텍트 앱솔루트",
    "price": 1090000
  },
  {
    "id": "e09",
    "cat": "electronics",
    "brand": "Sonos",
    "name": "Era 300",
    "ko": "소노스 Era 300",
    "price": 649000
  },
  {
    "id": "e10",
    "cat": "electronics",
    "brand": "Fujifilm",
    "name": "Instax Mini 12",
    "ko": "후지필름 인스탁스 미니 12",
    "price": 129000
  },
  {
    "id": "e11",
    "cat": "electronics",
    "brand": "Razer",
    "name": "BlackWidow V4 75%",
    "ko": "레이저 블랙위도우 V4 75%",
    "price": 249000
  },
  {
    "id": "e12",
    "cat": "electronics",
    "brand": "Elgato",
    "name": "Stream Deck MK.2",
    "ko": "엘가토 스트림 덱 MK.2",
    "price": 249000
  },
  {
    "id": "e13",
    "cat": "electronics",
    "brand": "Philips Hue",
    "name": "White & Color Ambiance Starter Kit",
    "ko": "필립스 휴 화이트 앤 컬러 스타터 키트",
    "price": 229000
  },
  {
    "id": "e14",
    "cat": "electronics",
    "brand": "Amazon",
    "name": "Kindle Scribe",
    "ko": "아마존 킨들 스크라이브",
    "price": 649000
  },
  {
    "id": "e15",
    "cat": "electronics",
    "brand": "Furbo",
    "name": "360° Dog Camera",
    "ko": "퍼보 360° 강아지 카메라",
    "price": 289000
  },
  {
    "id": "f01",
    "cat": "fashion",
    "brand": "New Balance",
    "name": "990v6",
    "ko": "뉴발란스 990v6",
    "price": 299000
  },
  {
    "id": "f02",
    "cat": "fashion",
    "brand": "HOKA",
    "name": "Bondi 9",
    "ko": "호카 본디 9",
    "price": 209000
  },
  {
    "id": "f03",
    "cat": "fashion",
    "brand": "ASICS",
    "name": "GEL-KAYANO 14",
    "ko": "아식스 젤 카야노 14",
    "price": 199000
  },
  {
    "id": "f04",
    "cat": "fashion",
    "brand": "Nike",
    "name": "Sportswear Tech Fleece Windrunner Hoodie",
    "ko": "나이키 스포츠웨어 테크 플리스 윈드러너 후디",
    "price": 169000
  },
  {
    "id": "f05",
    "cat": "fashion",
    "brand": "Arc'teryx",
    "name": "Beta AR Jacket",
    "ko": "아크테릭스 베타 AR 재킷",
    "price": 850000
  },
  {
    "id": "f06",
    "cat": "fashion",
    "brand": "Ray-Ban",
    "name": "Original Wayfarer Classic",
    "ko": "레이밴 오리지널 웨이페어러 클래식",
    "price": 230000
  },
  {
    "id": "f07",
    "cat": "fashion",
    "brand": "Casio",
    "name": "G-SHOCK GA-2100",
    "ko": "카시오 G-SHOCK GA-2100",
    "price": 139000
  },
  {
    "id": "f08",
    "cat": "fashion",
    "brand": "Patagonia",
    "name": "Better Sweater Fleece Jacket",
    "ko": "파타고니아 베터 스웨터 플리스 재킷",
    "price": 249000
  },
  {
    "id": "f09",
    "cat": "fashion",
    "brand": "Uniqlo",
    "name": "Uniqlo U Crew Neck T-Shirt",
    "ko": "유니클로 U 크루넥 티셔츠",
    "price": 29900
  },
  {
    "id": "f10",
    "cat": "fashion",
    "brand": "Mejuri",
    "name": "Bold Hoops",
    "ko": "메주리 볼드 후프 귀걸이",
    "price": 300000
  },
  {
    "id": "l01",
    "cat": "lifestyle",
    "brand": "Monos",
    "name": "Carry-On Pro",
    "ko": "모노스 캐리온 프로",
    "price": 480000
  },
  {
    "id": "l02",
    "cat": "lifestyle",
    "brand": "Bellroy",
    "name": "Slim Sleeve Wallet",
    "ko": "벨로이 슬림 슬리브 지갑",
    "price": 129000
  },
  {
    "id": "l03",
    "cat": "lifestyle",
    "brand": "Herschel",
    "name": "Little America Backpack",
    "ko": "허쉘 리틀 아메리카 백팩",
    "price": 180000
  },
  {
    "id": "l04",
    "cat": "lifestyle",
    "brand": "Manduka",
    "name": "PRO Yoga Mat 6mm",
    "ko": "만두카 PRO 요가 매트 6mm",
    "price": 180000
  },
  {
    "id": "l05",
    "cat": "lifestyle",
    "brand": "Osprey",
    "name": "Talon 22 Backpack",
    "ko": "오스프리 탈론 22 백팩",
    "price": 220000
  },
  {
    "id": "l06",
    "cat": "lifestyle",
    "brand": "Sonny Angel",
    "name": "Mini Figure Blind Box",
    "ko": "소니엔젤 미니 피규어 블라인드 박스",
    "price": 15000
  },
  {
    "id": "l07",
    "cat": "lifestyle",
    "brand": "Kodak",
    "name": "Ektar H35 Half Frame Camera",
    "ko": "코닥 Ektar H35 하프 프레임 카메라",
    "price": 95000
  },
  {
    "id": "l08",
    "cat": "lifestyle",
    "brand": "Levoit",
    "name": "Core 300S Smart Air Purifier",
    "ko": "레보이트 Core 300S 스마트 공기청정기",
    "price": 220000
  },
  {
    "id": "l09",
    "cat": "lifestyle",
    "brand": "Wild One",
    "name": "Harness Walk Kit",
    "ko": "와일드원 하네스 워크 키트",
    "price": 140000
  },
  {
    "id": "l10",
    "cat": "lifestyle",
    "brand": "Wilson",
    "name": "Pro Staff 97 v14 Tennis Racket",
    "ko": "윌슨 프로 스태프 97 v14 테니스 라켓",
    "price": 390000
  },
  {
    "id": "h01",
    "cat": "hotels",
    "brand": "Four Seasons",
    "name": "Four Seasons Hotel Seoul · 1 Night",
    "ko": "포시즌스 호텔 서울 · 1박",
    "price": 850000
  },
  {
    "id": "h02",
    "cat": "hotels",
    "brand": "THE SHILLA",
    "name": "The Shilla Seoul · 1 Night",
    "ko": "서울신라호텔 · 1박",
    "price": 650000
  },
  {
    "id": "h03",
    "cat": "hotels",
    "brand": "Grand Lotte",
    "name": "The Grand Lotte Seoul · 1 Night",
    "ko": "더 그랜드 롯데 서울 · 1박",
    "price": 550000
  },
  {
    "id": "h04",
    "cat": "hotels",
    "brand": "Grand Hyatt",
    "name": "Grand Hyatt Seoul · 1 Night",
    "ko": "그랜드 하얏트 서울 · 1박",
    "price": 500000
  },
  {
    "id": "h05",
    "cat": "hotels",
    "brand": "THE PLAZA",
    "name": "THE PLAZA Seoul · 1 Night",
    "ko": "더 플라자 서울 · 1박",
    "price": 480000
  },
  {
    "id": "h06",
    "cat": "hotels",
    "brand": "Royal Hotel Seoul",
    "name": "Royal Hotel Seoul · 1 Night",
    "ko": "로얄호텔서울 · 1박",
    "price": 280000
  },
  {
    "id": "h07",
    "cat": "hotels",
    "brand": "SIGNIEL Seoul",
    "name": "SIGNIEL Seoul · 1 Night",
    "ko": "시그니엘 서울 · 1박",
    "price": 900000
  },
  {
    "id": "h08",
    "cat": "hotels",
    "brand": "L'Escape",
    "name": "L'Escape Hotel Seoul · 1 Night",
    "ko": "레스케이프 호텔 서울 · 1박",
    "price": 350000
  },
  {
    "id": "r01",
    "cat": "dining",
    "brand": "La Yeon",
    "name": "Dinner for Two · Tasting Experience",
    "ko": "라연 · 2인 디너 테이스팅",
    "price": 500000
  },
  {
    "id": "r02",
    "cat": "dining",
    "brand": "Jungsik Seoul",
    "name": "Dinner for Two · Tasting Experience",
    "ko": "정식당 서울 · 2인 디너 테이스팅",
    "price": 450000
  },
  {
    "id": "r03",
    "cat": "dining",
    "brand": "Seoul Dining",
    "name": "Dinner for Two · Modern European",
    "ko": "서울다이닝 · 2인 디너",
    "price": 300000
  },
  {
    "id": "r04",
    "cat": "dining",
    "brand": "Muoki",
    "name": "Dinner for Two · Tasting Experience",
    "ko": "무오키 · 2인 디너 테이스팅",
    "price": 300000
  },
  {
    "id": "r05",
    "cat": "dining",
    "brand": "7th Door",
    "name": "Dinner for Two · Tasting Experience",
    "ko": "세븐스도어 · 2인 디너 테이스팅",
    "price": 300000
  },
  {
    "id": "r06",
    "cat": "dining",
    "brand": "Daol Charcoal Grilling",
    "name": "Korean BBQ Dinner for Two",
    "ko": "다올 숯불구이 · 2인 한우 BBQ",
    "price": 180000
  },
  {
    "id": "r07",
    "cat": "dining",
    "brand": "Myeongdong Joomak",
    "name": "Korean Dinner for Two",
    "ko": "명동주막 · 2인 디너",
    "price": 80000
  }
];
