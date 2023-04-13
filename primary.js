chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'show-main-context',
    title: 'Right-click Clipboard paste options',
    contexts: ['editable']
  });

  chrome.contextMenus.create({
    id: 'show-second-context',
    title: 'Right-click Clipboard paste options 2',
    contexts: ['editable']
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  console.log("Example action")
});