// home_calendar.js

// DOM이 로드되면 달력 기능 실행
document.addEventListener('DOMContentLoaded', () => {
    const calendarContainer = document.querySelector('.calendar-placeholder');
    let current = new Date(); // 현재 날짜 기준으로 시작

    // 달력 렌더링 함수
    function renderCalendar(date) {
        const year = date.getFullYear();     // 연도
        const month = date.getMonth();       // 월 (0부터 시작)
        const firstDay = new Date(year, month, 1).getDay();         // 해당 월 1일의 요일
        const lastDate = new Date(year, month + 1, 0).getDate();    // 해당 월의 마지막 날짜

        // 달력 상단: 이전/다음 버튼 + 월 표시
        let html = '<div class="calendar-header">';

        html += `<button id="prevMonth">◀</button>`;
        html += `<span>${year}년 ${month + 1}월</span>`;
        html += `<button id="nextMonth">▶</button>`;
        html += '</div>';

        // 달력 테이블 생성
        html += '<table class = "calendar-table">';
        html += '<thead><tr><th>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th></tr></thead><tbody><tr>';

        // 빈 칸 출력 (1일 전 요일까지)
        for (let i = 0; i < firstDay; i++)
            html += '<td></td>';

        // 날짜 출력
        for (let d = 1; d <= lastDate; d++) {
            const isToday =
                d === new Date().getDate() &&
                month === new Date().getMonth() &&
                year === new Date().getFullYear();

            html += `<td${isToday ? ' class="today"' : ''}>${d}</td>`;

            // 한 줄이 끝나면 다음 줄로
            if ((firstDay + d) % 7 === 0)
                html += '</tr><tr>';
        }

        html += '</tr></tbody></table>';
        calendarContainer.innerHTML = html;

        // 이전 달 버튼 클릭 시
        document.getElementById('prevMonth').onclick = () => {
            current.setMonth(current.getMonth() - 1);
            renderCalendar(current);
        };

        // 다음 달 버튼 클릭 시
        document.getElementById('nextMonth').onclick = () => {
            current.setMonth(current.getMonth() + 1);
            renderCalendar(current);
        };
    }

    // 최초 렌더링
    renderCalendar(current);
});