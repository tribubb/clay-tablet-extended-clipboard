// settingsScript.js

document.addEventListener("DOMContentLoaded", function () {
    var pastetoggleButton = document.querySelector(".pastetoggleclass");

    pastetoggleButton.addEventListener("click", function () {
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