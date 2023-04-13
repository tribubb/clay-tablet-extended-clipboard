chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'show-main-context',
    title: 'Right-click Clipboard paste options',
  });

  chrome.contextMenus.create({
    id: 'show-second-context',
    title: 'Right-click Clipboard paste options 2',
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  console.log("Example action")
});