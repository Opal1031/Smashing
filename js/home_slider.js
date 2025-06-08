// home_slider.js

// 문서가 모두 로드되면 슬라이더 기능 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 모든 슬라이드 이미지(.slide)와 페이지 점(.dot) 요소 수집
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let current = 0; // 현재 보여지는 슬라이드 인덱스

    // 특정 인덱스의 슬라이드와 점을 활성화
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index); // 선택한 슬라이드만 보이게
            dots[i].classList.toggle('active', i === index); // 해당 dot도 활성화
        });

        current = index; // 현재 인덱스 갱신
    }

    // 다음 슬라이드로 자동 전환
    function showNextSlide() {
        let next = (current + 1) % slides.length; // 마지막 다음은 처음으로
        showSlide(next);
    }

    // 4초마다 자동으로 다음 슬라이드 보여주기
    setInterval(showNextSlide, 4000);

    // dot 클릭 시 해당 슬라이드로 전환
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.dataset.index); // 클릭한 dot의 인덱스 가져오기
            showSlide(index); // 해당 슬라이드 표시
        });
    });
});