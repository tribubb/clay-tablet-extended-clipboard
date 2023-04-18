// settingsScript.js

document.addEventListener("DOMContentLoaded", function () {
    // Get the add button element
    var pastetoggleButton = document.querySelector(".pastetoggleclass");

    // Add click event listener to the paste button
    pastetoggleButton.addEventListener("click", function () {
        // Read the text from the clipboard
        navigator.clipboard.readText().then(function (text) {
            console.log("Paste now working with clipboard content: " + text);
        }).catch(function (err) {
            console.error("Unable to read text from clipboard", err);
        });
    });

    var checkbox = document.querySelector('#pasteCheckbox');

    checkbox.addEventListener('change', () => {
        // Retrieve the value of the pasteCheckbox key from storage
        chrome.storage.sync.get('pasteCheckbox', function (result) {
            // If the key exists, update the value; otherwise, create a new key-value pair
            var newValue = {};
            newValue['pasteCheckbox'] = checkbox.checked;
            if (result.hasOwnProperty('pasteCheckbox')) {
                chrome.storage.sync.set(newValue);
            } else {
                chrome.storage.sync.set(newValue, function () {
                    console.log('Value for pasteCheckbox was saved to Chrome storage.');
                });
            }
        });
    });

    // Retrieve the value of the pasteCheckbox key from storage and set the checkbox state accordingly
    chrome.storage.sync.get('pasteCheckbox', function (result) {
        if (result.hasOwnProperty('pasteCheckbox')) {
            checkbox.checked = result.pasteCheckbox;
        } else {
            checkbox.checked = false;
        }
    });
});