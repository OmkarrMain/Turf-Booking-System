document.addEventListener('DOMContentLoaded', function () {
    const timeSlots = document.querySelector('.time-selection');
    const totalTimeElement = document.querySelector('.total-time');
    const totalAmountElement = document.querySelector('.total-amount');
    let selectedSlots = [];

    // Generate time slots
    for (let i = 9; i <= 21; i++) {
        const slot = document.createElement('div');
        slot.classList.add('time-slot');
        slot.textContent = `${i}:00 AM`;
        slot.addEventListener('click', function () {
            if (selectedSlots.length < 3) {
                this.classList.toggle('selected');
                if (this.classList.contains('selected')) {
                    selectedSlots.push(i);
                } else {
                    selectedSlots = selectedSlots.filter(slot => slot !== i);
                }
                updateTotal();
            }
        });
        timeSlots.appendChild(slot);
    }

    function updateTotal() {
        const totalTime = selectedSlots.length;
        const totalAmount = totalTime * 10; // Assuming $10 per hour
        totalTimeElement.textContent = `Total Time: ${totalTime} hours`;
        totalAmountElement.textContent = `Total Amount: $${totalAmount}`;
    }
});
