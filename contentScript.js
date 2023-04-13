// Listen for messages from the background script
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'popup') {
    // Handle messages received from the background script
    port.onMessage.addListener((message) => {
      if (message.action === 'pasteText') {
        // Paste text logic here
        console.log('Paste text logic in contentScript.js');
      }
    });
  }
});