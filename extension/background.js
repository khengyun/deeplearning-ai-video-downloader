chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'downloadVideo') {
      chrome.downloads.download({
          url: request.url,
          filename: request.filename
      }, downloadId => {
          if (chrome.runtime.lastError) {
              console.error('Download failed:', chrome.runtime.lastError.message);
              sendResponse({ success: false, message: chrome.runtime.lastError.message });
          } else {
              sendResponse({ success: true, downloadId: downloadId });
          }
      });
      return true; // Keep the message channel open for sendResponse
  }
});
