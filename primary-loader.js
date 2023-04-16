// primary-loader.js

chrome.runtime.connect({name: 'popup'});

// Establish a connection with the content script
chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
  const tabId = tabs[0].id;
  chrome.tabs.sendMessage(tabId, {action: 'establishPortConnection'});
});