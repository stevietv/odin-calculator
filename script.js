let inputValue = 0;
let displayValue = '';
let firstOperand = null;
let secondOperand = null;
let operator = null;
let decimalUsed = false;

const resultDisplay = document.querySelector('.result');



function addListeners() {

    // Add Listener for operand buttons
    const operandButtons = document.querySelectorAll('.operand');
    operandButtons.forEach(button => {
        button.addEventListener('click', () => { addOperand(button.value) })
    })

    // Add Listener for invert button
    document.querySelector('.invert').addEventListener('click', invertInput);

    // Add Listener for clear button
    document.querySelector('.clear').addEventListener('click', clearInput);
   
    // Add Listener for clear all button
    document.querySelector('.clearall').addEventListener('click', clearAll);

}

function updateDisplay(newInputValue) {
    if (newInputValue.length > 9 ) {
        newInputValue = parseFloat(newInputValue).toExponential(7);
    }
    resultDisplay.innerHTML = newInputValue;
}

function addOperand(operand) {

    displayValue += operand;
    inputValue = parseFloat(displayValue);

    if (operand === '.') {
        decimalUsed = true;
        document.querySelector('#buttonDecimal').disabled = true;
    }

    updateDisplay(displayValue);
}

function invertInput() {
    inputValue = -inputValue;
    displayValue = inputValue.toString();
    updateDisplay(displayValue);
}

function clearInput() {
    inputValue = 0;
    displayValue = '';
    decimalUsed = false;
    updateDisplay('0');
    document.querySelector('#buttonDecimal').disabled = false;
}

function clearAll() {
    clearInput();
    firstOperand = null;
    secondOperand = null;
    operator = null;
}

addListeners();

