// gallery.js

/* 사진 확대 */
document.addEventListener("DOMContentLoaded", function () {
    // 모달 요소와 이미지, 닫기 버튼을 가져옴
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const closeBtn = document.getElementById("closeBtn");

    // 갤러리의 모든 이미지에 클릭 이벤트 추가
    document.querySelectorAll(".gallery-item img").forEach(img => {
        img.addEventListener("click", () => {

        // 클릭한 이미지를 모달에 표시
            modal.style.display = "block";
            modalImg.src = img.src;
        });
    });

    // 닫기 버튼 클릭 시 모달 숨기기
    closeBtn.onclick = function () {
        modal.style.display = "none";
    };

    // 모달 영역 외 클릭 시 모달 숨기기
    modal.onclick = function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    };
});

/* 페이지 넘김 */
document.addEventListener('DOMContentLoaded', () => {
    const itemsPerPage = 6; // 페이지 당 아이템 수
    let currentPage = 1; // 현재 페이지 번호

    const items = Array.from(document.querySelectorAll('.gallery-item')); // 모든 캘러리 아이템
    const totalPages = Math.ceil(items.length / itemsPerPage); // 전체 페이지 수 계산

    const prevBtn = document.getElementById('prevBtn'); // 이전 버튼
    const nextBtn = document.getElementById('nextBtn'); // 다음 버튼
    const pageNumbers = document.getElementById('pageNumbers'); // 페이지 번호 표시 영역

    // 주어진 페이지에 해당하는 아이템만 표시
    function showPage(page) {
        items.forEach((item, index) => {
            const start = (page - 1) * itemsPerPage;
            const end = page * itemsPerPage;

        item.style.display = (index >= start && index < end) ? 'flex' : 'none';
    });

        currentPage = page; // 현재 페이지 업데이트
        renderPagination(); // 페이지 번호 다시 렌더링
    }

    // 페이지 번호 및 이전/다음 버튼 상태 렌더링
    function renderPagination() {
        pageNumbers.innerHTML = ''; // 기존 번호 제거
    
        for (let i = 1; i <= totalPages; i++) {
            const span = document.createElement('span');

            span.textContent = i;
            span.style.margin = '0 5px';
            span.style.cursor = 'pointer';

            if (i === currentPage)
                span.style.fontWeight = 'bold'; // 현재 페이지 강조

            span.onclick = () => showPage(i); // 페이지 번호 클릭 시 해당 페이지로 이동

            pageNumbers.appendChild(span);
        }

        // 이전/다음 버튼 활성화 여부 설정
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
    }

    // 이진 버튼 클릭 시
    prevBtn.onclick = () => {
        if (currentPage > 1)
            showPage(currentPage - 1);
    };

    // 다음 버튼 클릭 시
    nextBtn.onclick = () => {
        if (currentPage < totalPages)
            showPage(currentPage + 1);
    };

    // 초기 페이지 표시
    showPage(currentPage);
});
