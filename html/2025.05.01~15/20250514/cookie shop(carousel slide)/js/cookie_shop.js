let cookies = []; // 쿠키(들) 배열

// let cookieProduct = {}; // 쿠키 객체

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

    // 쿠키 객체 배열 초기화

    // 위의 세가지 배열(cookie_image_files,
    // cookie_text, cookie_price)을 
    // cookies 라는 배열에 추가하는 
    // 구문을 작성합니다.
    for (let i=0; i<cookie_image_files.length; i++)
    {
        cookies.push(new CookieProduct(cookie_image_files[i], 
                                       cookie_text[i], 
                                       cookie_price[i]));
    } // 

    // 화면 가용공간(viewport) 높이 설정
    let sections = document.querySelectorAll("[id$=_section]");

    for (let section of sections) {
        section.style.height = window.innerHeight;
    }

    // 슬라이더 이미지(쿠키) 로딩(추가)
    let cookie_image = "";

    for (let i = 0; i < cookie_image_files.length; i++)
    {
        // 처음 쿠키만 active 속성 할당 : 슬라이드 쿠키 이미지 초기화
        let active_append = (i == 0) ? "active" : ""; 
        // bootstrap carousel(캐러셀) 슬라이드 패널에서 초기 슬라이드를 만들기 위한 속성 = active

        // data-bs-interval="3000" : 간격 조정 (3초)
        cookie_image = `<div class="carousel-item ${active_append}" data-bs-interval="3000">
                            
                            <div id="slider_text${i}" 
                                    class='slider_text' style='color:yellow; z-index:10'>
                                <span style="color:#fff; font-weight:bold; font-size:2em;">${cookies[i].name}</span>
                                <br><br>
                                ${cookies[i].content}
                                <br><br>
                                <b>￦ ${cookies[i].price}</b>
                            </div>	
                            
                            <img src='./pic/${cookies[i].name}.png' 
                                id='cookie_image${i}'									
                                class="cookie_image" />
                                
                        </div>`; 

        let slider_panel = document.querySelector("div#slider_panel");

        slider_panel.innerHTML += cookie_image;

        //////////////////////////////////////////////////////////////////////////

        // indicator(개별 슬라이드 이동버튼) 메뉴 추가
        // rounded-circle : 모양을 둥글게 처리(bootstrap)
        // https://www.w3schools.com/bootstrap5/bootstrap_utilities.php
        let active_class_append = (i == 0) ? 
            "class='rounded-circle active'" : "class='rounded-circle'"; 

        // indicator(개별 슬라이드 이동버튼) 메뉴 버튼 모양(CSS)
        let indicator_style = `style="background-color:orange;
                                      height:16px; width:20px; 
                                      margin-left:10px;border-radius:10px`;

        // CSS 추가 : indicator
        let indicator = `<button id="indicator_btns${i}"  
                                 type="button" data-bs-target="#cookie_gallery_section" 
                                 data-bs-slide-to="${i}" 
                                 ${active_class_append}
                                 ${indicator_style}">
                         </button>`;

        let indicators = document.querySelector("div#carousel-indicators");

        indicators.innerHTML += indicator;
    } // for


} // window.onload 