chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'showNotification') {
      chrome.notifications.create(message.notificationId, message.options);
    }
  });