import Calculator from './calculator.js';

// Create calculator instance
const calc = new Calculator();

// Get display element
const displayElement = document.getElementById('display') as HTMLElement;

// Update display function
function updateDisplay(): void {
    if (displayElement) {
        displayElement.textContent = calc.getDisplay();
    }
}

// Override Calculator methods to include display updates
const originalAppendDigit = calc.appendDigit.bind(calc);
calc.appendDigit = (digit: string) => {
    originalAppendDigit(digit);
    updateDisplay();
};

const originalAppendDecimal = calc.appendDecimal.bind(calc);
calc.appendDecimal = () => {
    originalAppendDecimal();
    updateDisplay();
};

const originalSetOperation = calc.setOperation.bind(calc);
calc.setOperation = (op: string) => {
    originalSetOperation(op);
    updateDisplay();
};

const originalCalculate = calc.calculate.bind(calc);
calc.calculate = () => {
    originalCalculate();
    updateDisplay();
};

const originalClear = calc.clear.bind(calc);
calc.clear = () => {
    originalClear();
    updateDisplay();
};

const originalToggleSign = calc.toggleSign.bind(calc);
calc.toggleSign = () => {
    originalToggleSign();
    updateDisplay();
};

// Handle square root
function handleSqrt(): void {
    try {
        const currentValue = parseFloat(calc.getDisplay());
        const result = calc.sqrt(currentValue);
        calc.clear();
        calc.appendDigit(result.toString());
    } catch (error) {
        calc.clear();
        if (displayElement) {
            displayElement.textContent = 'Error';
        }
    }
}

// Add keyboard support
document.addEventListener('keydown', (event: KeyboardEvent) => {
    const key = event.key;
    
    // Numbers
    if (key >= '0' && key <= '9') {
        calc.appendDigit(key);
    }
    // Decimal point
    else if (key === '.' || key === ',') {
        calc.appendDecimal();
    }
    // Operations
    else if (key === '+' || key === '-' || key === '*' || key === '/') {
        calc.setOperation(key);
    }
    // Equals
    else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calc.calculate();
    }
    // Clear
    else if (key === 'Escape' || key.toLowerCase() === 'c') {
        calc.clear();
    }
    // Backspace (delete last digit)
    else if (key === 'Backspace') {
        event.preventDefault();
        const currentDisplay = calc.getDisplay();
        if (currentDisplay.length > 1) {
            calc.clear();
            calc.appendDigit(currentDisplay.slice(0, -1));
        } else {
            calc.clear();
        }
    }
});

// Make calc and handleSqrt globally available for onclick handlers
(window as any).calc = calc;
(window as any).handleSqrt = handleSqrt;

// Initialize display
updateDisplay();
