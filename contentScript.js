// contentScript.js

// Declare variables for code from 
var chrome = chrome || {};
var isPasteEnabled = false;

document.addEventListener("DOMContentLoaded", function () {

    var settingsButton = document.querySelector("#settingsButton");

    settingsButton.addEventListener("click", function () {
        chrome.tabs.create({ url: "settings.html", active: true });
    });

    var addButton = document.querySelector(".add-button");

    var listElement = document.querySelector(".list");

    // Update input fields' values and indices
    var inputElements = listElement.querySelectorAll("input[type='text']");

    var inputTextArray = [];

    const randomStrings = [];

    const retrievedBigString = localStorage.getItem('myBigString');

    var savedInputTextData = localStorage.getItem("inputTextData");
    if (savedInputTextData) {
        inputTextArray = JSON.parse(savedInputTextData);
    }

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

                var copyElement = document.createElement("button");
                copyElement.textContent = "Copy";
                copyElement.className = "copyclass";

                var pasteElement = document.createElement("button");
                pasteElement.textContent = "Paste";
                pasteElement.className = "pasteclass";

                var removeElement = document.createElement("button");
                removeElement.textContent = "Remove";
                removeElement.className = "removeclass";

                // Use a closure to capture the correct value of i for each iteration
                (function (index, inputElement) {
                    removeElement.addEventListener("click", function () {
                        var containerElement = this.parentNode;
                        var listItemElement = containerElement.parentNode;
                        var currentIndex = Array.prototype.indexOf.call(listElement.children, listItemElement);

                        inputTextArray.splice(currentIndex - 1, 1);
                        localStorage.setItem("inputTextData", JSON.stringify(inputTextArray));

                        if (listElement.contains(listItemElement)) {
                            inputElement.value = inputTextArray[currentIndex];
                            listElement.removeChild(listItemElement);
                            localStorage.setItem("listData", listElement.innerHTML);

                            // Remove existing event listeners
                            for (var j = currentIndex; j < listElement.children.length; j++) {
                                removeElement.removeEventListener("click", removeListItem);
                            }

                            // Add new event listeners
                            for (var k = currentIndex; k < listElement.children.length; k++) {
                                (function (index) {
                                    // Update the event listeners with the new index value
                                    removeElement.addEventListener("click", removeListItem);
                                })(k);
                            }
                        }
                        navigator.serviceWorker.register('background.js');

                        // Add the event listener in the service worker file (background.js)
                        self.addEventListener('fetch', function (event) {
                            if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
                                var historyTraversal = event.request.mode === 'navigate' && event.request.redirect === 'manual';
                                if (historyTraversal) {
                                    // Reload the page
                                    location.reload();
                                }
                            }
                        });

                        console.log(inputTextArray);
                        console.log(localStorage.getItem("inputTextData"));
                    });

                    function removeListItem() {
                        var containerElement = this.parentNode;
                        var listItemElement = containerElement.parentNode;
                        var currentIndex = Array.prototype.indexOf.call(listElement.children, listItemElement);

                        inputTextArray.splice(currentIndex, 1);
                        localStorage.setItem("inputTextData", JSON.stringify(inputTextArray));

                        if (listElement.contains(listItemElement)) {
                            inputElement.value = inputTextArray[currentIndex];
                            listElement.removeChild(listItemElement);
                            localStorage.setItem("listData", listElement.innerHTML);

                            // Update the inputTextArray and re-save to local storage
                            inputElements = listElement.querySelectorAll("input[type='text']");
                            inputTextArray = Array.from(inputElements).map(function (element) {
                                return element.value;
                            });
                            localStorage.setItem("inputTextData", JSON.stringify(inputTextArray));

                            // Update the event listeners with the new index value
                            removeElement.removeEventListener("click", removeListItem);
                            for (var k = 0; k < listElement.children.length; k++) {
                                (function (index) {
                                    removeElement.addEventListener("click", removeListItem);
                                })(k);
                            }
                        }
                    }

                    inputElement.addEventListener("input", function () {
                        randomStrings[index] = index;
                        const bigString = randomStrings.join(randomStrings[index] + ',');
                        if (typeof this.value === "undefined") {
                            inputTextArray[index] = "";
                        } else {
                            inputTextArray[index] = this.value;
                        }
                        localStorage.setItem("inputTextData", JSON.stringify(inputTextArray));
                        localStorage.setItem('myBigString', bigString);
                    });

                    copyElement.addEventListener("click", function () {
                        var containerElement = this.parentNode;

                        // Get the input element within the parent container
                        var inputElement = containerElement.querySelector("input[type='text']");

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
                            var containerElement = this.parentNode;

                            // Get the input element within the parent container
                            var inputElement = containerElement.querySelector("input[type='text']");

                            // Read the text from the clipboard
                            navigator.clipboard.readText().then(function (text) {
                                // Set the value of the input element with the retrieved text
                                inputElement.value = text;
                                inputTextArray[index] = text;
                                localStorage.setItem("inputTextData", JSON.stringify(inputTextArray));
                            }).catch(function (err) {
                                console.error("Unable to read text from clipboard", err);
                            });
                        }
                    });
                })(i - 1, inputElement);

                containerElement.appendChild(inputElement);
                containerElement.appendChild(copyElement);
                if (isPasteEnabled) {
                    containerElement.appendChild(pasteElement);
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
            isPasteEnabled = true;
        }

        createInputFields();
    });

    addButton.addEventListener("click", function () {
        var listItemElement = document.createElement("li");
        listItemElement.className = "list-item";

        var containerElement = document.createElement("div");

        var inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.value = "";

        var copyElement = document.createElement("button");
        copyElement.textContent = "Copy";
        copyElement.className = "copyclass";

        var pasteElement = document.createElement("button");
        pasteElement.textContent = "Paste";
        pasteElement.className = "pasteclass";

        var removeElement = document.createElement("button");
        removeElement.textContent = "Remove";
        removeElement.className = "removeclass";

        var index = inputTextArray.length;

        removeElement.addEventListener("click", function () {
            var containerElement = this.parentNode;

            var listItemElement = containerElement.parentNode;

            inputTextArray.splice(index, 1); 

            localStorage.setItem("inputTextData", JSON.stringify(inputTextArray));

            if (listElement.contains(listItemElement)) {
                listElement.removeChild(listItemElement);

                localStorage.setItem("listData", listElement.innerHTML);
            }
        });

        copyElement.addEventListener("click", function () {
            var inputValue = inputElement.value;

            navigator.clipboard.writeText(inputValue)
        });

        pasteElement.addEventListener("click", function () {
            if (isPasteButtonEnabled) {
                var containerElement = this.parentNode;

                var inputElement = containerElement.querySelector("input[type='text']");

                navigator.clipboard.readText().then(function (text) {
                    inputElement.value = text;
                    inputTextArray[index] = text;
                    localStorage.setItem("inputTextData", JSON.stringify(inputTextArray));
                }).catch(function (err) {
                    console.error("Unable to read text from clipboard", err);
                });
            }
        });

        inputElement.addEventListener("input", function () {
            inputTextArray[index] = this.value;

            localStorage.setItem("inputTextData", JSON.stringify(inputTextArray));

            randomStrings[index] = this.value;
            const bigString = randomStrings.join(",");
            localStorage.setItem("myBigString", bigString);
        });

        // Push the new input value into the inputTextArray and randomStrings array
        inputTextArray.push("");
        randomStrings.push("");

        containerElement.appendChild(inputElement);
        containerElement.appendChild(copyElement);

        if (isPasteEnabled) {
            containerElement.appendChild(pasteElement);
            console.log("Paste 2 working");
        }

        containerElement.appendChild(removeElement);
        listItemElement.appendChild(containerElement);
        listElement.appendChild(listItemElement);

        localStorage.setItem("listData", listElement.innerHTML);
    });
});

window.addEventListener("beforeunload", function () {
    // Update inputTextArray with the current input element values
    var inputElements = document.querySelectorAll(".list-item input[type='text']");
    inputTextArray = Array.from(inputElements).map(function (input) {
        return input.value;
    });

    localStorage.setItem("inputTextData", JSON.stringify(inputTextArray));
});