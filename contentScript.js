// contentScript.js

// Declare variables for third-party code
var chrome = chrome || {};
var isPasteEnabled = false;

document.addEventListener("DOMContentLoaded", function () {

    // Get the settings button element
    var settingsButton = document.querySelector("#settingsButton");

    // Add a click event listener to the add button
    settingsButton.addEventListener("click", function () {
        // Use the chrome.tabs.create method to create a new tab with the URL of your index.html page
        chrome.tabs.create({ url: "settings.html", active: true });
    });

    // Get the add button element
    var addButton = document.querySelector(".add-button");

    // Get the list element
    var listElement = document.querySelector(".list");

    var inputTextArray = [];

    const randomStrings = [];

    const retrievedBigString = localStorage.getItem('myBigString');

    var savedInputTextData = localStorage.getItem("inputTextData");
    if (savedInputTextData) {
        inputTextArray = JSON.parse(savedInputTextData); // Parse the JSON data into an array
    }

    // Retrieve the saved list data from localStorage
    var savedListData = localStorage.getItem("listData");

    function createInputFields() {
        if (savedListData) {
            var listItems = savedListData.split("</li>");
            listItems.pop();
            for (var i = 1; i < listItems.length; i++) {
                var listItemElement = document.createElement("li");
                listItemElement.className = "list-item";

                var containerElement = document.createElement("div");

                var inputElement = document.createElement("input");
                inputElement.type = "text";
                inputElement.value = inputTextArray[i - 1];

                // Create a copy button element
                var copyElement = document.createElement("button");
                copyElement.textContent = "Copy";
                copyElement.className = "copyclass";

                // Create a paste button element
                var pasteElement = document.createElement("button");
                pasteElement.textContent = "Paste";
                pasteElement.className = "pasteclass";

                var removeElement = document.createElement("button");
                removeElement.textContent = "Remove";
                removeElement.className = "removeclass";

                // Use a closure to capture the correct value of i for each iteration
                (function (index) {
                    removeElement.addEventListener("click", function () {
                        inputTextArray[index] = inputElement.value;
                        var containerElement = this.parentNode;
                        var listItemElement = containerElement.parentNode;
                        inputTextArray.splice(index, 1);
                        localStorage.setItem("inputTextData", JSON.stringify(inputTextArray));

                        if (listElement.contains(listItemElement)) {
                            inputElement.value = inputTextArray[index];
                            listElement.removeChild(listItemElement);
                            localStorage.setItem("listData", listElement.innerHTML);
                        }
                    });

                    inputElement.addEventListener("input", function () {
                        localStorage.setItem("inputTextData", JSON.stringify(inputTextArray));
                        randomStrings[index] = index;
                        const bigString = randomStrings.join(randomStrings[index] + ',');
                        localStorage.setItem('myBigString', bigString);
                        if (typeof this.value === "undefined") {
                            inputTextArray[index] = "";
                        } else {
                            inputTextArray[index] = this.value;
                        }
                    });

                    copyElement.addEventListener("click", function () {
                        // Get the parent container element
                        var containerElement = this.parentNode;

                        // Get the input element within the parent container
                        var inputElement = containerElement.querySelector("input[type='text']");

                        // Get the value of the input element
                        var inputValue = inputElement.value;

                        // Copy the value to the clipboard
                        navigator.clipboard.writeText(inputValue).then(function () {
                            console.log("Value copied to clipboard: " + inputValue);
                        }).catch(function (err) {
                            console.error("Unable to copy value to clipboard", err);
                        });
                    });

                    pasteElement.addEventListener("click", function () {
                        if (isPasteButtonEnabled) {
                            // Get the parent container element
                            var containerElement = this.parentNode;

                            // Get the input element within the parent container
                            var inputElement = containerElement.querySelector("input[type='text']");

                            // Read the text from the clipboard
                            navigator.clipboard.readText().then(function (text) {
                                // Set the value of the input element with the retrieved text
                                inputElement.value = text;
                                inputTextArray[index] = text; // Update the inputTextArray with the pasted text
                                localStorage.setItem("inputTextData", JSON.stringify(inputTextArray)); // Update localStorage with the updated inputTextArray
                            }).catch(function (err) {
                                console.error("Unable to read text from clipboard", err);
                            });
                        }
                    });
                })(i - 1); // Pass in the value of i - 1 to the closure

                containerElement.appendChild(inputElement);
                containerElement.appendChild(copyElement);

                if (isPasteEnabled) {
                    containerElement.appendChild(pasteElement);
                    console.log("Paste 1 working");
                }

                containerElement.appendChild(removeElement);

                listItemElement.appendChild(containerElement);

                listElement.appendChild(listItemElement);
            }
        }
    }

    chrome.storage.sync.get(['pasteCheckbox'], (result) => {
        const pasteCheckbox = result.pasteCheckbox;

        if (pasteCheckbox) {
            isPasteEnabled = true; // Enable the paste button
        }

        // Call the function to create input fields based on saved list data
        createInputFields();
    });

    // Add click event listener to the add button
    addButton.addEventListener("click", function () {
        // Create a new list item element
        var listItemElement = document.createElement("li");
        listItemElement.className = "list-item";

        // Create a container element to hold the input element and remove button
        var containerElement = document.createElement("div");

        // Create an input element
        var inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.value = "";

        // Create a copy button element
        var copyElement = document.createElement("button");
        copyElement.textContent = "Copy";
        copyElement.className = "copyclass";

        // Create a paste button element
        var pasteElement = document.createElement("button");
        pasteElement.textContent = "Paste";
        pasteElement.className = "pasteclass";

        // Create a remove button element
        var removeElement = document.createElement("button");
        removeElement.textContent = "Remove";
        removeElement.className = "removeclass";

        // Get the index of the input element
        var index = inputTextArray.length;

        // Add click event listener to the remove button
        removeElement.addEventListener("click", function () {
            // Get the parent container element
            var containerElement = this.parentNode;

            // Get the parent list item element
            var listItemElement = containerElement.parentNode;

            // Update the corresponding element in the inputTextArray
            inputTextArray.splice(index, 1); // Remove the element at the index

            // Save the updated input text data to localStorage
            localStorage.setItem("inputTextData", JSON.stringify(inputTextArray)); // Convert array to JSON string and save to localStorage

            // Make sure listItemElement is a child of listElement
            if (listElement.contains(listItemElement)) {
                // Remove the list item element from the list
                listElement.removeChild(listItemElement);

                // Save the updated list data to localStorage
                localStorage.setItem("listData", listElement.innerHTML);
            }
        });

        // Add click event listener to the copy button
        copyElement.addEventListener("click", function () {
            // Get the input element value
            var inputValue = inputElement.value;

            // Copy the input value to clipboard
            navigator.clipboard.writeText(inputValue)
        });

        // Add click event listener to the paste button
        pasteElement.addEventListener("click", function () {
            if (isPasteButtonEnabled) {
                // Get the parent container element
                var containerElement = this.parentNode;

                // Get the input element within the parent container
                var inputElement = containerElement.querySelector("input[type='text']");

                // Read the text from the clipboard
                navigator.clipboard.readText().then(function (text) {
                    // Set the value of the input element with the retrieved text
                    inputElement.value = text;
                    inputTextArray[index] = text; // Update the inputTextArray with the pasted text
                    localStorage.setItem("inputTextData", JSON.stringify(inputTextArray)); // Update localStorage with the updated inputTextArray
                }).catch(function (err) {
                    console.error("Unable to read text from clipboard", err);
                });
            }
        });

        // Add input event listener to the input element
        inputElement.addEventListener("input", function () {
            // Update the corresponding element in the inputTextArray
            inputTextArray[index] = this.value;

            // Save the updated input text data to localStorage
            localStorage.setItem("inputTextData", JSON.stringify(inputTextArray)); // Convert array to JSON string and save to localStorage

            // Update the corresponding element in the randomStrings array
            randomStrings[index] = this.value;
            const bigString = randomStrings.join(",");
            localStorage.setItem("myBigString", bigString);
        });

        // Push the new input value into the inputTextArray and randomStrings array
        inputTextArray.push("");
        randomStrings.push("");

        // Append the input element and button element to the container element
        containerElement.appendChild(inputElement);
        containerElement.appendChild(copyElement);

        if (isPasteEnabled) {
            containerElement.appendChild(pasteElement);
            console.log("Paste 2 working");
        }

        containerElement.appendChild(removeElement);

        // Append the container element to the list item element
        listItemElement.appendChild(containerElement);

        // Append the list item element to the list
        listElement.appendChild(listItemElement);

        // Save the updated list data to localStorage
        localStorage.setItem("listData", listElement.innerHTML);
    });
});
