document.addEventListener('DOMContentLoaded', function () {
    const countdownElement = document.getElementById('countdown');
    const countdownForm = document.getElementById('countdownForm');
    const setCountdownButton = document.getElementById('setCountdown');

    let targetDate;

    function updateCountdown() {
        const currentDate = new Date().getTime();
        const timeDifference = targetDate - currentDate;
    
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
        countdownElement.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }

    function setTargetDate() {
        const inputDateTime = document.getElementById('datetime').value;
        targetDate = new Date(inputDateTime).getTime();
        updateCountdown();
    }

    setCountdownButton.addEventListener('click', setTargetDate);

    // Update the countdown every second
    setInterval(updateCountdown, 1000);
});