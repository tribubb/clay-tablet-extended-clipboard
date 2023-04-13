// Listen for messages from the background script
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'contentScript') {
    // Handle messages from the background script here
    port.onMessage.addListener((message) => {
      // Handle messages from the background script here
    });
  }
});