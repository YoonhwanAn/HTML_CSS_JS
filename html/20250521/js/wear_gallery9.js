window.onload = async () => {
  function numberFormat(money) {

    let num = numberWithCommas(money).trim();
    num = num + " 원";

    return num;
  } //
      
  function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    // RegExp.test() : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
    while (pattern.test(x)) // 정규표현식을 만족하는지 true or false로 반환
      x = x.replace(pattern, "$1,$2");
    return x;
  }
  
  async function fetchCSV(url) {
    try {
      const response = await fetch(url);
      const data = await response.text();

      // document.getElementById('output').innerText = data;

      // CSV -> JSON (Using papaparse : https://www.papaparse.com/)
      let json = Papa.parse(data.trim()); // 공백 제거
      // console.log("json.data :", json.data);

      let products = json.data; // 첫줄(컬럼), 마지막줄(공백)
      // (1) 공백제거 : let json = Papa.parse(data.trim()); // 28줄

      // (2) 컬럼제거
      products.shift(); // 배열의 첫 요소(컬럼) 제거
      // console.log("상품 정보", products); // 상품 정보
      // console.log("상품 수 :", products.length); // 상품 수

      // for ... of : 전체 상품들 출력
      for (let product of products) {
        // console.log("product :", product);
        // console.log("----------------------------");

        let product_content =
        `<!-- 의류 단품 패널 -->
        <div class="swiper-slide wear-pnl">

          <!-- 의류 관심 상품(좋아요) 등록 -->
          <div class="wear-preferred-item">
            <span class="material-symbols-outlined preferred-item-icon">
              favorite
            </span>              
          </div>
          <!--// 의류 관심 상품(좋아요) 등록 -->

          <!-- 의류 썸네일 사진 패널 --> 
          <div class="wear-gallery-pic" id="img_${product[0]}">
            <img class="img1" src="./pic/${product[0]}_LM1.jpg" />
            <img class="img2" src="./pic/${product[0]}_LM2.jpg" />
          </div>
          <!--// 의류 썸네일 사진 패널 -->

          <!-- 원단 스타일 -->
          <div class="wear-fabric">
            <div class="wear-fabric-icon">             
              <img src="./pic/${product[0]}_LM1.jpg" />
            </div>
          </div>
          <!--// 원단 스타일 -->

          <!-- 브랜드 -->
          <div class="brand-name">
            ${product[3]}
          </div>
          <!--// 브랜드 -->

          <!-- 상품명-->
          <div class="wear-name">
            ${product[1]}
          </div>
          <!--// 상품명-->

          <!-- 상품 단가 -->
          <div class="wear-price">
            ${numberFormat(product[4])}
          </div>
          <!--// 상품 단가 -->

          <!-- 상품 추천 별점 및 상품평 -->
          <div class="wear-recomm-review">
            ${product[7] == 0 ? 
              '' : 
              `<div class="wear-recomm-review-icon-wrap">
                <span class="material-symbols-outlined">star</span>
                <span class="wear-recomm-review-num"> ${product[6]} </span>
                <span class="material-symbols-outlined">reviews</span>
                <span class="wear-recomm-review-num"> ${product[7]} </span>
              </div>`}
          </div>
          <!--// 상품 추천 별점 및 상품평 -->

          <!-- 신상품 여부 -->
          <div class="new-wear">
            ${product[5] == 'O' ? 
            '<span class="new-wear-icon">신상품</span>' : ''}
          </div> 
          <!--// 신상품 여부 -->

        </div>
        <!--// 의류 단품 패널 -->`

        let swiperWrapper = document.querySelector(".swiper-wrapper")
        swiperWrapper.innerHTML += product_content;

      } // for


    } catch (error) {
        console.error('Error fetching CSV:', error);
    }
  }

  // fetchCSV('https://example.com/data.csv');
  await fetchCSV('./csv/상품정보-추가상품.csv');

  let materialSymbols = document.querySelectorAll(".wear-preferred-item > span.preferred-item-icon");

  for (let materialSymbol of materialSymbols) {
    materialSymbol.addEventListener('click', () => {
      materialSymbol.classList.toggle("filled");
    });
  }

  // 2. 팝업관련 변수
  let img_popup = document.getElementById("img_popup");
  let img_popup_body = document.getElementById("img_popup_body");
  let popup_background = document.getElementById("popup_background");

  // (1) 이벤트 클릭 시 팝업
  let wear_gallery_pics = document.querySelectorAll(".wear-gallery-pic");
  console.log(wear_gallery_pics);

  wear_gallery_pics.forEach((element) => {

    element.addEventListener('click', (event) => {
      
      console.log("event.currentTarget :", event.currentTarget);

      // class : wear-gallery-pic에서 id를 추출하여 제품명 떼어냄.
      let product_id = event.currentTarget.id.substring(4);
      // console.log(product_id);

      // 팝업창에 확대 이미지 삽입
      img_popup_body.innerHTML = `<img class="img1" src="./pic/${product_id}_LM1.jpg" />
                                  <img class="img2" src="./pic/${product_id}_LM2.jpg" />`;

      console.log("img_popup_body : ", img_popup_body);
      img_popup.style.display = "block";
      popup_background.style.display = "block";

    });

  });

  // (2) 이미지 팝업창 클릭시 팝업창 닫기
  img_popup.addEventListener('click', () => {
      console.log("창닫기");

      // 팝업창 은닉(창 닫기) 및 내용 삭제
      img_popup.style.display = "none"; // 디스플레이 제거
      popup_background.style.display = "none";

  }); // 이미지 팝업창 클릭시 팝업창 닫기

  // console.log(parseInt(window.innerWidth/210));
  // slidesPerView: `${parseInt(window.innerWidth/210)}`,

  const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  slidesPerView: 5,
  spaceBetween: 10, 
  // 첫번째 항목이 가운데로오게
  centeredSlides: true,

  // // 커버플로우 효과 - 선택된 항목을 제외하고 기울여서 출력
  // effect: 'coverflow',
  // coverflowEffect: {
  //   rotate: 10,
  //   slideShadows: false,
  // },

  // // 크리에이티브 이펙트
  // effect: 'creative',
  // creativeEffect: {
  //   prev: {
  //     // will set `translateZ(-400px)` on previous slides
  //     translate: [0, 0, -400],
  //   },
  //   next: {
  //     // will set `translateX(100%)` on next slides
  //     translate: ['100%', 0, 0],
  //   },
  // },

  // // 큐브효과
  // effect: 'cube',
  // cubeEffect: {
  //   slideShadows: false,
  // },

  // // 카드효과
  // effect: 'cards',
  // cardsEffect: {
  //   slideShadows: false,
  // },

  // // 페이드 효과
  //   effect: 'fade',
  //   fadeEffect: {
  //   crossFade: true
  // },

  // // 플립 효과
  //   effect: 'flip',
  //   flipEffect: {
  //   slideShadows: false,
  // },

  // 키보드를 사용하여 슬라이드 탐색을 활성화
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  
  // 마우스 휠을 사용하여 슬라이드 탐색을 활성화
    mousewheel: {
    invert: true,
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.custom-swiper-button-next',
    prevEl: '.custom-swiper-button-prev',
  },

  // And if we need scrollbar
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  // },
});
}
