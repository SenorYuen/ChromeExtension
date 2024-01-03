document.addEventListener('DOMContentLoaded', function () {
    const countdownElement = document.getElementById('countdown');
    const setCountdownButton = document.getElementById('setCountdown');
    const removeCountdownButton = document.getElementById('removeCountdown');
    const datetimeInput = document.getElementById('datetime');
    const labelInput = document.getElementById('label');
    const quoteElement = document.getElementById('quote');
    // References for different elements that will be accessed in the HTML script 
  
    let targetDates = [];
    // An array that will store our different desired dates - uses objects with labels and time values.
  
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
          
          //notification for 1 day
          if ((days == 1) && (hours == 0) && (minutes == 0) && (seconds == 0)) {
            const newNotif = '1D' + targetDates[i].label;
            chrome.notifications.create(newNotif, {
              type: 'basic',
              title: '1 Day To Go!',
              message: 'Your event \"' + label + '\" will happen in 1 day.',
              iconUrl: 'logo.png',
              priority: 0
            });
          }

          //notification for 1 hour
          if ((days == 0) && (hours == 1) && (minutes == 0) && (seconds == 0)) {
            const newNotif = '1H' + targetDates[i].label;
            chrome.notifications.create(newNotif, {
              type: 'basic',
              title: '1 Hour To Go!',
              message: 'The event \"' + label + '\" will happen in 1 hour! Be sure to finish it if you haven\'t already.',
              iconUrl: 'logo.png',
              priority: 0
            });
          }

          if ((days == 0)) {
            if ((hours == 0)) {
              html += `<div class="test"><strong>${label}:</strong><br> <div class="cdColourR"> ${days}d ${hours}h ${minutes}m ${seconds}s </div></div>`;
              continue;
            }
            html += `<div class="test"><strong>${label}:</strong><br> <div class="cdColourY"> ${days}d ${hours}h ${minutes}m ${seconds}s </div></div>`;
            continue;
          }
          if ((days <= 7) && (days >= 1)) {
            html += `<div class="test"><strong>${label}:</strong><br> <div class="cdColourG"> ${days}d ${hours}h ${minutes}m ${seconds}s </div></div>`;
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
        
        // Avoids redundant labels.
        for (i = 0; i < targetDates.length; i++) {
          if (targetDates[i].label == label) {
            chrome.notifications.create('INVALIDLABEL', {
              type: 'basic',
              title: 'Invalid Entry',
              message: 'Cannot have two list items with the same label',
              iconUrl: 'logo.png',
              priority: 0
            });
            return;
          }
          else {
            continue;
          }
        }

        // Save new target date and sort it within the array.
        targetDates.push({ date: newTargetDate, label: label });
        targetDates.sort(function(a, b) {
          return a.date - b.date;
        });
        // Save using the Chrome storage API.
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


      function pullRandomQuote() {
        // Get the URL of a file named defaultFile.txt in the extension's package
        var fileURL = chrome.runtime.getURL('quoteArchive.txt');

        // fethcing file URL is like using iostream in C i think.
        fetch(fileURL)
          .then(response => response.text())
          .then(content => {
        
          // sorta like using getline in C, except this is an array that has EVERY line.
          var lines = content.split('\n');
          var fileLen = lines.length;
          
          let randomQuoteIndex = Math.floor((Math.random() * fileLen));
          quoteElement.innerHTML = lines[randomQuoteIndex];
          
      });
      }
  
      setCountdownButton.addEventListener('click', setTargetDate);
      removeCountdownButton.addEventListener('click', removeTargetDate);
  
      // Update the countdown every second and pull quote each ti
      setInterval(updateCountdown, 1000);
      pullRandomQuote();
    } 
    else 
    {
      // Ensures running within extension window.
      console.error('This code should be run as a Chrome extension.');
    }
  });