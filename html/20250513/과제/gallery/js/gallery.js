/**
 * 
 */
// window.onload = function() {
window.onload = () => {

	// 카운터 변수 : 파일 구성시 접미사로 사용 ex) kimhongdo_1.png 
	let count = 1;
	
	// body 
	/* 
		문-1) body 태그에 외부간격/내부간격을 각각 0으로 할당하십시오.
	*/
	// TODO
	let body = document.querySelector('body')
	body.style.margin = 0;
	body.style.padding = 0;

	
	/*
		문-2) 처음 출력할 그림을 아래의 조건에 맞게 작성합니다.

		이미지 폴더 : ./image
		파일명 : kimhongdo_1.png
		아이디(id) : img_pad
		
		Hint) 우선 이미지 태그를 변수로 정의하고, gallery 레이어 내에 
				정의된 이미지 태그 내용을 삽입합니다.  
	*/
	
	// TODO : 처음 그림 출력
	let img_gal = document.getElementById("gallery")
	let insertInitialImage = `<image id="img_pad" src="image/kimhongdo_1.png">`;
	img_gal.innerHTML = insertInitialImage;
	
	
	/*
		문-3) 이미지를 갤러리(gallery) 내부를 중앙정렬합니다.
	*/
	
	let wrap = document.getElementById("wrap");
	wrap.style.width = "100vw";
	wrap.style.height = `${window.innerHeight}px`;

	// TODO
	wrap.style.display = "flex";
	wrap.style.justifyContent = "center";
	wrap.style.alignItems = "center";
	
	/*
		문-4) 그림을 누르면 다음 그림으로 넘어가는 부분을 작성합니다.
		초기에는 투명도가 0으로 설정된 상태에서 setTimeout 함수를 활용하여 
		0.8초 후에 이미지가 출력되도록 하되,
		변환 효과(transition)로 이미지의 투명도가 다시 1로 서서히 변환되면서,
		지속시간(duration)은 0.7초, 지연시간(delay)은 0.1초로 하여 변환 효과를 처리하도록 합니다.
		
		참고) setTimeout함수 : https://developer.mozilla.org/ko/docs/Web/API/Window/setTimeout
	*/
	
	// 그림을 누르면 변환되면서 다음 그림을 출력하도록 조치
	// img_gal.onclick = function() {
	img_gal.onclick = () => {
		
		// 그림 갯수 한계치(11장)를 초과하면 다시 카운터(counter) 초기화(1)

		// if (count <= 10) {
		// 	count++;
		// } else {
		// 	count = 1;
		// }

		// TODO : 카운터 변수가 10 이하이면 증가, 아니면 1로 초기화 (삼항연산자)
		count <= 10 ? count++ : count = 1;
		
		// TODO : 아이디가 img_pad인 그림 태그를 (객체) 변수로 등록

		let img_file = `image/kimhongdo_${count}.png`;
		
		// TODO : 변환 효과 : 투명도
		img_gal.style.opacity = 0;		
		
		// setTimeout(function() {
		setTimeout(() => {
			
			// 변환(트랜지션) 효과
			// 참고) https://cssreference.io/property/transition/
			//      https://developer.mozilla.org/ko/docs/Web/CSS/transition
			
			// TODO : 변환 효과(transition)

			img_gal.style.transition = "opacity 0.7s 0.1s"
			img_gal.style.opacity = 1;			
			img_pad.src = img_file;
			
		}, 800);		
		
	} // onclick
	
} // onload