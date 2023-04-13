// primary-loader.js

// Establish a connection with the content script
const port = chrome.runtime.connect({name: "contentScript"});

// Listen for messages from the content script
port.onMessage.addListener((message) => {
  // Handle messages from the content script here
});

try 
{
  importScripts('primary.js');
} 
catch (e) 
{
  console.error(e);
}