
// References for different elements that will be accessed in the HTML script 

let targetDates = [];
// An array that will store our different desired dates - uses objects with labels and time values.

// Check if the chrome object is available (indicating it's running in a Chrome extension)
if (typeof chrome !== 'undefined' && chrome.storage) {

  function updateCountdown() {
    // Load target dates from storage on extension startup --> allows us to keep our dates
    chrome.storage.sync.get(['targetDates'], function (result) {
    targetDates = result.targetDates || [];
  });
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
    }
  }


  // Update the countdown every second and pull quote each ti
  setInterval(updateCountdown, 1000);
} 
else 
{
  // Ensures running within extension window.
  console.error('This code should be run as a Chrome extension.');
}