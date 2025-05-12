window.addEventListener("load", () => {

    let boardPnl = document.querySelectorAll(".board-pnl")[0];

    console.log("boardPnl :", boardPnl);

    // 백단에서 전송된 게시글 목록 데이터(json 형태의 데이터)라고 가정(전제)
    // json : https://www.json.org/json-ko.html
    // JSON 객체 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/JSON
    let jsons = [
                 {"boardNum":"30", "boardTitle":"웹기술을 공부합시다.", "boardWriter":"퍼블리션", 
                  "boardWriteDate":"2025.5.12 10:11:12", "boardReadCount":"123", "boardRecommCount":"3"},
                 {"boardNum":"40", "boardTitle":"웹기술을 공부합시다.", "boardWriter":"퍼블리션", 
                  "boardWriteDate":"2025.5.12 10:20:32", "boardReadCount":"80", "boardRecommCount":"50"},
                 {"boardNum":"50", "boardTitle":"웹기술을 공부합시다.", "boardWriter":"퍼블리션", 
                  "boardWriteDate":"2025.5.12 11:25:05", "boardReadCount":"5", "boardRecommCount":"10"}
                ];

    console.log("첫번째 boardNum:", jsons[0].boardNum);

    for (let json of jsons) {

        let boardContent = `<!-- 게시글 목록(한줄) -->
                            <div class="board-row">

                                <!-- 체크박스 -->
                                <div class="board-check">                
                                    <input type="checkbox" id="board-check-${json.boardNum}" name="board-check-${json.boardNum}" />
                                </div>
                                <!--// 체크박스 -->

                                <!-- 게시글 번호 -->
                                <div class="board-num">
                                   ${json.boardNum}
                                </div>
                                <!--// 게시글 번호 -->

                                <!-- 게시글 제목 -->
                                <div class="board-title">
                                    ${json.boardTitle}
                                </div>
                                <!--// 게시글 제목 -->

                                <!-- 게시글 작성자 -->
                                <div class="board-writer">
                                    ${json.boardWriter}
                                </div>
                                <!--// 게시글 작성자 -->

                                <!-- 게시글 작성일 -->
                                <div class="board-write-date">
                                    ${json.boardWriteDate}
                                </div>
                                <!--// 게시글 작성일 -->

                                <!-- 게시글 조회수 -->
                                <div class="board-read-count">
                                    ${json.boardReadCount}
                                </div>
                                <!--// 게시글 조회수 -->            

                                <!-- 게시글 추천(좋아요) -->
                                <div class="board-recomm-count">
                                    ${json.boardRecommCount}
                                </div>
                                <!--// 게시글 추천(좋아요) -->

                            </div>
                            <!--// 게시글 목록(한줄) -->
                        `;
    
        // console.log("boardPnl.innerHTML :", boardPnl.innerHTML)
        boardPnl.innerHTML += boardContent;
    } // for

});