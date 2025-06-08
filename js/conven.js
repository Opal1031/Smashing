// conven.js

// 클릭한 match의 텍스트를 오른쪽 상위 match에 복사
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.match').forEach(match => {
        match.addEventListener('click', () => {
            const nextId = match.dataset.next;

            if (!nextId)
                return;

            const nextMatch = document.getElementById(nextId);
            
            if (nextMatch) {
                nextMatch.textContent = match.textContent;
            }
        });
    });
});
