/**
 * Calculator Frontend Logic
 * Handles user interactions and communicates with the Python Flask API
 */

const API_BASE_URL = 'http://localhost:5000/api';
const previousOperandElement = document.getElementById('previousOperand');
const currentOperandElement = document.getElementById('currentOperand');
const historyListElement = document.getElementById('historyList');
const apiStatusDot = document.querySelector('.status-dot');
const apiStatusText = document.querySelector('.status-text');

let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let shouldResetScreen = false;

/**
 * Initialize the calculator
 */
function init() {
    updateDisplay();
    checkApiStatus();
    refreshHistory();
    // Poll for status every 10 seconds
    setInterval(checkApiStatus, 10000);
}

/**
 * Append a number to the display
 */
function appendNumber(number) {
    if (currentOperand === '0' || shouldResetScreen) {
        currentOperand = number;
        shouldResetScreen = false;
    } else {
        currentOperand = currentOperand.toString() + number.toString();
    }
    updateDisplay();
}

/**
 * Append a decimal point
 */
function appendDecimal() {
    if (shouldResetScreen) {
        currentOperand = '0';
        shouldResetScreen = false;
    }
    if (currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + '.';
    updateDisplay();
}

/**
 * Clear all calculator state
 */
function clearAll() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    shouldResetScreen = false;
    updateDisplay();
}

/**
 * Clear only the current entry
 */
function clearEntry() {
    currentOperand = '0';
    updateDisplay();
}

/**
 * Remove the last character
 */
function backspace() {
    if (currentOperand === '0' || shouldResetScreen) return;
    if (currentOperand.length === 1) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
}

/**
 * Toggle between positive and negative
 */
function toggleSign() {
    currentOperand = (parseFloat(currentOperand) * -1).toString();
    updateDisplay();
}

/**
 * Set the current mathematical operation
 */
function setOperation(op) {
    if (currentOperand === '') return;
    
    // Some operations are unary (like sqrt) or special
    if (op === 'power' || op === 'modulo' || op === 'percentage') {
        // These still need two numbers
    }

    if (previousOperand !== '') {
        calculate();
    }
    
    operation = op;
    previousOperand = currentOperand;
    shouldResetScreen = true;
    updateDisplay();
}

/**
 * Get operation symbol for display
 */
function getOperationSymbol(op) {
    switch (op) {
        case 'add': return '+';
        case 'subtract': return '−';
        case 'multiply': return '×';
        case 'divide': return '÷';
        case 'power': return '^';
        case 'modulo': return '%';
        case 'percentage': return '% of';
        default: return '';
    }
}

/**
 * Update the calculator display
 */
function updateDisplay() {
    currentOperandElement.innerText = currentOperand;
    if (operation != null) {
        previousOperandElement.innerText = `${previousOperand} ${getOperationSymbol(operation)}`;
    } else {
        previousOperandElement.innerText = '';
    }
}

/**
 * Perform calculation using the Python API
 */
async function calculate() {
    if (operation == null || previousOperand === '' || shouldResetScreen) return;

    const valA = parseFloat(previousOperand);
    const valB = parseFloat(currentOperand);
    let endpoint = '';
    let body = {};

    switch (operation) {
        case 'add':
            endpoint = '/add';
            body = { a: valA, b: valB };
            break;
        case 'subtract':
            endpoint = '/subtract';
            body = { a: valA, b: valB };
            break;
        case 'multiply':
            endpoint = '/multiply';
            body = { a: valA, b: valB };
            break;
        case 'divide':
            endpoint = '/divide';
            body = { a: valA, b: valB };
            break;
        case 'power':
            endpoint = '/power';
            body = { base: valA, exponent: valB };
            break;
        case 'modulo':
            endpoint = '/modulo';
            body = { a: valA, b: valB };
            break;
        case 'percentage':
            endpoint = '/percentage';
            body = { value: valB, percent: valA }; // x% of y
            break;
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        if (data.success) {
            currentOperand = data.result.toString();
            operation = undefined;
            previousOperand = '';
            shouldResetScreen = true;
            updateDisplay();
            refreshHistory();
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        console.error('API Error:', error);
        alert('Could not connect to Python backend. Is the server running?');
    }
}

/**
 * Calculate square root (Unary operation)
 */
async function calculateSqrt() {
    const val = parseFloat(currentOperand);
    try {
        const response = await fetch(`${API_BASE_URL}/sqrt`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ a: val })
        });

        const data = await response.json();
        if (data.success) {
            currentOperand = data.result.toString();
            shouldResetScreen = true;
            updateDisplay();
            refreshHistory();
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        console.error('API Error:', error);
        alert('Could not connect to Python backend.');
    }
}

/**
 * Refresh calculation history from API
 */
async function refreshHistory() {
    try {
        const response = await fetch(`${API_BASE_URL}/history`);
        const data = await response.json();
        
        if (data.success) {
            if (data.history.length === 0) {
                historyListElement.innerHTML = '<p class="no-history">No calculations yet</p>';
                return;
            }

            historyListElement.innerHTML = data.history
                .reverse() // Newest first
                .map(item => `<div class="history-item">${item}</div>`)
                .join('');
        }
    } catch (error) {
        console.error('History Fetch Error:', error);
    }
}

/**
 * Clear history on both backend and frontend
 */
async function clearHistory() {
    try {
        const response = await fetch(`${API_BASE_URL}/history/clear`, { method: 'POST' });
        const data = await response.json();
        if (data.success) {
            refreshHistory();
        }
    } catch (error) {
        console.error('Clear History Error:', error);
    }
}

/**
 * Check if the Python backend is reachable
 */
async function checkApiStatus() {
    try {
        // Just try to fetch history as a heartbeat
        const response = await fetch(`${API_BASE_URL}/history`);
        if (response.ok) {
            apiStatusDot.classList.add('online');
            apiStatusDot.classList.remove('offline');
            apiStatusText.innerText = 'Python Backend Online';
        } else {
            throw new Error();
        }
    } catch (error) {
        apiStatusDot.classList.remove('online');
        apiStatusDot.classList.add('offline');
        apiStatusText.innerText = 'Python Backend Offline (Run app.py)';
    }
}

// Initialize on load
window.addEventListener('DOMContentLoaded', init);
