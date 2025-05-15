// 쿠키(들) 배열 선언
let cookies = [];

// 생성자
function CookieProduct(name, content, price) {

    this.name = name;
    this.content = content;
    this.price = price;
}

// 문자열 대체 함수
function replaceAll(str, searchStr, replaceStr) {
    return str.split(searchStr).join(replaceStr);
}

// 쿠키 순서 및 파일명 : 배열
let cookie_image_files = [
                            'chocolate_chip',
                            'german_chocolate',
                            'triple_chocolate',
                            'lemonade',
                            'Mexican_Hot_Chocolate',
                            'molasses_crinkle',
                            'Oatmeal_Golden_Raisin',
                            'Oatmeal_Chocolate_Chip',
                            'Peanut_Butter',
                            'Peanut_Butter_Cup',
                            'white_choc_macedamia',
                            'Root_Beer_Float',
                            'Snickerdoodle',
                            'Sugar'
                            ];
    
let cookie_text = [
                        "A classic cookie made with real butter, white and brown sugars, and tons of of high quality chocolate chips. We don't skimp on the chips!",

                        "This is a German chocolate based cookie, with tons of caramely coconut and whole pecans. No need to travel to Germany for an authentic German Chocolate cookie!",

                        "Especially for chocolate lovers. Triple chocolate means lots of melted chocolate, very little flour, Hershey's cocoa powder, and plenty of chocolate chips, making this cookie extremely rich. Crackly top and soft in the middle - chocolate heaven!",

                        "A summer inspired cookie, made with lemonade concentrate, fresh lemon juice, and pure lemon extract. The flavor of lemonade is all throughout this soft pound cake-like cookie and it is delicious! Yummy lemon icing and yellow sparkly sprinkles decorate the top.",

                        "This is one of our most unique cookies for people who like a little spicy heat. This cookie is flavored with chocolate cocoa powder and rolled in a mixture of cinnamon, chili powder and cayenne pepper - a delicious flavor combination. We dare you to try it!",
                        
                        "This recipe is from April's grandmother Alice, of Pinehurst, NC. A tried and true cookie that is hard to find these days. Made with brown sugar, molasses, and an incredible mix of spices including cinnamon, ginger and cloves. These cookies are chewy, dense and old-fashionably good.",

                        "These cookies are like a bowl of oatmeal to go. We use old fashioned rolled oats for a more dense cookie, butter and brown sugar, Madagascar vanilla, a touch of kosher salt, and our special twist - locally produced honey and plump golden raisins.",

                        "So many people requested this cookie we just had to bake it for you! Oatmeal chocolate chip is a dense chewy cookie filled with oats and our special twist: white AND dark chocolate chips. A sprinkle of sea salt on top before it is baked really makes your taste buds pop!",

                        "Lots of peanut butter go in to these cookies, and of course they have the essential fork criss crosses on top.",
                        
                        "This is our awesome flavor created for all you peanut butter & chocolate lovers out there. You are going to love this! A chewy chocolate cookie stuffed with big chunks of peanut butter cups, swirled with more peanut butter and a whole peanut butter cup sunk right in the middle. Heaven!",

                        "This rich, chewy cookie is one that customers demanded year after year. However, we didn't want to add it to the line up until it was perfect (and until bulk macadamias came down in price!). In every bite you will enjoy the contrast of crunchy, salty macadamia nuts and smooth, creamy white chocolate chips. Cookie paradise!",

                        "The People love root beer so why not a root beer cookie? This is a soft, chewy cookie. Root beer extract is in the cookie and in the icing on the top. One bite and you will swear you are sipping on a creamy root beer float.",

                        "You may remember these from when you were a kid - a crinkly topped sugar cookie rolled in cinnamon-sugar. Great with coffee or tea.",
                        
                        "A good old fashioned cookie, simple but heavenly. Choose plain sugar cookies or sugar cookies decorated with white icing and rainbow sprinkles. Great for kids of all ages."

                    ];

let cookie_price = [
                        1500,
                        2000,
                        3000,
                        1500,
                        1500,
                        1500,
                        2000,
                        2000,
                        1500,
                        2000,
                        1500,
                        2000,
                        1500,
                        2500
                    ];

// 메인(main)
window.onload = function() {

    // 쿠키 객체 배열 생성 (앞서 빈 배열만 만들었음.
    for (let i = 0; i < cookie_image_files.length; i++)
    {
        cookies.push(new CookieProduct(cookie_image_files[i], 
                                       cookie_text[i], 
                                       cookie_price[i]));
    }

    // 화면 가용공간(viewport) 높이 설정
    let sections = document.querySelectorAll("[id$=_section]");

    for (let section of sections) {
        section.style.height = window.innerHeight;
    }

    // 슬라이더 이미지(쿠키) 로딩
    let cookie_image = "";

    // slider에 쿠키이미지 및 내용추가
    for (let i = 0; i < cookie_image_files.length; i++)
    {
        cookie_image = `<div class="swiper-slide">                            
                            <div id="slider_text${i}" class="slider_text" style="color:yellow; z-index:10">
                                <span style="color:#fff; font-weight:bold; font-size:2em;">${cookies[i].name}</span>                                
                                <br><br>
                                ${cookies[i].content}
                                <br><br>
                                <b>￦ ${cookies[i].price}</b>
                            </div>	                            
                            <img src="./pic/${cookies[i].name}.png" id="cookie_image${i}" class="cookie_image" />
                        </div>`; 

        let slider_panel = document.querySelector("div#slider_panel");

        slider_panel.innerHTML += cookie_image;

    } // for

    // swiper 옵션
    const swiper = new Swiper('.swiper', {
		// Optional parameters
		direction: 'horizontal',
		loop: true,

        // If we need autoplay
        autoplay: {
            delay: 4000,
        },

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

    // 쿠키 장바구니 / 주문 현황판 항목들 추가
    for (let i=0; i<cookies.length; i++)
    {
        let order_content
            = `<tr>
                <td>
                    <input type='text' id='name${i}' class="form-control" name='name${i}' readonly value='${cookies[i].name}'>
                </td>
                <td>
                    <input type='number' id='price${i}' class="form-control" name='price${i}' pattern='(d{3})' readonly min='0' 
                            value='${cookies[i].price}'>
                </td>
                <td>
                    <input type='number' class="form-control" min='0' id='quantity${i}' name='quantity${i}' value='0'>
                </td>
                <td>
                    <input type='number' class="form-control" min='0' id='sum${i}' name='sum${i}' value='0' readonly>
                </td>
            </tr>`; 

        document.querySelector("table#order_board").innerHTML += order_content;
    } // for

    // 주문수량 조절시 -> 금액과 총계 변화
    let quantities = document.querySelectorAll("[id^=quantity]");

    for (let quantity of quantities) {

        // TODO
        // 음수 입력에 대한 regex(정규표현식) 점검
        // regex => 양의 정수만 입력하도록 점검 
        // => 오류시 메시징 => 기존 값 복원, 초기화(0)
        // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/RegExp
        // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
        /*
        quantity.onblur = function(event) {

        } //     
        */

        // 주문 수량 필드 조정시 상품별 합계 및 총계 환산(변경)
        quantity.onchange = function(event) {

            // event.target.id, event.currentTarget.id
            let quantity = this.getAttribute("id");
            let i = parseInt(replaceAll(quantity,"quantity",""));

            let price_fld = document.getElementById("price"+i).value;

            // why) 형변환 사유 => 입/출력 form 필드 "값" => 자료형 : 문자열
            // 연산 : 문자열 => 숫자(형변환)
            let price = parseInt(price_fld); // 단가

            let old_quantity = parseInt(this.value); // 기존 주문수량

            let sum = 0; // 상품별 합계
            let total_price = 0; // 총계

            for (let i=0; i<cookies.length; i++)
            {
                price_fld = document.getElementById("price"+i).value;

                price = parseInt(price_fld); 

                // 상품별 합계 환산
                quantity_fld = document.getElementById("quantity"+i).value;
                old_quantity = parseInt(quantity_fld);
                sum = price * old_quantity;
                
                document.getElementById("sum"+i).value = sum; // 상품별 합계 출력

                // 총계 환산(적산)
                total_price += sum;

            } // for

            document.getElementById("total_price").value = total_price; // 총계 출력
        
        } // onclick 

    } // for	

} // window.onload 