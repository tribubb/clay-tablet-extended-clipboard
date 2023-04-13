// Register an event listener for the contextmenu event on text boxes
document.addEventListener('contextmenu', function(event) {
  var target = event.target;
  if (target.tagName === 'INPUT' && target.type === 'text') {
    // Create a custom context menu
    var contextMenu = document.createElement('ul');
    contextMenu.id = 'myContextMenu';
    contextMenu.style.position = 'absolute';
    contextMenu.style.background = 'white';
    contextMenu.style.padding = '5px';
    contextMenu.style.border = '1px solid #ccc';

    // Create a menu item for "Paste"
    var menuItem = document.createElement('li');
    menuItem.textContent = 'Paste';
    menuItem.style.cursor = 'pointer';
    menuItem.addEventListener('click', function() {
      // Paste "hello" into the text box
      target.value = 'hello';
      // Hide the context menu
      contextMenu.style.display = 'none';
    });

    // Append the menu item to the context menu
    contextMenu.appendChild(menuItem);

    // Position the context menu near the right-click event
    contextMenu.style.left = event.clientX + 'px';
    contextMenu.style.top = event.clientY + 'px';

    // Append the context menu to the DOM
    document.body.appendChild(contextMenu);

    // Prevent the default context menu from showing
    event.preventDefault();

    // Close the context menu when clicking outside of it
    document.addEventListener('click', function() {
      contextMenu.style.display = 'none';
    });
  }
});