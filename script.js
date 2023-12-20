document.addEventListener('DOMContentLoaded', function () {
    const countdownElement = document.getElementById('countdown');
  
    // Set the target date (replace with your desired date and time)
    const targetDate = new Date('December 31, 2023 23:59:59').getTime();
  
    function updateCountdown() {
      const currentDate = new Date().getTime();
      const timeDifference = targetDate - currentDate;
  
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
      countdownElement.innerText = `${minutes}m ${seconds}s`;
    }
  
    // Update the countdown every second
    setInterval(updateCountdown, 1000);
  
    // Initial update
    updateCountdown();
  });