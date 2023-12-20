document.addEventListener('DOMContentLoaded', function () {
    const countdownElement = document.getElementById('countdown');
    const countdownForm = document.getElementById('countdownForm');
    const setCountdownButton = document.getElementById('setCountdown');
    const datetimeInput = document.getElementById('datetime');
  
    let targetDate;
  
    // Check if the chrome object is available (indicating it's running in a Chrome extension)
    console.log(chrome);
    if (typeof chrome !== 'undefined' && chrome.storage) {
      // Load target date from storage on extension startup
      chrome.storage.sync.get(['targetDate'], function (result) {
        targetDate = result.targetDate || 0;
        updateCountdown();
      });
  
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
        const inputDateTime = datetimeInput.value;
        targetDate = new Date(inputDateTime).getTime();
  
        // Save target date to storage
        chrome.storage.sync.set({ 'targetDate': targetDate });
  
        updateCountdown();
      }
  
      setCountdownButton.addEventListener('click', setTargetDate);
  
      // Update the countdown every second
      setInterval(updateCountdown, 1000);
    } else {
      // Fallback behavior if not running in a Chrome extension context
      console.error('This code should be run as a Chrome extension.');
    }
  });