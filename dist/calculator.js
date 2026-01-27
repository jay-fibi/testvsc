/**
 * Calculator class with basic arithmetic operations
 */
class Calculator {
    constructor() {
        this.currentValue = 0;
        this.previousValue = 0;
        this.operation = null;
        this.display = '0';
    }
    /**
     * Add two numbers
     */
    add(a, b) {
        return a + b;
    }
    /**
     * Subtract two numbers
     */
    subtract(a, b) {
        return a - b;
    }
    /**
     * Multiply two numbers
     */
    multiply(a, b) {
        return a * b;
    }
    /**
     * Divide two numbers
     */
    divide(a, b) {
        if (b === 0) {
            throw new Error('Cannot divide by zero');
        }
        return a / b;
    }
    /**
     * Calculate percentage
     */
    percentage(value, percent) {
        return (value * percent) / 100;
    }
    /**
     * Calculate square root
     */
    sqrt(value) {
        if (value < 0) {
            throw new Error('Cannot calculate square root of negative number');
        }
        return Math.sqrt(value);
    }
    /**
     * Calculate power
     */
    power(base, exponent) {
        return Math.pow(base, exponent);
    }
    /**
     * Clear calculator state
     */
    clear() {
        this.currentValue = 0;
        this.previousValue = 0;
        this.operation = null;
        this.display = '0';
    }
    /**
     * Append digit to current display
     */
    appendDigit(digit) {
        if (this.display === '0' || this.display === 'Error') {
            this.display = digit;
        }
        else {
            this.display += digit;
        }
        this.currentValue = parseFloat(this.display);
    }
    /**
     * Append decimal point
     */
    appendDecimal() {
        if (!this.display.includes('.')) {
            this.display += '.';
        }
    }
    /**
     * Set operation
     */
    setOperation(op) {
        if (this.operation !== null) {
            this.calculate();
        }
        this.previousValue = this.currentValue;
        this.operation = op;
        this.display = '0';
    }
    /**
     * Calculate result based on current operation
     */
    calculate() {
        if (this.operation === null) {
            return;
        }
        try {
            let result;
            switch (this.operation) {
                case '+':
                    result = this.add(this.previousValue, this.currentValue);
                    break;
                case '-':
                    result = this.subtract(this.previousValue, this.currentValue);
                    break;
                case '*':
                    result = this.multiply(this.previousValue, this.currentValue);
                    break;
                case '/':
                    result = this.divide(this.previousValue, this.currentValue);
                    break;
                case '^':
                    result = this.power(this.previousValue, this.currentValue);
                    break;
                default:
                    return;
            }
            this.currentValue = result;
            this.display = result.toString();
            this.operation = null;
        }
        catch (error) {
            this.display = 'Error';
            this.operation = null;
        }
    }
    /**
     * Get current display value
     */
    getDisplay() {
        return this.display;
    }
    /**
     * Toggle sign (positive/negative)
     */
    toggleSign() {
        this.currentValue = -this.currentValue;
        this.display = this.currentValue.toString();
    }
}
// Export the Calculator class
export default Calculator;
//# sourceMappingURL=calculator.js.map