document.addEventListener('DOMContentLoaded', function () {
    const countdownElement = document.getElementById('countdown');
    const setCountdownButton = document.getElementById('setCountdown');
    const removeCountdownButton = document.getElementById('removeCountdown');
    const datetimeInput = document.getElementById('datetime');
    const labelInput = document.getElementById('label');
  
    let targetDates = [];
    // An array that will store our different desired dates. 
  
    // Check if the chrome object is available (indicating it's running in a Chrome extension)
    if (typeof chrome !== 'undefined' && chrome.storage) {
      // Load target dates from storage on extension startup --> allows us to keep our dates
      chrome.storage.sync.get(['targetDates'], function (result) {
        targetDates = result.targetDates || [];
        updateCountdown();
      });
  
      function updateCountdown() {
        let html = '';
        //line of text used to show our countdown data. 
  
        for (let i = 0; i < targetDates.length; i++) {
          const currentDate = new Date().getTime();
          const timeDifference = targetDates[i].date - currentDate;
          //Updates each individual countdown by subtracting the current time. 
  
          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
          const label = targetDates[i].label || 'Unnamed';
          // Stores the label name of our given times. 
          
          if ((days == 0)) {
            if ((hours == 0)) {
              html += `<div class="test"><strong>${label}:</strong><br> <div class="cdColourR"> ${days}d ${hours}h ${minutes}m ${seconds}s </div></div>`;
              continue;
            }
            html += `<div class="test"><strong>${label}:</strong><br> <div class="cdColourY"> ${days}d ${hours}h ${minutes}m ${seconds}s </div></div>`;
            continue;
          } 
          else {
            html += `<div class="test"><strong>${label}:</strong><br> <div class="cdColourW"> ${days}d ${hours}h ${minutes}m ${seconds}s </div></div>`;
          } 
          // Prints the TIME using HTML tags in different colours depending on their urgency. 
        }
  
        countdownElement.innerHTML = html;
      }
  
      function setTargetDate() {
        const inputDateTime = datetimeInput.value;
        const newTargetDate = new Date(inputDateTime).getTime();
        const label = labelInput.value;
  
        // Save new target date and label to the array in storage
        targetDates.push({ date: newTargetDate, label: label });
        chrome.storage.sync.set({ 'targetDates': targetDates });
  
        updateCountdown();
      }
  
      function removeTargetDate() {
        const labelToRemove = labelInput.value;
  
        // Remove the specified date from the array
        targetDates = targetDates.filter(date => date.label !== labelToRemove);
        chrome.storage.sync.set({ 'targetDates': targetDates });
  
        updateCountdown();
      }
  
      setCountdownButton.addEventListener('click', setTargetDate);
      removeCountdownButton.addEventListener('click', removeTargetDate);
  
      // Update the countdown every second
      setInterval(updateCountdown, 1000);
    } else {
      // Fallback behavior if not running in a Chrome extension context
      console.error('This code should be run as a Chrome extension.');
    }
  });