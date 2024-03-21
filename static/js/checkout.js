// Add your JavaScript code here
document.addEventListener("DOMContentLoaded", function () {
    const prevBtn = document.getElementById("prevMonth");
    const nextBtn = document.getElementById("nextMonth");
    const currentMonthDisplay = document.getElementById("currentMonth");
    const calendarBody = document.getElementById("calendarBody");

    let currentDate = new Date();

    prevBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    function renderCalendar() {
        calendarBody.innerHTML = "";
        const daysToShow = 7; // Show current date and next 6 days

        for (let i = 0; i < daysToShow; i++) {
            const date = new Date();
            date.setDate(currentDate.getDate() + i);

            const dateElement = document.createElement("div");
            dateElement.classList.add("date");
            dateElement.textContent = date.getDate();
            calendarBody.appendChild(dateElement);
        }

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        currentMonthDisplay.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    }

    renderCalendar();
});
