'use strict';

// CONSTANTS --------------------------------- //

const DIV_CONTENT = document.getElementById('div-content');

// VARIABLES --------------------------------- //

let numberOfTexts = 2;

// ARRAYS ------------------------------------ //

let textValues = new Array(numberOfTexts);
let textStyles = new Array(numberOfTexts);

// SETUP FUNCTIONS --------------------------- //

function start() {
    createTexts();
    showTexts();
}

function createTexts() {
    textValues[0] = 'Assistant Bunny';
    textValues[1] = '';

    textStyles[0] = 'h1';
    textStyles[1] = 'p';
}

function showTexts() {
    DIV_CONTENT.innerHTML = '';
    for (let i = 0; i < numberOfTexts; i++) {
        DIV_CONTENT.innerHTML +=
        '<' + textStyles[i] + ' contenteditable id="' + i +'" onkeydown="onKeyDown(event)" onkeyup="onKeyUp(event)">' + textValues[i] + '</' + textStyles[i] + '>';
    }
}

// ONKEYDOWN FUNCTIONS ----------------------- //

// Called onkeydown
function onKeyDown(event) {
    let key = event.key

    if (document.getElementById(getId(0)) == '' && key == 'Backspace' && getId(0) != '0') {
        removeText();
    }
    else if (key == 'Enter') {
        addParagraph();
    }
}

function removeText() {
    numberOfTexts--;

    // Updates the array
    textValues = pullArray(textValues, Number(getId(0)));
    textStyles = pullArray(textStyles, Number(getId(0)));

    // Shows texts
    showTexts();

    // Adds a space to the end of the previous text
    document.getElementById(getId(-1)).innerText += ' ';

    // Puts cursor in the previous text
    placeCursor(getId(-2))
}

function addParagraph() {
    numberOfTexts++

    textValues[Number(getId(2))] = ''
    textStyles[Number(getId(2))] = ''

    // Updates the array
    textValues = pushArray(textValues, getId(1), '');
    textStyles = pushArray(textStyles, getId(1), 'p');

    let id = getId(1);

    // Shows texts and values
    showTexts();
    
    // Places the cursor in the new text
    placeCursor(id);
}

// ONKEYUP FUNCTIONS ------------------------- //

function onKeyUp(event) {
    // Gets the key that was pressed
    let key = event.key

    // If the enter key was pressed, remove the line that it adds
    if (key == 'Enter') {
        document.getElementById(getId(0)).innerText = '';
    }

    saveTexts();
}

function saveTexts() {
    for (let i = 0; i < numberOfTexts; i++) {
        textValues[i] = document.getElementById(i.toString()).innerText;
    }
}

// OTHER FUNCTIONS --------------------------- //

function getId(number) {
    let id = (Number(document.activeElement.id) + number).toString();

    if (Number(id) != 'NaN') {
        return id;
    }
    else {
        return (numberOfTexts - 1).toString();
    }
}

function placeCursor(id) {
    // Get the editable paragraph element
    let editableParagraph = document.getElementById(id);

    // Set the cursor at the beginning of the paragraph
    let range = document.createRange();
    let sel = window.getSelection();
    range.setStart(editableParagraph, 0);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
}

// Called for each array when a new text is added
// array parameter: original array that needs to get larger
// index parameter: index of the new element that will be added
// value parameter: string that will be added to the array
function pushArray(array, index, value) {
    // Makes a new array 1 element larger
    let largerArray = new Array(numberOfTexts);

    // Adds old array information to the larger array up to the index
    for (let i = 0; i < index; i++) {
        largerArray[i] = array[i];
    }

    // Adds old array information to the larger array after the index
    for (let i = index; i < numberOfTexts; i++) {
        largerArray[i + 1] = array[i];
    }

    largerArray[index] = value;

    // Return the larger array
    return largerArray;
}

// Called when an item is removed
// array parameter: original array that will become smaller
// index parameter: index of the item that will be removed
function pullArray(array, index) {
    // Makes new array 1 element smaller
    let smallerArray = new Array(numberOfTexts);

    // Adds array information up to the index into the array copy
    for (let i = 0; i < index; i++) {
        smallerArray[i] = array[i];
    }

    // Adds higher array information after the index into the array copy
    for (let i = index; i < numberOfTexts; i++) {
        smallerArray[i - 1] = array[i];
    }

    return smallerArray;
}