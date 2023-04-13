rightClickHandler = function(){
  //Do your stuff over that selected context menu
};

chrome.contextMenus.create({
  id: "show-menu-tridly"
  title: "Tridly Short Link",
  contexts:["link","selection"],  // ContextType
  onclick: rightClickHandler // A callback function
});