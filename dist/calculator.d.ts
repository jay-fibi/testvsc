/**
 * Calculator class with basic arithmetic operations
 */
declare class Calculator {
    private currentValue;
    private previousValue;
    private operation;
    private display;
    constructor();
    /**
     * Add two numbers
     */
    add(a: number, b: number): number;
    /**
     * Subtract two numbers
     */
    subtract(a: number, b: number): number;
    /**
     * Multiply two numbers
     */
    multiply(a: number, b: number): number;
    /**
     * Divide two numbers
     */
    divide(a: number, b: number): number;
    /**
     * Calculate percentage
     */
    percentage(value: number, percent: number): number;
    /**
     * Calculate square root
     */
    sqrt(value: number): number;
    /**
     * Calculate power
     */
    power(base: number, exponent: number): number;
    /**
     * Clear calculator state
     */
    clear(): void;
    /**
     * Append digit to current display
     */
    appendDigit(digit: string): void;
    /**
     * Append decimal point
     */
    appendDecimal(): void;
    /**
     * Set operation
     */
    setOperation(op: string): void;
    /**
     * Calculate result based on current operation
     */
    calculate(): void;
    /**
     * Get current display value
     */
    getDisplay(): string;
    /**
     * Toggle sign (positive/negative)
     */
    toggleSign(): void;
}
export default Calculator;
//# sourceMappingURL=calculator.d.ts.map