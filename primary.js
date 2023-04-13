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
  // Handle context menu click event here
  if (info.menuItemId === 'show-main-context') 
  {
    console.log('Example action for show-main-context');
  } 
  else if (info.menuItemId === 'show-second-context')
  {
    console.log('Example action for show-second-context');
  }
});

chrome.contextMenus.onShown.addListener((info) => {
  // Create a new context menu item for "Delete" option
  chrome.contextMenus.create({
    id: 'delete-context',
    title: 'Delete',
    parentId: info.menuItemId, // Set parentId to the currently shown menu item
    contexts: ['editable'],
    onclick: (info, tab) => {
      // Handle "Delete" option click event here
      console.log('Delete clicked');
    }
  });
});