// Demo JavaScript File
// Enhanced JavaScript functionality with improved documentation

/**
 * Validates that the provided arguments are numbers
 * @param {...any} args - Arguments to validate
 * @throws {TypeError} If any argument is not a number
 */
function validateNumbers(...args) {
    args.forEach((arg, index) => {
        if (typeof arg !== 'number' || isNaN(arg)) {
            throw new TypeError(`Argument ${index + 1} must be a valid number, received: ${typeof arg}`);
        }
    });
}

/**
 * Greets a user with a personalized message
 * @param {string} name - The name of the user to greet
 * @returns {string} A greeting message
 */
function greet(name) {
    if (!name || typeof name !== 'string') {
        return 'Hello, Guest! Welcome to the demo.';
    }
    return `Hello, ${name}! Welcome to the demo.`;
}

/**
 * Calculates the sum of two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} The sum of a and b
 * @throws {TypeError} If arguments are not valid numbers
 */
function calculateSum(a, b) {
    validateNumbers(a, b);
    return a + b;
}

/**
 * Multiplies two numbers together
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} The product of a and b
 * @throws {TypeError} If arguments are not valid numbers
 */
function multiply(a, b) {
    validateNumbers(a, b);
    return a * b;
}

/**
 * Divides the first number by the second
 * @param {number} a - Dividend
 * @param {number} b - Divisor
 * @returns {number} The quotient of a divided by b
 * @throws {TypeError} If arguments are not valid numbers
 * @throws {Error} If attempting to divide by zero
 */
function divide(a, b) {
    validateNumbers(a, b);
    if (b === 0) {
        throw new Error('Cannot divide by zero');
    }
    return a / b;
}

/**
 * Calculates the average of an array of numbers
 * @param {number[]} numbers - Array of numbers to average
 * @returns {number} The arithmetic mean of the numbers
 * @throws {TypeError} If input is not a non-empty array of numbers
 */
function calculateAverage(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        throw new TypeError('Input must be a non-empty array of numbers');
    }
    numbers.forEach((num, index) => {
        if (typeof num !== 'number' || isNaN(num)) {
            throw new TypeError(`Array element at index ${index} must be a valid number`);
        }
    });
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}

/**
 * Formats a number with specified decimal places
 * @param {number} num - Number to format
 * @param {number} [decimals=2] - Number of decimal places
 * @returns {string} Formatted number string
 */
function formatNumber(num, decimals = 2) {
    validateNumbers(num);
    return num.toFixed(decimals);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Demo JavaScript loaded successfully!');
    console.log(greet('User'));
    console.log(`Sample multiplication: 5 × 3 = ${multiply(5, 3)}`);
    console.log(`Sample division: 10 ÷ 2 = ${divide(10, 2)}`);
    console.log(`Average of [10, 20, 30]: ${formatNumber(calculateAverage([10, 20, 30]))}`);
});

// Export functions for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { greet, calculateSum, multiply, divide, calculateAverage, formatNumber, validateNumbers };
}
