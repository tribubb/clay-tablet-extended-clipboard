rightClickHandler = function(){
  //Do your stuff over that selected context menu
};

chrome.contextMenus.create({
  title: "Bitly Short Link",
  contexts:["link","selection"],  // ContextType
  onclick: rightClickHandler // A callback function
});