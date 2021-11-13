const numBtns = document.querySelectorAll('.num');
const operatorBtns = document.querySelectorAll('.operator');
const display = document.querySelector('.display');
const clearBtn = document.querySelector('#clear')
const equalsBtn = document.querySelector('#equals');
const decimalBtn = document.querySelector('#decimal');
const deleteBtn = document.querySelector('#delete');
let displayValue = '';
let x = '';
let y = '';
let currentOperator = null;
let shouldResetScreen = false;

numBtns.forEach(number => {
    number.addEventListener('click', () => {
        if (shouldResetScreen) {
            resetDisplay();
            shouldResetScreen = false;
        }

        displayValue += number.id;
        if (displayValue.length > 9) {
            displayValue = displayValue.substring(0, 9);
            display.textContent = displayValue;
        }
        else {
            display.textContent = displayValue;
        }
    });
});

operatorBtns.forEach(operator => {
    operator.addEventListener('click', () => {
        x = displayValue;
        shouldResetScreen = true;
        currentOperator = operator.textContent;
    });
});

function addDecimal() {
    if (shouldResetScreen) {
        resetDisplay();
    }

    if (displayValue.includes('.')) {
        return;
    }

    displayValue += '.';
    display.textContent = displayValue;
}

function resetDisplay() {
    displayValue = '';
    display.textContent = displayValue;
}

function clearDisplay() {
    displayValue = '';
    currentOperator = null;
    shouldResetScreen = false;
    display.textContent = 0;
}

function equals() {
    if (currentOperator === null) {
        return;
    }
    y = displayValue;
    display.textContent = round(operate(currentOperator, x, y));
    displayValue = '';
    currentOperator = null;
}

function round(num) {
    if (String(num).length > 9) {
        if (String(num).includes(".")) {
            return Math.round(num * 1e8) / 1e8;
        }

        num = num.toExponential();

        if (num.length > 10) {
            return num.substring(0, 7) + num.substring(10);
        }
        return num;
    }

    if (String(num).includes(".")) {
        return Math.round(num * 1e9) / 1e9;
    }

    return num;
}

function operate (operator, x, y) {
    x = parseFloat(x);
    y = parseFloat(y);

    switch (operator) {
        case '+':
            return x + y;
        case '-':
            return x - y;
        case '×':
            return x * y;
        case '÷':
            if (y == 0) {
                return 'Error';
            }
            else {
                return x / y;
            }
        default:
            return null;
    }
}

function backspace() {
    displayValue = displayValue.slice(0, -1);
    display.textContent = displayValue;
}

clearBtn.addEventListener('click', clearDisplay);
equalsBtn.addEventListener('click', equals);
decimalBtn.addEventListener('click', addDecimal);
deleteBtn.addEventListener('click', backspace);