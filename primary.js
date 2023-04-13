function generateContextMenuId() {
  return 'context-menu-' + Math.random().toString(36).substr(2, 10);
}

chrome.runtime.onInstalled.addListener(() => {
  // Create context menu item for all editable text input fields
  const mainContextMenuId = generateContextMenuId();
  chrome.contextMenus.create({
    id: mainContextMenuId,
    title: 'Right-click Clipboard paste options',
    contexts: ['editable']
  });

  // Create context menu item for all editable text input fields
  const secondContextMenuId = generateContextMenuId();
  chrome.contextMenus.create({
    id: secondContextMenuId,
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

/*// Remove the "Delete" context menu item when context menu is shown
chrome.contextMenus.onShown.addListener((info) => {
  // Remove the "Delete" context menu item
  chrome.contextMenus.remove('delete-context', () => {
    // Create a new context menu item for "Delete" option
    chrome.contextMenus.create({
      id: 'delete-context',
      title: 'Delete',
      parentId: info.menuItemId,
      contexts: ['editable'],
      onclick: (info, tab) => {
        // Handle "Delete" option click event here
        console.log('Delete clicked');
      }
    });
  });
});*/