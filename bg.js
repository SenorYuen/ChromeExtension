chrome.runtime.sendMessage('', {
    type: 'notification',
    options: {
      title: 'title',
      message: 'message',
      iconUrl: 'logo.png',
      type: 'basic'
    }
  });