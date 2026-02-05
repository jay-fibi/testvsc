const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '0';
let previousValue = null;
let operator = null;
let shouldResetInput = false;

const updateDisplay = () => {
    display.textContent = currentInput;
};

const handleNumber = (value) => {
    if (shouldResetInput) {
        currentInput = '0';
        shouldResetInput = false;
    }

    if (value === '.' && currentInput.includes('.')) {
        return;
    }

    currentInput = currentInput === '0' && value !== '.' ? value : currentInput + value;
    updateDisplay();
};

const compute = (first, second, op) => {
    switch (op) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            return second === 0 ? null : first / second;
        default:
            return second;
    }
};

const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(currentInput);

    if (previousValue === null) {
        previousValue = inputValue;
    } else if (operator && !shouldResetInput) {
        const result = compute(previousValue, inputValue, operator);
        if (result === null) {
            currentInput = 'Error';
            previousValue = null;
            operator = null;
            updateDisplay();
            return;
        }
        previousValue = result;
        currentInput = `${parseFloat(result.toFixed(10))}`;
        updateDisplay();
    }

    operator = nextOperator;
    shouldResetInput = true;
};

const handleEquals = () => {
    if (!operator || previousValue === null) {
        return;
    }

    const inputValue = parseFloat(currentInput);
    const result = compute(previousValue, inputValue, operator);

    if (result === null) {
        currentInput = 'Error';
    } else {
        currentInput = `${parseFloat(result.toFixed(10))}`;
    }

    previousValue = null;
    operator = null;
    shouldResetInput = true;
    updateDisplay();
};

const toggleSign = () => {
    if (currentInput === '0' || currentInput === 'Error') {
        return;
    }

    currentInput = currentInput.startsWith('-')
        ? currentInput.slice(1)
        : `-${currentInput}`;
    updateDisplay();
};

const applyPercent = () => {
    if (currentInput === 'Error') {
        return;
    }

    const value = parseFloat(currentInput);
    if (Number.isNaN(value)) {
        return;
    }

    currentInput = `${parseFloat((value / 100).toFixed(10))}`;
    updateDisplay();
    shouldResetInput = false;
};

const clearCalculator = () => {
    currentInput = '0';
    previousValue = null;
    operator = null;
    shouldResetInput = false;
    updateDisplay();
};

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const { value, action } = button.dataset;

        if (action === 'clear') {
            clearCalculator();
            return;
        }

        if (action === 'equals') {
            handleEquals();
            return;
        }

        if (action === 'toggle-sign') {
            toggleSign();
            return;
        }

        if (action === 'percent') {
            applyPercent();
            return;
        }

        if (value && ['+', '-', '*', '/'].includes(value)) {
            handleOperator(value);
            return;
        }

        if (value) {
            handleNumber(value);
        }
    });
});

updateDisplay();
