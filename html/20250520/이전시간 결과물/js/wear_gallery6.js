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

  // 2. 팝업관련 변수
  let img_popup = document.getElementById("img_popup");
  let img_popup_body = document.getElementById("img_popup_body");

  // (1) 이벤트 클릭 시 팝업
  let wear_gallery_pics = document.querySelectorAll(".wear-gallery-pic");
  console.log(wear_gallery_pics);

  wear_gallery_pics.forEach((element) => {

    element.addEventListener('click', (event) => {
      
      // console.log("event.target :", event.target);
      // 하위속성 이벤트 버블링(O) => div(target), img(target)
      // => 타겟이 일관되지 않음.
      // event.stopPropagation();
      // event.proventDefault():
      console.log("event.currentTarget :", event.currentTarget);
      // 하위속성 이벤트 버블링(X) => div(currentTarget)

      // class : wear-gallery-pic에서 id를 추출하여 제품명 떼어냄.
      let product_id = event.currentTarget.id.substring(4);
      // console.log(product_id);

      // 팝업창에 확대 이미지 삽입
      img_popup_body.innerHTML = `<img class="img1" src="./pic/${product_id}_LM1.jpg" />`;

      console.log("img_popup_body : ", img_popup_body);

      // 추가설명
      // event.target은 실제로 사용자가 클릭한 정확한 요소를 반환
      // 따라서 이벤트 리스너가 부모 요소인 .wear-gallery-pic에 붙어 있어도, 
      // 만약 사용자가 그 내부의 <img> 태그를 클릭하면 event.target은 <img> 엘리먼트가 됩니다. 
      // 반대로, <img> 영역 바깥의 빈 공간이나 부모의 다른 부분을 클릭하면 event.target은 .wear-gallery-pic <div>가 됩니다.
      // 만약 언제나 이벤트 핸들러가 바인딩된 요소를 참조하고 싶다면 event.currentTarget을 사용하면 됩니다. 
      // 이는 클릭한 요소와 상관없이 항상 리스너가 달린 요소를 가리키게 해줍니다.
      // 이처럼 JavaScript의 이벤트 위임과 버블링(event bubbling) 메커니즘에 따라, 클릭한 요소에 따라 event.target의 값이 달라지는 것입니다.

      // target
      // event.stopPropagation()과 event.preventDefault()는 각각 이벤트의 전파와 기본 동작을 제어하는 메서드이지, 
      // event.target이 가리키는 요소 자체를 바꾸지는 않습니다.
      // 예를 들어, 사용자가 <img> 요소를 클릭했을 때 그 요소는 event.target으로 반환됩니다. 
      // 이때 stopPropagation()을 호출해도 클릭 이벤트가 부모 요소로 버블링되는 것을 막을 수 있지만, 
      // 이미 클릭한 요소가 이미지라는 사실은 변하지 않습니다.

      // preventDefault() 메서드
      // 어떤 이벤트를 명시적으로 처리하지 않은 경우, 해당 이벤트에 대한 사용자 에이전트의 기본 동작을 실행하지 않도록 지정
      // => 예) if 조건에 따라 정규식이 아니면 submit 버튼을 눌러도 서버전송 불가.

    });

  });

  // (2) X버튼 클릭시 팝업창 닫기 // (3) 기능을 넣으면서 이벤트 중복되어 삭제
  /*
  let close_btn = document.getElementById("close_btn");
  close_btn.addEventListener('click', () => {
      console.log("창닫기");

      // 팝업창 은닉(창 닫기) 및 내용 삭제
      img_popup.style.visibility = "hidden"; // 숨기기

  }); // (X버튼 클릭시 팝업창 닫기
  */
  
  // (3) 이미지 팝업창 클릭시 팝업창 닫기
  img_popup.addEventListener('click', () => {
      console.log("내용삭제");

      // 팝업창 내용 삭제
      img_popup_body.innerHTML = "";

  }); // 이미지 팝업창 클릭시 팝업창 닫기

  // (4) 스크롤시 이미지유지 
  window.addEventListener('scroll', () => {
      console.log("이벤트?");


  }); // 이미지 팝업창 클릭시 팝업창 닫기

}