// 1. 사용할 항목 정의 (window.onload 밖이므로 실행되는 코드는 넣지말 것, 선언, 함수정의, 사전정보 등만 사용)

// (1)쿠키 배열 생성 (정보 취합용)
let cookies = []; // 쿠키(들) 배열
// let cookies = new Array(); // (동일표현)

// (2) 쿠키 클래스(생성자) 정의
function CookieProduct(name, image, content, price) { 

    this.name = name;
    this.image = image;
    this.content = content;
    this.price = price;
}

// 원시적인 방법
/*
let cookieclass = { 
    cookieName : '',
    cookieDetail : '',
    cookiePrice : 0,
    cookieImageFile : ''
    }
*/  

/*
class cookieclass = { 
    cookieName : '',
    cookieDetail : '',
    cookiePrice : 0,
    cookieImageFile : ''
    }

    constructor(cookieName, cookieDetail, cookiePrice, cookieImageFile) {
    this.cookieName = cookieName;
    this.cookieDetail = cookieDetail;
    this.cookiePrice = cookiePrice;
    this cookieImageFile = cookieImageFile;
    }
}
*/


// (3) 문자열 대체 함수 정의
function replaceAll(str, searchStr, replaceStr) {
    return str.split(searchStr).join(replaceStr);
}

// 2. 필요한 항목 정보 취합
// (1) 쿠키 이미지 파일명 : 배열
let cookie_names = [
                    'Chocolate Chip', 
                    'German Chocolate', 
                    'Lemonade', 
                    'Mexican Hot Chocolate', 
                    'Molasses Crinkle', 
                    'Oatmeal Chocolate Chip', 
                    'Oatmeal Golden Raisin', 
                    'Peanut Butter', 
                    'Peanut Butter Cup', 
                    'Root Beer Float', 
                    'Snickerdoodle', 
                    'Sugar', 
                    'Triple Chocolate', 
                    'White Choc Macedamia'
                    ];

let cookie_image_files = [
                        'chocolate_chip.png', 
                        'german_chocolate.png', 
                        'lemonade.png', 
                        'Mexican_Hot_Chocolate.png', 
                        'molasses_crinkle.png', 
                        'Oatmeal_Chocolate_Chip.png', 
                        'Oatmeal_Golden_Raisin.png', 
                        'Peanut_Butter.png', 
                        'Peanut_Butter_Cup.png', 
                        'Root_Beer_Float.png', 
                        'Snickerdoodle.png', 
                        'Sugar.png', 
                        'triple_chocolate.png', 
                        'white_choc_macedamia.png'
                        ];

// (2) 쿠키 설명 : 배열
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

// (3) 쿠키 가격 : 배열
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

// 3. 메인실행 영역 (window.onload)
window.onload = () => {

    // cookies 객체 배열만들기 (정보들을 cookies 하나로 압축)
    for (let i = 0; i < cookie_image_files.length; i++) 
    {
        cookies.push(new CookieProduct(cookie_names[i],
                                        cookie_image_files[i], 
                                        cookie_text[i], 
                                        cookie_price[i])); 
    } 

    // 화면 가용공간(viewport) 높이 설정
    // let sections = document.querySelectorAll("[id$=_section]"); // 섹션으로 끝나는 id, 여기서는 전체 레이아웃인 <div id="wrap_section">이 유일

    // window.innerHeight : 수평 스크롤 막대 높이를 포함한 창 내부 높이를 픽셀로 반환
    // for (let section of sections) {
    //     section.style.height = window.innerHeight;
    // console.log("section.style.height", section.style.height);
    // }

    // 슬라이더 이미지(쿠키) 로딩(추가)
    let slider_panel = document.querySelector("div#slider_panel");
    let cookie_image_html = "";

    for (let i = 0; i < cookie_image_files.length; i++) {
        cookie_image_html +=  `<div class="swiper-slide">
                                <div class="container">
                                    <p style="color:brown; font-weight:bold; font-size:1.2em;">${cookies[i].name}</p>
                                    <div class="cookie-box">
                                        <img src="pic/${cookies[i].image}" id="cookie_image${i}" class="cookie_image">
                                    </div>
                                    <div style="height:220px; font-size: 0.9em; padding: 10px; text-align:justify;">&nbsp&nbsp${cookies[i].content}</div>
                                    <div style="font-size: 1.2em;">￦ <b>${cookies[i].price}</b></div>	                                    
                                </div>
                            </div>`;

    }
    
    slider_panel.innerHTML += cookie_image_html;

    
    // swiper 적용
    const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal', // vertical
    loop: true,
    slidesPerView: 3,
    slidesPerGroup: 1,
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

    // And if we need scrollbar
    // scrollbar: {
    //     el: '.swiper-scrollbar',
    // },
    });


    let cookieImages = document.getElementsByClassName('cookie_image')
    for (let cookieImage of cookieImages) {
        cookieImage.addEventListener('mouseover', function(e) {
        cookieImage.style.transition = 'transform 0.3s ease-out';
        cookieImage.style.transform = 'scale(1.2) rotateZ(180deg)';
        });

        cookieImage.addEventListener('mouseout', function(e) {
            cookieImage.style.transform = '';
        });
    cookieImages.addEve
    }

} // window.onload 