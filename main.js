'use strict';

// CONSTANTS --------------------------------- //

const DIV_CONTENT = document.getElementById('div-content');

// VARIABLES --------------------------------- //

let numberOfTexts = 2;
let timer;
let currentId = '0';

// ARRAYS ------------------------------------ //

let textValues = new Array(numberOfTexts);
let textStyles = new Array(numberOfTexts);
let boldStyles = new Array(numberOfTexts);
let underlineStyles = new Array(numberOfTexts);
let italicStyles = new Array(numberOfTexts);

// SETUP FUNCTIONS --------------------------- //

// Called onload
function start() {
    createTexts();
    showTexts();

    timer = setInterval(setId, 1);
}

// Adds to arrays with the text values and text styles
function createTexts() {
    textValues[0] = 'Assistant Bunny';
    textValues[1] = '';

    textStyles[0] = 'h1';
    textStyles[1] = 'p';
}

// Called to put the information from the array to the texts
function showTexts() {
    // Clears the div
    DIV_CONTENT.innerHTML = '';

    // Goes through the arrays
    for (let i = 0; i < numberOfTexts; i++) {
        // Adds the tags using the styles and values
        DIV_CONTENT.innerHTML +=
        '<' + textStyles[i] + ' contenteditable id="' + i +'" onkeydown="onKeyDown(event)" onkeyup="onKeyUp(event)">' + textValues[i] + '</' + textStyles[i] + '>';
        
        if (boldStyles[i] == true) {
            document.getElementById(i.toString()).style.fontWeight = '700';
        }
        if (underlineStyles[i] == true) {
            document.getElementById(i.toString()).style.textDecorationLine = 'underline';
        }
        if (italicStyles[i] == true) {
            document.getElementById(i.toString()).style.fontStyle = 'italic';
        }
    }
}

function setId() {
    currentId = document.activeElement.id
}

// ONKEYDOWN FUNCTIONS ----------------------- //

// Called onkeydown
// event parameter: gets the key that was pressed
function onKeyDown(event) {
    // Gets the key that was pressed
    let key = event.key

    // If the text is empty, the backspace key was pressed, and it isn't the first textbox, remove the text
    if (document.getElementById(getId(0)).innerText == '' && key == 'Backspace' && getId(0) != '0') {
        removeText();
    }
    // If the enter key is pressed, add a paragraph
    else if (key == 'Enter') {
        addText('p');
    }
}

// Called when the backspace key is pressed and the text is empty
function removeText() {
    // Sets the previous and current id to prevent them from changing
    let idn1 = getId(-1);
    let id0 = getId(0);

    // Decreases the number of texts
    numberOfTexts--;

    // Extracts the text from the array
    textValues = pullArray(textValues, Number(id0));
    textStyles = pullArray(textStyles, Number(id0));
    
    // Adds a character to the end of the previous text so the backspace won't delete
    textValues[Number(idn1)] += '.';

    // Shows texts
    showTexts();

    // Puts cursor in the previous text
    placeCursor(idn1)
}

// Called when the enter key is pressed
function addText(style) {
    // Increases number of texts
    numberOfTexts++

    // Sets the id of the next text to prevent it from changing
    let id = getId(1);

    // Inserts a new text in the array
    textValues = pushArray(textValues, id, '');
    textStyles = pushArray(textStyles, id, style);

    // Shows the updated texts and values
    showTexts();
    
    // Places the cursor in the new text
    placeCursor(id);
}

// ONKEYUP FUNCTIONS ------------------------- //

// Called onkeyup
// event parameter: gets the key that was pressed
function onKeyUp(event) {
    // Gets the key that was pressed
    let key = event.key

    // If the enter key was pressed, remove the line that it adds
    if (key == 'Enter') {
        document.getElementById(getId(0)).innerText = '';
    }

    // Saves the added information
    saveTexts();
}

// Called when there are changes in the texts (when keys are pressed)
function saveTexts() {
    // Goes through the arrays
    for (let i = 0; i < numberOfTexts; i++) {
        textValues[i] = document.getElementById(i.toString()).innerText;
    }
}

// OTHER FUNCTIONS --------------------------- //

// Called to find the id of the texts relative to where the cursor is
// number parameter: number added to the id that the cursor is in (e.g., -1 is the previous text, 0 is the current text, 1 is the next text, etc.)
function getId(number) {
    // Gets the id and adds the number in the parameter
    let id = (Number(document.activeElement.id) + number).toString();

    // If the id is not a number, return the id of the last text
    if (isNaN(Number(id)) == true) {
        return (Number(currentId) + 1).toString();
    }
    // If the id is a number, return the id
    else {
        return id;
    }
}

// Called when the cursor changes locations
// id parameter: the id of the text that the cursor will be placed in
function placeCursor(id) {
    // Get the editable paragraph element
    let editableParagraph = document.getElementById(id);

    // Set the cursor at the end of the paragraph
    let range = document.createRange();
    range.selectNodeContents(editableParagraph);
    range.collapse(false);

    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

// Called for each array when a new text is added
// array parameter: original array that needs to get larger
// index parameter: index of the new element that will be added
// value parameter: string that will be added to the array
function pushArray(array, index, value) {
    // Creates a new array
    let newArray = new Array(0);

    // Copies elements from the original array to the new array, up to the index
    for (let i = 0; i < index; i++) {
        newArray[newArray.length] = array[i];
    }

    // Adds the new value to the new array
    newArray[newArray.length] = value;

    // Copies the rest of the elements from the original array to the new array
    for (let i = index; i < array.length; i++) {
        newArray[newArray.length] = array[i];
    }

    // Return the new array
    return newArray;
}

// Called when an item is removed
// array parameter: original array that will become smaller
// index parameter: index of the item that will be removed
function pullArray(array, index) {
    // Creates a new array
    let newArray = new Array(0);

    // Copies elements from the original array to the new array, up to the index
    for (let i = 0; i < index; i++) {
        newArray[newArray.length] = array[i];
    }

    // Copies the rest of the elements from the original array to the new array
    for (let i = index + 1; i < array.length; i++) {
        newArray[newArray.length] = array[i];
    }

    // Return the new array
    return newArray;
}

// STYLE FUNCTIONS --------------------------- //

function bold() {
    let currentText = document.getElementById(currentId);

    // If the font weight is bold, make the font weight normal
    if (getComputedStyle(currentText).fontWeight == '700') {
        currentText.style.fontWeight = '400';
    }
    // If the font weight is normal, make the font weight bold
    else if (getComputedStyle(currentText).fontWeight == '400') {
        currentText.style.fontWeight = '700';
    }

    // Place the cursor back in the text
    placeCursor(currentId);

    // Start the timer
    timer = setInterval(setId, 1);
}

function underline() {
    let currentText = document.getElementById(currentId);

    // If the text decoration is underlined, remove the text decoration
    if (getComputedStyle(currentText).textDecorationLine == 'underline') {
        currentText.style.textDecorationLine = 'none';
        boldStyles[Number(currentId)] = false;
    }
    // If there is no text decoration, make the text decoration underlined
    else if (getComputedStyle(currentText).textDecorationLine == 'none') {
        currentText.style.textDecorationLine = 'underline';
        boldStyles[Number(currentId)] = true;
    }

    // Place the cursor back in the text
    placeCursor(currentId);

    // Start the timer
    timer = setInterval(setId, 1);
}

function italic() {
    let currentText = document.getElementById(currentId);

    // If the font style is italic, make the font style normal
    if (getComputedStyle(currentText).fontStyle == 'italic') {
        currentText.style.fontStyle = 'normal';
        underlineStyles[Number(currentId)] = false;
    }
    // If the font style is normal, make the font style italic
    else if (getComputedStyle(currentText).fontStyle == 'normal') {
        currentText.style.fontStyle = 'italic';
        underlineStyles[Number(currentId)] = true;
    }

    // Place the cursor back in the text
    placeCursor(currentId);

    // Start the timer
    timer = setInterval(setId, 1);
}

function lowerCase() {
    // Turns the string to lower case
    textValues[Number(currentId)] = textValues[Number(currentId)].toLowerCase();

    // Updates the array information to the texts
    showTexts();

    // Place the cursor back in the text
    placeCursor(currentId);

    // Start the timer
    timer = setInterval(setId, 1);
}

function upperCase() {
    // Turns the string to upper case
    textValues[Number(currentId)] = textValues[Number(currentId)].toUpperCase();

    // Updates the array information to the texts
    showTexts();

    // Place the cursor back in the text
    placeCursor(currentId);

    // Start the timer
    timer = setInterval(setId, 1);
}

function titleCase() {
    // Create current index variable used in the while loop
    let currentIndex = 0;

    // Save the inputted title in a variable (removed exess spaces and turned into lowercase)
    let text = document.getElementById(currentId).innerText.trim();

    // Capitalizes the first letter
    text = text.substring(0,1).toUpperCase() + text.substring(1, text.length);
    
    // While the current index is less than the length of the text, the current index equals the index of the next space
    while (currentIndex < text.length) {
        currentIndex = text.indexOf(' ', currentIndex + 1);

        // If there are still more spaces, the text equals the string before the current index + the capitalized letter after the current index + the rest of the string
        if (currentIndex != -1) {
            text = text.substring(0, currentIndex + 1) + text.substring(currentIndex + 1, currentIndex + 2).toUpperCase() + text.substring(currentIndex + 2, text.length);
        }
        // If there are no more spaces, the while loop breaks
        else {
            break;
        }
    }

    textValues[Number(currentId)] = text;

    showTexts();

    placeCursor(currentId);

    timer = setInterval(setId, 1);
}