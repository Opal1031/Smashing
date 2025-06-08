// notices.js

// 공지사항 제목(.notice-title)을 클릭하면 내용 영역을 펼치거나 접음
document.addEventListener('DOMContentLoaded', () => {
    // 모든 공지사항 제목 요소에 대해 반복
    document.querySelectorAll('.notice-title').forEach(title => {
        // 제목 클릭 시
        title.addEventListener('click', () => {
            const item = title.parentElement; // .notice-item 요소
            item.classList.toggle('open');    // open 클래스 토글 → 내용 표시/숨김
        });
    });
});
