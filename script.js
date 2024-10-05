let inputValue = 0;
let displayValue = '';
let firstOperand = null;
let secondOperand = null;
let operator = null;
let decimalUsed = false;
let justCalculated = false;

const operandButtons = document.querySelectorAll('.operand');
const operatorButtons = document.querySelectorAll('.operator');

function addListeners() {

    // Add Listener for operand buttons
    operandButtons.forEach(button => {
        button.addEventListener('click', () => { addOperand(button.value) })
    })

    operatorButtons.forEach(button => {
        button.addEventListener('click', () => { chooseOperator(button) })
    })

    // Add Listener for invert button
    document.querySelector('.invert').addEventListener('click', invertInput);

    // Add Listener for clear button
    document.querySelector('.clear').addEventListener('click', clearInput);

    // Add Listener for clear all button
    document.querySelector('.clearall').addEventListener('click', clearAll);

    // Add Listener for equals button
    document.querySelector('.equals').addEventListener('click', calculate);


}

function updateDisplay(newInputValue) {
    let resultDisplay = document.querySelector('.result');
    if (newInputValue.length > 9) {
        newInputValue = parseFloat(newInputValue).toExponential(7);
    }
    resultDisplay.innerHTML = newInputValue;
}

function addOperand(operand) {

    if (justCalculated) {
        clearInput();
        justCalculated = false;
    }

    if (operand == '0' && displayValue == '' || displayValue == '0') {
        displayValue = operand;
    }
    else {
        displayValue += operand;
    }
    
    inputValue = parseFloat(displayValue);

    if (operand === '.') {
        decimalUsed = true;
        document.querySelector('#buttonDecimal').disabled = true;
    }

    updateDisplay(displayValue);
}

function chooseOperator(button) {
    if (operator != null) {
        calculate();
    }
    resetOperators();
    button.classList.add('activeOperator');
    operator = button.value;
    if (displayValue != '' && firstOperand == null) {
        firstOperand = inputValue;
    }
    else if (displayValue != '') {
        secondOperand = inputValue;
    }
    if (!justCalculated) {
        clearInput();
        justCalculated = false;
    }
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
    resetOperators();
}

function calculate() {
    if (secondOperand == null && displayValue == '' || operator == null) {
        return;
    }

    secondOperand = inputValue;
    let result = 0;
    switch (operator) {
        case '+':
            result = add(firstOperand, secondOperand);
            break;
        case '-':
            result = subtract(firstOperand, secondOperand);
            break;
        case '*':
            result = multiply(firstOperand, secondOperand);
            break;
        case '/':
            result = divide(firstOperand, secondOperand);
            break;
        default:
            break;
    }

    firstOperand = result;
    secondOperand = null;
    displayValue = firstOperand.toString();
    inputValue = firstOperand;
    updateDisplay(displayValue);
    justCalculated = true;
    resetOperators();
}

function resetOperators() {
    operatorButtons.forEach(button => button.classList.remove('activeOperator'));
    operator = null;
}

function add(firstOperand, secondOperand) {
    return (firstOperand + secondOperand).toFixed(9) * 1;
}

function subtract(firstOperand, secondOperand) {
    return (firstOperand - secondOperand).toFixed(9) * 1;
}

function multiply(firstOperand, secondOperand) {
    return (firstOperand * secondOperand).toFixed(9) * 1;
}

function divide(firstOperand, secondOperand) {
    return (firstOperand / secondOperand).toFixed(9) * 1;
}

addListeners();

