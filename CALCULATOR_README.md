# TypeScript Calculator

A modern, fully-featured calculator built with TypeScript, HTML, and CSS.

## Features

### Operations
- ✅ Addition (+)
- ✅ Subtraction (−)
- ✅ Multiplication (×)
- ✅ Division (÷)
- ✅ Square Root (√)
- ✅ Power (^)
- ✅ Percentage (%)
- ✅ Toggle Sign (+/-)
- ✅ Decimal support

### User Interface
- 🎨 Modern, responsive design
- 🌈 Beautiful gradient background
- 📱 Mobile-friendly layout
- ⌨️ Full keyboard support
- 🎯 Click and touch support

### Keyboard Shortcuts
- **Numbers (0-9)**: Enter digits
- **Operators (+, -, *, /)**: Perform operations
- **Enter or =**: Calculate result
- **Escape or C**: Clear calculator
- **Backspace**: Delete last digit
- **.** or **,**: Add decimal point

## Project Structure

```
├── src/
│   ├── calculator.ts    # Calculator logic class
│   └── main.ts          # UI interaction handler
├── dist/                # Compiled JavaScript files
├── calculator.html      # Calculator interface
├── calculator.css       # Styling
└── tsconfig.json        # TypeScript configuration
```

## Running the Calculator

### Option 1: Using HTTP Server (Recommended)
```bash
npx http-server -p 8080 -o calculator.html
```
Then open http://localhost:8080/calculator.html

### Option 2: Development
```bash
# Compile TypeScript
npx tsc

# Serve with any static file server
# Open calculator.html in your browser
```

## TypeScript Configuration

The project uses:
- **Target**: ES6
- **Module**: ES6
- **Lib**: ES2015, DOM
- **Strict mode**: Enabled
- **Source maps**: Enabled

## Error Handling

- Division by zero: Displays "Error"
- Square root of negative numbers: Displays "Error"
- Invalid operations: Gracefully handled

## Calculator Class API

```typescript
class Calculator {
  add(a: number, b: number): number
  subtract(a: number, b: number): number
  multiply(a: number, b: number): number
  divide(a: number, b: number): number
  sqrt(value: number): number
  power(base: number, exponent: number): number
  percentage(value: number, percent: number): number
  clear(): void
  appendDigit(digit: string): void
  appendDecimal(): void
  setOperation(op: string): void
  calculate(): void
  getDisplay(): string
  toggleSign(): void
}
```

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Development

To modify the calculator:

1. Edit `src/calculator.ts` for logic changes
2. Edit `src/main.ts` for UI interaction changes
3. Edit `calculator.css` for styling changes
4. Edit `calculator.html` for layout changes
5. Run `npx tsc` to compile TypeScript
6. Refresh the browser to see changes

## License

Free to use and modify.
