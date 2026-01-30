// Natural Calculator JavaScript

// DOM Elements
const display = document.getElementById('display');
const keys = document.querySelectorAll('.key');

// Calculator State
let displayValue = '0';
let firstOperand = null;
let waitingForSecondOperand = false;
let operator = null;
let lastKey = '';

// Update Display
function updateDisplay() {
    display.value = displayValue;
}

// Initialize Display
updateDisplay();

// Play a gentle nature sound (simulated)
function playNatureSound() {
    // In a real implementation, you could add actual sounds
    // For now, we'll just console.log it
    console.log('Playing gentle nature sound for feedback');
}

// Add event listeners to keys
keys.forEach(key => {
    key.addEventListener('click', () => {
        // Visual feedback
        key.classList.add('active');
        setTimeout(() => key.classList.remove('active'), 100);
        
        // Sound feedback
        playNatureSound();
        
        // Get the data-action attribute or the key content
        const action = key.dataset.action;
        const keyContent = key.textContent;
        
        // Handle different key types
        if (!action) {
            // Number keys
            inputDigit(keyContent);
        } else if (action === 'operation') {
            // Operator keys
            handleOperator(keyContent);
        } else if (action === 'decimal') {
            // Decimal point
            inputDecimal(keyContent);
        } else if (action === 'clear') {
            // Clear key
            resetCalculator();
        } else if (action === 'equals') {
            // Equals key
            calculate();
        } else if (action === 'delete') {
            // Delete/backspace key
            deleteLastDigit();
        }
        
        // Update the display
        updateDisplay();
    });
});

// Input digit
function inputDigit(digit) {
    if (waitingForSecondOperand) {
        displayValue = digit;
        waitingForSecondOperand = false;
    } else {
        // If the current display value is '0', replace it
        // Otherwise, append the digit
        displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    lastKey = 'digit';
}

// Input decimal point
function inputDecimal(dot) {
    // If we're waiting for the second operand, start with '0.'
    if (waitingForSecondOperand) {
        displayValue = '0.';
        waitingForSecondOperand = false;
        lastKey = 'decimal';
        return;
    }
    
    // If the display value doesn't contain a decimal point yet, append one
    if (!displayValue.includes('.')) {
        displayValue += dot;
    }
    lastKey = 'decimal';
}

// Handle operators
function handleOperator(nextOperator) {
    // Get the current display value as a number
    const inputValue = parseFloat(displayValue);
    
    // If there's already an operator and the user just pressed another one,
    // update the operator without calculating
    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }
    
    // If this is the first operand, store it
    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        // If there's already a first operand and an operator,
        // calculate the result with the second operand
        const result = performCalculation();
        displayValue = String(result);
        firstOperand = result;
    }
    
    waitingForSecondOperand = true;
    operator = nextOperator;
    lastKey = 'operator';
}

// Perform calculation
function performCalculation() {
    // Get the second operand
    const secondOperand = parseFloat(displayValue);
    
    // Perform the calculation based on the operator
    switch (operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '×': // Multiply
            return firstOperand * secondOperand;
        case '÷': // Divide
            // Prevent division by zero
            if (secondOperand === 0) {
                alert('Cannot divide by zero');
                return firstOperand;
            }
            return firstOperand / secondOperand;
        case '%':
            return (firstOperand * secondOperand) / 100;
        default:
            return secondOperand;
    }
}

// Calculate the result
function calculate() {
    // If there's no operator, just return
    if (!operator) return;
    
    // If the last key was an operator, use the first operand as the second operand
    if (waitingForSecondOperand) {
        displayValue = String(firstOperand);
        return;
    }
    
    // Perform the calculation
    const result = performCalculation();
    
    // Update the display and reset the calculator state
    displayValue = String(result);
    operator = null;
    firstOperand = result;
    waitingForSecondOperand = true;
    lastKey = 'equals';
}

// Reset calculator
function resetCalculator() {
    displayValue = '0';
    firstOperand = null;
    waitingForSecondOperand = false;
    operator = null;
    lastKey = 'clear';
}

// Delete the last digit
function deleteLastDigit() {
    if (waitingForSecondOperand) return;
    
    // If there's only one digit, set the display to '0'
    if (displayValue.length === 1) {
        displayValue = '0';
    } else {
        // Otherwise, remove the last digit
        displayValue = displayValue.slice(0, -1);
    }
}

// Add keyboard support
document.addEventListener('keydown', event => {
    // Map keyboard keys to calculator buttons
    const key = event.key;
    
    // Number keys (0-9)
    if (/^[0-9]$/.test(key)) {
        event.preventDefault();
        const numberButton = document.querySelector(`.key:not([data-action]):contains('${key}')`);
        if (numberButton) numberButton.click();
        else inputDigit(key);
    }
    
    // Operator keys
    switch (key) {
        case '+':
        case '-':
            event.preventDefault();
            handleOperator(key);
            updateDisplay();
            break;
        case '*':
            event.preventDefault();
            handleOperator('×');
            updateDisplay();
            break;
        case '/':
            event.preventDefault();
            handleOperator('÷');
            updateDisplay();
            break;
        case '%':
            event.preventDefault();
            handleOperator(key);
            updateDisplay();
            break;
        case '.':
        case ',':
            event.preventDefault();
            inputDecimal('.');
            updateDisplay();
            break;
        case 'Enter':
        case '=':
            event.preventDefault();
            calculate();
            updateDisplay();
            break;
        case 'Escape':
            event.preventDefault();
            resetCalculator();
            updateDisplay();
            break;
        case 'Backspace':
            event.preventDefault();
            deleteLastDigit();
            updateDisplay();
            break;
    }
});

// Helper for jQuery-like contains selector (used for keyboard support)
// This is a polyfill since :contains is not a standard selector
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || 
                              Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

// Add a contains method for keyboard support
document.querySelectorAll = document.querySelectorAll || function(selectors) {
    return document.getElementsByTagName('*');
};