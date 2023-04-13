chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'hoge',
    title: 'Get Background Image',
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  console.log("Example action")
});