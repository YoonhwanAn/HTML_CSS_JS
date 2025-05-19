// 1. 사용할 항목 정의 (window.onload 밖이므로 실행되는 코드는 넣지말 것, 선언, 함수정의, 사전정보 등만 사용)

// (1)의류 배열 생성 (정보 취합용)
let clothes = []; // 쿠키(들) 배열

// (2) 쿠키 클래스(생성자) 정의
function ClothesProduct(product_code, front_image, back_image, pattern, maker, price, name, new_product, favorite, comment) { 

    this.product_code = product_code;
    this.front_image = front_image; 
    this.back_image = back_image;
    this.pattern = pattern;
    this.maker = maker; 
    this.price = price;
    this.name = name;
    this.new_product = new_product;
    this.favorite = favorite; 
    this.comment = comment;
}

// (3) 문자열 대체 함수 정의
function replaceAll(str, searchStr, replaceStr) {
    return str.split(searchStr).join(replaceStr);
}

// 2. 필요한 항목 정보 취합
// (1) 의류 이미지 파일명 : 배열
let product_codes = [
                    'TLSCM25621KHA',
                    'TLSCM25621BLK',
                    'TLSCM25611NAY',
                    'JWPOM25231GBE',
                    'JWPOM25231DGY',
                    'JWPOM25221DBU',
                    'JWPOM25221GRY'
                    ];

let front_images = [
                    'TLSCM25621KHA_LM1.jpg',
                    'TLSCM25621BLK_LM1.jpg',
                    'TLSCM25611NAY_LM1.jpg',
                    'JWPOM25231GBE_LM1.jpg',
                    'JWPOM25231DGY_LM1.jpg',
                    'JWPOM25221DBU_LM12.jpg',
                    'JWPOM25221GRY_LM12.jpg'
                    ];

let back_images = [
                    'TLSCM25621KHA_LM2.jpg',
                    'TLSCM25621BLK_LM2.jpg',
                    'TLSCM25611NAY_LM2.jpg',
                    'JWPOM25231GBE_LM2.jpg',
                    'JWPOM25231DGY_LM2.jpg',
                    'JWPOM25221DBU_LM1.jpg',
                    'JWPOM25221GRY_LM1.jpg'
                  ];

let patterns = [
                'TLSCM25621KHA_CC.gif',
                'TLSCM25621KHA_CC.gif',
                'TLSCM25611NAY_CC.gif',
                'JWPOM25231DGY_CC.gif',
                'JWPOM25231DGY_CC.gif',
                'JWPOM25221DBU_CC.gif',
                'JWPOM25221DBU_CC.gif'
                ];

let makers = [
              'KOLON SPORT',
              'KOLON SPORT',
              'KOLON SPORT',
              'KOLON SPORT',
              'KOLON SPORT',
              'KOLON SPORT',
              'KOLON SPORT'
              ];

let names = [
              '남성 지퍼포켓 셔켓(SET-UP)',
              '남성 지퍼포켓 셔켓(SET-UP)',
              '남성 시어서커 깅엄체크 반팔 셔츠',
              '남성 카고 7부 팬츠',
              '남성 카고 7부 팬츠',
              '남성 카고 5부 팬츠',
              '남성 카고 5부 팬츠'
              ];

let prices = [
              138000,
              138000,
              138000,
              148000,
              148000,
              128000,
              128000
              ];

let new_products = [
              true,
              true,
              true,
              false,
              false,
              false,
              false
              ];

let favorites = [
                0,
                0,
                0,
                5,
                5,
                0,
                0
              ];

let comments = [
                0,
                0,
                0,
                1,
                1,
                0,
                0
              ];

// 3. 메인실행 영역 (window.onload)
window.onload = () => {

  // clothes 객체 배열만들기 (정보들을 cookies 하나로 압축)
  for (let i = 0; i < front_images.length; i++) 
  {
      clothes.push(new ClothesProduct(product_codes[i],
                                      front_images[i],
                                      back_images[i], 
                                      makers[i],
                                      names[i],
                                      prices[i],
                                      new_products[i],
                                      favorites[i],
                                      comments[i])); 
  } 

  console.log(clothes);

  // 화면 가용공간(viewport) 높이 설정
  // let sections = document.querySelectorAll("[id$=_section]"); // 섹션으로 끝나는 id, 여기서는 전체 레이아웃인 <div id="wrap_section">이 유일

  // window.innerHeight : 수평 스크롤 막대 높이를 포함한 창 내부 높이를 픽셀로 반환
  // for (let section of sections) {
  //     section.style.height = window.innerHeight;
  // console.log("section.style.height", section.style.height);
  // }

  // 슬라이더 웨어 패널 로딩
  let slider_panel = document.querySelector("div#slider_panel");
  let wear_panels = "";

  for (let i = 0; i < front_images.length; i++) {
    wear_panels +=  `<!-- 의류 단품 패널 ${product_codes[i]}/${names[i]} -->
                        <div class="swiper-slide wear-pnl">
                          <!-- 의류 관심 상품(좋아요) 등록 -->
                          <div class="wear-preferred-item" id="favorite-icon-${i}">
                              <span class="material-symbols-outlined preferred-item-icon">
                                  favorite
                              </span>              
                          </div>
                          <!--// 의류 관심 상품(좋아요) 등록 -->
                          <!-- 의류 썸네일 사진 패널 --> 
                          <div class="wear-gallery-pic">
                              <img src="pic/medium_image/${front_images[i]}" />
                          </div>
                          <!--// 의류 썸네일 사진 패널 -->
                          <!-- 원단 스타일 -->
                          <div class="wear-fabric">
                              <div class="wear-fabric-icon">             
                                  <img src="pic/pattern/${patterns[i]}" />
                              </div>
                          </div>
                          <!--// 원단 스타일 -->
                          <!-- 브랜드 -->
                          <div class="brand-name">
                              ${makers[i]}
                          </div>
                          <!--// 브랜드 -->
                          <!-- 상품명-->
                          <div class="wear-name">
                              ${names[i]}
                          </div>
                          <!--// 상품명-->
                          <!-- 상품 단가 -->
                          <div class="wear-price">
                              ${prices[i]/1000},000원
                          </div>
                          <!--// 상품 단가 -->
                          <!-- 상품 추천 별점 및 상품평 -->
                          <div class="wear-recomm-review">
                            ${(favorites[i] && comments[i]) == 0? '' : `<div class="wear-recomm-review-icon-wrap" id="wear-recomm-review-icon-wrap${i}">
                              ${favorites[i] == 0 ? "" :`<span class="material-symbols-outlined">star</span><span class="wear-recomm-review-num"> ${favorites[i]} </span>`}
                              ${comments[i] == 0 ? "" :`<span class="material-symbols-outlined">reviews</span><span class="wear-recomm-review-num"> ${comments[i]} </span>`}
                            </div>`}
                            
                          </div>
                          <!--// 상품 추천 별점 및 상품평 -->
                          <!-- 신상품 여부 -->
                          <div class="new-wear">
                            ${new_products[i] == true ? '<span class="new-wear-icon">신상품</span>' : ''}
                          </div> 
                          <!--// 신상품 여부 -->
                        </div>
                        <!--// 의류 단품 패널 ${product_codes[i]}/${names[i]}  -->`;
  }
  
  slider_panel.innerHTML += wear_panels;

  
  // swiper 적용
  const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal', // vertical
  loop: true,
  slidesPerView: 4,
  slidesPerGroup: 1,

  // If we need pagination
  pagination: {
      el: '.swiper-pagination',
      clickable: 'true',
  },

  // Navigation arrows
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },

  });

//   let materialSymbols = document.querySelectorAll("[id^=favorite-icon] span.material-symbols-outlined");
//   // console.log(materialSymbols);

//   document.querySelector('.swiper-wrapper').addEventListener('click', (event) => {
//     // 클릭한 요소가 바로 아이콘이거나 아이콘 내부의 자식인 경우를 모두 처리
//     const icon = event.target.closest('.preferred-item-icon');
//     if (!icon) return;

//     console.log("Icon clicked via delegation");

//     if (icon.classList.contains('filled')) {
//       icon.classList.remove('filled');
//       icon.classList.add('outline');
//     } else {
//       icon.classList.remove('outline');
//       icon.classList.add('filled');
//     }
//   });

//   materialSymbols.forEach((materialSymbol) => {
//     // 초기 상태가 정해져있지 않다면 outline 상태를 기본으로 설정
//     materialSymbol.classList.add("outline");

//     materialSymbol.addEventListener("click", () => {
//       console.log("Icon clicked"); // 이벤트 확인
//       if (materialSymbol.classList.contains("filled")) {
//         materialSymbol.classList.remove("filled");
//         materialSymbol.classList.add("outline");
//       } else {
//         materialSymbol.classList.remove("outline");
//         materialSymbol.classList.add("filled");
//       }
//     });
//   });
}