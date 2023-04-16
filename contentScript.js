// contentScript.js

document.addEventListener("DOMContentLoaded", function () {
    // Get the add button element
    var addButton = document.querySelector(".add-button");

    // Get the list element
    var listElement = document.querySelector(".list");

    var inputTextArray = [];

    const randomStrings = [];

    // Retrieve the big string from localStorage
    const retrievedBigString = localStorage.getItem('myBigString');

    // Split the big string into individual small strings


    var savedInputTextData = localStorage.getItem("inputTextData");
    if (savedInputTextData) {
        inputTextArray = JSON.parse(savedInputTextData); // Parse the JSON data into an array
    }

    // Retrieve the saved list data from localStorage
    var savedListData = localStorage.getItem("listData");


    // If saved list data exists, set it as the textContent of the list-score element
    if (retrievedBigString) {
        const smallStrings = retrievedBigString.split(',');
        document.getElementById("listScore").textContent = retrievedBigString;
    }

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

                var buttonElement = document.createElement("button");
                buttonElement.textContent = "Remove";

                // Use a closure to capture the correct value of i for each iteration
                (function (index) {
                    buttonElement.addEventListener("click", function () {
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
                        inputTextArray[index] = this.value;
                        localStorage.setItem("inputTextData", JSON.stringify(inputTextArray));
                        randomStrings[index] = index;
                        const bigString = randomStrings.join(randomStrings[index] + ',');
                        localStorage.setItem('myBigString', bigString);
                    });
                })(i - 1); // Pass in the value of i - 1 to the closure

                containerElement.appendChild(inputElement);
                containerElement.appendChild(buttonElement);

                listItemElement.appendChild(containerElement);

                listElement.appendChild(listItemElement);
            }
        }
    }

    // Call the function to create input fields based on saved list data
    createInputFields();

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

        // Create a button element
        var buttonElement = document.createElement("button");
        buttonElement.textContent = "Remove";

        // Add click event listener to the remove button
        buttonElement.addEventListener("click", function () {
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

        // Add input event listener to the input element
        inputElement.addEventListener("input", function () {
            // Get the index of the input element
            var index = Array.from(this.parentNode.parentNode.children).indexOf(this.parentNode);

            // Update the corresponding element in the inputTextArray
            inputTextArray[index] = this.value;

            // Save the updated input text data to localStorage
            localStorage.setItem("inputTextData", JSON.stringify(inputTextArray)); // Convert array to JSON string and save to localStorage
        });

        // Append the input element and button element to the container element
        containerElement.appendChild(inputElement);
        containerElement.appendChild(buttonElement);

        // Append the container element to the list item element
        listItemElement.appendChild(containerElement);

        // Append the list item element to the list
        listElement.appendChild(listItemElement);

        // Save the updated list data to localStorage
        localStorage.setItem("listData", listElement.innerHTML);
        });
    });