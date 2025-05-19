window.onload = () => {

  // 팝업창 제어 process.

  // 1. 필요 변수 선언
  let popup = document.getElementById("popup");
  let btn = document.getElementById("btn");
  let closeBtn = document.getElementById("modal_close_btn");

  // 2. 동작
  // (1) 초기 상태 : 팝업창 은닉
  // id="popup" / class="modal"
  popup.style.visibility = 'hidden';

  // (2) 팝업창 오픈 버튼 작성 / 이벤트 처리
  document.body.innerHTML += '<button id="btn" type="button">버튼</button>';

  btn.onclick = () => {
      console.log("버튼 클릭");
      // 팝업창 보여주기
      popup.style.visibility = 'visible';
  }
  
  // (3) 팝업창 닫기 / 이벤트 처리
  // - 우상단 X버튼 클릭시 => 팝업창 닫기

  closeBtn.onclick = () => {
      console.log("X 클릭");
      // 팝업창 숨기기
      popup.style.visibility = 'hidden';
  }
}