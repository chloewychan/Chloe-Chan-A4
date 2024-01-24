'use strict';

// CONSTANTS --------------------------------- //

const DIV_PAGES = document.getElementById('div-pages');
const DIV_TEXTS = document.getElementById('div-texts');
const DIV_FILTERS = document.getElementById('div-filters');

// VARIABLES --------------------------------- //

let numberOfPages = 1;
let currentPage = 0;
let currentId = '0';

// ARRAYS ------------------------------------ //

let numberOfTexts = new Array(numberOfPages);
let textValueArrays = new Array(numberOfPages);
let textStyleArrays = new Array(numberOfPages);
let boldStyleArrays = new Array(numberOfPages);
let underlineStyleArrays = new Array(numberOfPages);
let italicStyleArrays = new Array(numberOfPages);

// SETUP FUNCTIONS --------------------------- //

// Called onload
function start() {
    createArrays();
    showPages();
    showTexts();

    // Hides filter div
    DIV_FILTERS.hidden = true;
}

// Adds to arrays with the text values and text styles
function createArrays() {
    numberOfTexts[0] = 2;

    textValueArrays[0] = new Array(numberOfTexts[currentPage]);
    textStyleArrays[0] = new Array(numberOfTexts[currentPage]);
    boldStyleArrays[0] = new Array(numberOfTexts[currentPage]);
    underlineStyleArrays[0] = new Array(numberOfTexts[currentPage]);
    italicStyleArrays[0] = new Array(numberOfTexts[currentPage]);

    textValueArrays[currentPage][0] = 'New Page';
    textValueArrays[currentPage][1] = 'Text';

    textStyleArrays[currentPage][0] = 'h1';
    textStyleArrays[currentPage][1] = 'p';

    boldStyleArrays[currentPage][0] = true;
    boldStyleArrays[currentPage][1] = false;

    underlineStyleArrays[currentPage][0] = false;
    underlineStyleArrays[currentPage][1] = false;

    italicStyleArrays[currentPage][0] = false;
    italicStyleArrays[currentPage][1] = false;
}

// Called to put the information from the arrays to the texts
function showTexts() {
    showPages();

    // Clears the div
    DIV_TEXTS.innerHTML = '';

    // Goes through the arrays
    for (let i = 0; i < numberOfTexts[currentPage]; i++) {
        // Adds the tags using the styles and values
        DIV_TEXTS.innerHTML +=
        '<' + textStyleArrays[currentPage][i] + ' contenteditable id="' + i +'" onkeydown="onKeyDown(event)" onkeyup="onKeyUp(event)" onBlur="setId(' + i + ');">' + textValueArrays[currentPage][i] + '</' + textStyleArrays[currentPage][i] + '>';
        
        if (boldStyleArrays[currentPage][i] == true) {
            document.getElementById(i.toString()).style.fontWeight = '700';
        }
        else if (boldStyleArrays[currentPage][i] == false) {
            document.getElementById(i.toString()).style.fontWeight = '400';
        }
        if (underlineStyleArrays[currentPage][i] == true) {
            document.getElementById(i.toString()).style.textDecorationLine = 'underline';
        }
        else if (underlineStyleArrays[currentPage][i] == false) {
            document.getElementById(i.toString()).style.textDecorationLine = 'none';
        }
        if (italicStyleArrays[currentPage][i] == true) {
            document.getElementById(i.toString()).style.fontStyle = 'italic';
        }
        else if (italicStyleArrays[currentPage][i] == false) {
            document.getElementById(i.toString()).style.fontStyle = 'normal';
        }
    }
}

// Called to put the information from the arrays into page title buttons
function showPages() {
    // Clears the div
    DIV_PAGES.innerHTML = '';

    // Goes through the arrays
    for (let i = 0; i < numberOfPages; i++) {
        // Adds buttons
        DIV_PAGES.innerHTML +=
        '<button type="button" class="pagesButton" onclick="currentPage = ' + i + '; showTexts();">' + textValueArrays[i][0] + '</button>';
    }
}

// Called to set the current id before the active id changes from clicking a button
function setId(id) {
    currentId = id;
}

// MENU BAR FUNCTIONS ----------------------- //

// Called to create a new page
function newPage() {
    // Increases the number of pages
    numberOfPages++;

    // Makes the current page the index of the new page
    currentPage = numberOfPages - 1;

    // Adds information to the new page array elements
    numberOfTexts[currentPage] = 2;
    textValueArrays[currentPage] = ['New Page', 'Text'];
    textStyleArrays[currentPage] = ['h1', 'p'];
    boldStyleArrays[currentPage] = [true, false];
    underlineStyleArrays[currentPage] = [false, false];
    italicStyleArrays[currentPage] = [false, false];

    // Updates pages and texts
    showPages();
    showTexts();
}

// Called when the filters div should be hidden or unhidden
function filter() {
    // If the filters are hidden, unhide them
    if (DIV_FILTERS.hidden == true) {
        DIV_FILTERS.hidden = false;
    }
    // If the filters are unhidden, hide them
    else if (DIV_FILTERS.hidden == false) {
        DIV_FILTERS.hidden = true;
    }
}

// Called when the Longest to Shortest filter button is clicked
function longToShort() {
    // Creates a new array
    let textLengths = new Array(textValueArrays.length);

    // Adds the length of all the texts into the array
    // Goes through the pages
    for (let i = 0; i < textValueArrays.length; i++) {
        // Creates a new variable
        let number = 0;

        // Goes through the texts in the current page
        for (let k = 0; k < numberOfTexts[k]; k++) {
            // Adds the length of the current text to the number variable
            number += textValueArrays[i][k].length;
        }

        // Adds the number into the current element of the array
        textLengths[i] = number;
    }

    // Goes through indexes of except the last one
    for (let i = 0; i < textLengths.length - 1; i++) {
        // Assumes the first index is the largest
        let indexOfLargest = i;

        // Goes through indexes after the current index
        for (let k = i + 1; k < textLengths.length; k++) {
            // Checks if current element is larger than than the current largest

            if (textLengths[k] > textLengths[indexOfLargest]) {
                // If a larget number is found, keep it
                indexOfLargest = k;
            }
        }

        // Stores the sorted values in the array
        storeArray(textValueArrays, i, indexOfLargest);
        storeArray(textStyleArrays, i, indexOfLargest);
        storeArray(boldStyleArrays, i, indexOfLargest);
        storeArray(underlineStyleArrays, i, indexOfLargest);
        storeArray(italicStyleArrays, i, indexOfLargest);
    }

    // Updates the product list and filter visibility
    showPages();
    filter();
}

// Called when the Shortest to Longest filter button is clicked
function shortToLong() {
    // Creates a new array
    let textLengths = new Array(textValueArrays.length);

    // Adds the length of all the texts into the array
    // Goes through the pages
    for (let i = 0; i < textValueArrays.length; i++) {
        // Creates a new variable
        let number = 0;

        // Goes through the texts in the current page
        for (let k = 0; k < numberOfTexts[k]; k++) {
            // Adds the length of the current text to the number variable
            number += textValueArrays[i][k].length;
        }

        // Adds the number into the current element of the array
        textLengths[i] = number;
    }

    // Goes through indexes of except the last one
    for (let i = 0; i < textLengths.length - 1; i++) {
        // Assumes the first index is the smallest
        let indexOfSmallest = i;

        // Goes through indexes after the current index
        for (let k = i + 1; k < textLengths.length; k++) {
            // Checks if current element is smaller than than the current smallest

            if (textLengths[k] < textLengths[indexOfSmallest]) {
                // If a smaller number is found, keep it
                indexOfSmallest = k;
            }
        }

        // Stores the sorted values in the array
        storeArray(textValueArrays, i, indexOfSmallest);
        storeArray(textStyleArrays, i, indexOfSmallest);
        storeArray(boldStyleArrays, i, indexOfSmallest);
        storeArray(underlineStyleArrays, i, indexOfSmallest);
        storeArray(italicStyleArrays, i, indexOfSmallest);
    }

    // Updates the product list and filter visibility
    showPages();
    filter();
}

// Called when arrays are being sorted
function storeArray(array, i, index) {
    // Stores the first temporarily before swapping the smallest element in
    let temp = array[i];
    array[i] = array[index];
    array[index] = temp;
}

// ONKEYDOWN FUNCTIONS ----------------------- //

// Called onkeydown
// event parameter: gets the key that was pressed
function onKeyDown(event) {
    // Gets the key that was pressed
    let key = event.key;

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
    numberOfTexts[currentPage]--;

    // Extracts the text from the array
    textValueArrays[currentPage] = pullArray(textValueArrays[currentPage], Number(id0));
    textStyleArrays[currentPage] = pullArray(textStyleArrays[currentPage], Number(id0));
    boldStyleArrays[currentPage] = pullArray(boldStyleArrays[currentPage], Number(id0));
    italicStyleArrays[currentPage] = pullArray(italicStyleArrays[currentPage], Number(id0));
    underlineStyleArrays[currentPage] = pullArray(underlineStyleArrays[currentPage], Number(id0));
    
    // Adds a character to the end of the previous text so the backspace won't delete
    textValueArrays[currentPage][Number(idn1)] += '.';

    // Shows texts
    showTexts();

    // Puts cursor in the previous text
    placeCursor(idn1);
}

// Called when the enter key is pressed
function addText(style) {
    // Increases number of texts
    numberOfTexts[currentPage]++;

    // Sets the id of the next text to prevent it from changing
    let id = getId(1);

    // Inserts a new text in the array
    textValueArrays[currentPage] = pushArray(textValueArrays[currentPage], id, '');
    textStyleArrays[currentPage] = pushArray(textStyleArrays[currentPage], id, style);

    let bold;
    if (style.replaceAll('h', '').length != style.length) {
        bold = true;
    }
    else {
        bold = false;
    }

    boldStyleArrays[currentPage] = pushArray(boldStyleArrays[currentPage], id, bold);
    italicStyleArrays[currentPage] = pushArray(italicStyleArrays[currentPage], id, false);
    underlineStyleArrays[currentPage] = pushArray(underlineStyleArrays[currentPage], id, false);

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
    let key = event.key;

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
    for (let i = 0; i < numberOfTexts[currentPage]; i++) {
        textValueArrays[currentPage][i] = document.getElementById(i.toString()).innerText;
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
        boldStyleArrays[currentPage][Number(currentId)] = false;
    }
    // If the font weight is normal, make the font weight bold
    else if (getComputedStyle(currentText).fontWeight == '400') {
        currentText.style.fontWeight = '700';
        boldStyleArrays[currentPage][Number(currentId)] = true;
    }

    // Place the cursor back in the text
    placeCursor(currentId);
}

function underline() {
    let currentText = document.getElementById(currentId);

    // If the text decoration is underlined, remove the text decoration
    if (getComputedStyle(currentText).textDecorationLine == 'underline') {
        currentText.style.textDecorationLine = 'none';
        underlineStyleArrays[currentPage][Number(currentId)] = false;
    }
    // If there is no text decoration, make the text decoration underlined
    else if (getComputedStyle(currentText).textDecorationLine == 'none') {
        currentText.style.textDecorationLine = 'underline';
        underlineStyleArrays[currentPage][Number(currentId)] = true;
    }

    // Place the cursor back in the text
    placeCursor(currentId);
}

function italic() {
    let currentText = document.getElementById(currentId);

    // If the font style is italic, make the font style normal
    if (getComputedStyle(currentText).fontStyle == 'italic') {
        currentText.style.fontStyle = 'normal';
        italicStyleArrays[currentPage][Number(currentId)] = false;
    }
    // If the font style is normal, make the font style italic
    else if (getComputedStyle(currentText).fontStyle == 'normal') {
        currentText.style.fontStyle = 'italic';
        italicStyleArrays[currentPage][Number(currentId)] = true;
    }

    // Place the cursor back in the text
    placeCursor(currentId);
}

function lowerCase() {
    // Turns the string to lower case
    textValueArrays[currentPage][Number(currentId)] = textValueArrays[currentPage][Number(currentId)].toLowerCase();

    // Updates the array information to the texts
    showTexts();

    // Place the cursor back in the text
    placeCursor(currentId);
}

function upperCase() {
    // Turns the string to upper case
    textValueArrays[currentPage][Number(currentId)] = textValueArrays[currentPage][Number(currentId)].toUpperCase();

    // Updates the array information to the texts
    showTexts();

    // Place the cursor back in the text
    placeCursor(currentId);
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

    // Adds the text to the array
    textValueArrays[currentPage][Number(currentId)] = text;

    // Updates the array information to the texts
    showTexts();

    // Place the cursor back in the text
    placeCursor(currentId);
}