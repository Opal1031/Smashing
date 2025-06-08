// home_calendar.js

// DOM이 로드되면 달력 기능 실행
document.addEventListener('DOMContentLoaded', () => {
    const calendarContainer = document.querySelector('.calendar-placeholder');

    // 달력 아래에 행사 리스트를 표시할 영역 생성
    const eventListContainer = document.createElement('div');
    eventListContainer.className = 'event-list';
    calendarContainer.after(eventListContainer); // 캘린더 아래에 삽입

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

            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

            // 해당 날짜에 등록된 이벤트들
            const eventsOnDate = calendarEvents.filter(e => e.date === dateStr);

            // 클래스 구성: 오늘 / 정기훈련 / 일반행사
            let tdClass = isToday ? 'today' : '';

            if (eventsOnDate.some(e => e.type === 'event'))
                tdClass += ' event-dot';
            if (eventsOnDate.some(e => e.type === 'training'))
                tdClass += ' training-dot';

            html += `<td class="${tdClass.trim()}" data-date="${dateStr}">${d}</td>`;

            if ((firstDay + d) % 7 === 0)
                html += '</tr><tr>';
        }

        html += '</tr></tbody></table>';
        
        calendarContainer.innerHTML = html;

        // 이전 달 버튼 클릭 시
        document.getElementById('prevMonth').onclick = () => {
            current.setMonth(current.getMonth() - 1);
            renderCalendar(current);
            clearEvents();
        };

        // 다음 달 버튼 클릭 시
        document.getElementById('nextMonth').onclick = () => {
            current.setMonth(current.getMonth() + 1);
            renderCalendar(current);
            clearEvents();
        };

        // 날짜 클릭 시 해당 날짜의 이벤트 표시
        document.querySelectorAll('.calendar-table td[data-date]').forEach(td => {
            td.onclick = () => {
                const clickedDate = td.getAttribute('data-date');
                const events = calendarEvents.filter(event => event.date === clickedDate);

                renderEventList(events, clickedDate);
            };
        });
    }

    // 이벤트 리스트 출력 함수
    function renderEventList(events, dateStr) {
        if (events.length === 0) {
            eventListContainer.innerHTML = `
                <h4>${dateStr}</h4>
                <ul>
                    <li>행사 없음</li>
                </ul>
            `;
        } else {
            eventListContainer.innerHTML = `<h4>${dateStr}</h4>` +
                events.map(e => `<h4>• ${e.title}</h4>`).join('');
        }
    }

    // 달력 이동 시 기존 이벤트 목록 초기화
    function clearEvents() {
        eventListContainer.innerHTML = '';
    }

    // 최초 렌더링
    renderCalendar(current);

    // 기본 상태에서는 오늘 날짜의 이벤트 출력
    const todayStr = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`;
    const todayEvents = calendarEvents.filter(event => event.date === todayStr);
    renderEventList(todayEvents, todayStr);
});