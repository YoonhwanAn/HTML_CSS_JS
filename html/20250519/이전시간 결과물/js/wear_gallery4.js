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
      // console.log("json :", json);
      // console.log("json.data :", json.data);
      // console.log("json 컬럼 :", json.data[0]); // 컬럼
      // console.log("json 첫번째 상품정보 :", json.data[1]); // 첫번째 상품 정보
      // console.log("json 첫번째 상품정보의 상품명 :", json.data[1][1]); // 첫번째 상품 정보의 상품명

      let products = json.data; // 첫줄(컬럼), 마지막줄(공백)
      // (1) 공백제거 : let json = Papa.parse(data.trim()); // 28줄

      // (2) 컬럼제거
      products.shift(); // 배열의 첫 요소(컬럼) 제거
      // console.log("상품 정보", products); // 상품 정보
      // console.log("상품 수 :", products.length); // 상품 수

      // for ... of : 전체 상품들 출력
      for (let product of products) {
        // console.log("product :", product);
        // 포맷터(형식자) 출력 %s (string) : 문자열
        // console.log("상품 이미지: %s", product[0]+"_LM1.jpg");
        // console.log("상품명 : %s", product[1]);
        // console.log("상품 브랜드 : %s", product[3]);
        // console.log("상품 가격 : %s", product[4]);
        // console.log("신상품 여부 : %s", 
        //             (product[5] == 'O' ? "신상품" : "기존상품"));
        // console.log("추천 점수 : %d", product[6]);
        // console.log("----------------------------");

        let product_content =
        `<!-- 의류 단품 패널 -->
        <div class="wear-pnl">

          <!-- 의류 관심 상품(좋아요) 등록 -->
          <div class="wear-preferred-item">
            <span class="material-symbols-outlined preferred-item-icon">
              favorite
            </span>              
          </div>
          <!--// 의류 관심 상품(좋아요) 등록 -->

          <!-- 의류 썸네일 사진 패널 --> 
          <div class="wear-gallery-pic">
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

        let wrap = document.querySelector(".wrap")
        wrap.innerHTML += product_content;

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

}