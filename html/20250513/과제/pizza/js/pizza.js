window.onload = function() {	

    // 피자 원본 파일들
    // let pizza = ['pizza1.png', 
    // 			    'pizza2.png', 
    // 			    'pizza3.png', 
    // 			    'pizza4.png'];
    
    // 배열에 피자 등록
    let pizza = new Array(); 
    pizza[0] = 'pizza1.png';
    pizza[1] = 'pizza2.png';
    pizza[2] = 'pizza3.png';
    pizza[3] = 'pizza4.png';
    
    // 화면 가용공간(viewport) 높이 설정
    let wrap = document.getElementById("wrap");
    let left_menu = document.getElementById("left_menu");
    let center_dish = document.getElementById("center_dish");
    let pizza_menu = document.getElementById("pizza_menu");
    let knife_box = document.getElementById("knife_box");
    let fork_box = document.getElementById("fork_box");
    let main_dish = document.querySelector("#main_dish");
    let post_it = document.getElementById("post_it");
    let canvas = document.getElementById("pizzaCanvas");
    
    
    // 참고) viewport 단위를 사용하지 않고
    // javascript로 전체 화면 viewport(실제 컨텐츠 출력공간) 설정하는 방법

    // wrap.style.height = window.innerHeight + "px";
    // left_menu.style.height = window.innerHeight + "px";
    // center_dish.style.height = window.innerHeight + "px";
    
    // 좌측 메뉴에 요리 추가
    for (let i=0; i<pizza.length; i++)
    {
        let dish_code = `<div class='pizza'>
                            <img src='pic/small/small_pizza${i+1}.png' 
                                id='pizza${i+1}'>
                        </div>`;
        
        pizza_menu.innerHTML += dish_code;
    } // 

    // 좌측 피자 메뉴 등록 및 CSS 적용
    let pizzas = document.querySelectorAll(".pizza");

    for (let pizza of pizzas) {
        pizza.style.padding = "10px"; 
        pizza.style.width = "250px";
        pizza.style.height = "100px";
        pizza.style.display = "flex";
        pizza.style.alignItems = "center";
        pizza.style.justifyContent = "center";
    }
    
    // 피자 메뉴 공용 변수 설정
    let pizza_menu_btns = document.querySelectorAll("img[id^=pizza]");
    const ctx = canvas.getContext('2d');
    const pizzaImage = new Image();
    let currentPizzaClickCallback = null; // canvas에 등록된 이벤트 리스너를 보관할 변수

    // 피자 메뉴 mouseover, mouseout 이벤트 설정
    for (let pizza_menu_btn of pizza_menu_btns) {
        pizza_menu_btn.addEventListener('mouseover', function(e) {
        // 스무스한 확대 효과를 위해 transition도 함께 설정 가능함
        pizza_menu_btn.style.transition = 'transform 0.3s ease-out';
        // 확대와 함께 흔들리는 애니메이션 추가
        pizza_menu_btn.style.transform = 'scale(1.2)';
        pizza_menu_btn.style.animation = 'shake 0.8s ease-in-out infinite';
        pizza_menu_btn.style.background = 'radial-gradient(white 50%, rgba(255,255,255,0.5) 60%, rgba(255,255,255,0.0) 70% )';
        });

        pizza_menu_btn.addEventListener('mouseout', function(e) {
            pizza_menu_btn.style.animation = '';
            pizza_menu_btn.style.transform = 'scale(1)';
            pizza_menu_btn.style.background = '';
        });
    }

    // 피자 메뉴 클릭시 이벤트 설정
    for (let pizza_menu_btn of pizza_menu_btns) {

        pizza_menu_btn.onclick = function(e) {

            let selected_pizza = e.target.src;
            selected_pizza = selected_pizza
                                .replace("small_", "")
                                .replace("/small/", "/original/");

            pizzaImage.src = selected_pizza;  // 선택된 피자 이미지
            main_dish.style.background = "url('pic/pizza_plate4.png') no-repeat center"; // 피자플레이트

            // 이미지 로딩 완료 후 캔버스 크기를 이미지 크기에 맞추고 그림
            pizzaImage.onload = function() {
                canvas.width = pizzaImage.width;
                canvas.height = pizzaImage.height;
                ctx.drawImage(pizzaImage, 0, 0);
            };
            
            alert("피자 먹자 !");				
            
            // 포크/나이프 등장 & 포스트잇 제거
            fork_box.style.visibility = "visible";
            knife_box.style.visibility = "visible";
            post_it.style.display = "none";

            // 피자클릭 시 피자먹기
            
            // 이전에 등록된 캔버스 클릭 이벤트 리스너가 있다면 제거
            if (currentPizzaClickCallback) {
                canvas.removeEventListener('click', currentPizzaClickCallback);
            }    
            
            // 먹은 피자 조각의 수와 최대 조각 수(8조각) 기록
            let eatenSlices = 0;
            const maxSlices = 8;
                // 캔버스 클릭 시마다 피자의 한 조각(45°)을 제거하는 함수
            currentPizzaClickCallback = function(e) {
                // 피자를 모두 먹었다면 더 이상 동작하지 않음.
                if (eatenSlices >= maxSlices) return;
            
                // 전체 각도를 8조각으로 나눔 (360°/8 = 45° → 라디안으로는 Math.PI/4)
                const sliceAngle = (2 * Math.PI) / maxSlices;  // Math.PI/4

                // 보통 0 라디안은 오른쪽(3시 방향)이므로, 12시 방향(위쪽)부터 시작하고 싶다면,
                // 시작 각도를 -90°(즉, -Math.PI/2)로 보정함.
                const startAngle = -Math.PI / 2 + eatenSlices * sliceAngle;
                const endAngle = startAngle + sliceAngle;

                // 피자 이미지의 중심과, 제거할 영역(반지름) 계산
                const cx = canvas.width / 2;
                const cy = canvas.height / 2;
                // 피자 이미지는 원형이므로, 캔버스 가로 또는 세로의 절반 중 작은 값을 반지름으로 사용
                const radius = Math.min(cx, cy);

                // destination-out 모드 설정: 이 모드에서는 그리는 영역이 기존 이미지에서 '빼기' 역할을 수행함.
                ctx.save();
                ctx.globalCompositeOperation = 'destination-out';
                
                // 원형 섹터(웨지)를 그리기
                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.arc(cx, cy, radius, startAngle, endAngle);
                ctx.closePath();
                
                // 채우면 해당 영역이 투명해짐
                ctx.fill();
                ctx.restore();

                eatenSlices++;
            }

            canvas.addEventListener('click', currentPizzaClickCallback);

        } // handler
    
    } // for

    // 나이프/포크를 건드리게 되면 그만 먹는 것으로 간주하여 이벤트 처리
    knife.onclick = function() {

        // 식사중 그만 먹을지 점검!
        if (confirm("피자를 맛있게 먹고 있습니다. 그만 드시겠습니까?")) {

            alert("잘 먹었습니다.");

            // 포크와 나이프를 치운다.& 포스트잇 생성
            console.log("자리 정리");
            fork_box.style.visibility = "hidden";
            knife_box.style.visibility = "hidden";
            post_it.style.display = "flex";
            
            // 피자를 치운다
            ctx.clearRect(0, 0, canvas.width, canvas.height);  
            
            // 피자 접시를 치운다.
            main_dish.style.background = "";
        } 

    } //
    
    fork.onclick = function() {

        // 식사중 그만 먹을지 점검!
        if (confirm("피자를 맛있게 먹고 있습니다. 그만 드시겠습니까?")) {

            alert("잘 먹었습니다.");

            // 포크와 나이프를 치운다.
            console.log("자리 정리");
            fork_box.style.visibility = "hidden";
            knife_box.style.visibility = "hidden";
            post_it.style.display = "flex";

            // 피자를 치운다
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 피자 접시를 치운다.
            main_dish.style.background = "";
        } 

    }

} // window.onload