import java.util.Scanner;

/**
 * A simple calculator that performs basic arithmetic operations.
 */
public class Calculator {

    /**
     * Adds two numbers.
     */
    public static double add(double a, double b) {
        return a + b;
    }

    /**
     * Subtracts second number from first.
     */
    public static double subtract(double a, double b) {
        return a - b
    }

    /**
     * Multiplies two numbers.
     */
    public static double multiply(double a, double b) {
        return a * b;
    }

    /**
     * Divides first number by second.
     */
    public static double divide(double a, double b) {
        if (b == 0) {
            throw new ArithmeticException("Cannot divide by zero!");
        }
        return a / b;
    }

    /**
     * Main method - entry point for the calculator program.
     */
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("=== Simple Calculator ===");
        System.out.println("Operations: +, -, *, /");
        System.out.println("Type 'exit' to quit.\n");

        while (true) {
            try {
                // Get first number
                System.out.print("Enter first number: ");
                String input = scanner.nextLine().trim();
                if (input.equalsIgnoreCase("exit")) {
                    break;
                }
                double num1 = Double.parseDouble(input);

                // Get operator
                System.out.print("Enter operator (+, -, *, /): ");
                String operator = scanner.nextLine().trim();
                if (operator.equalsIgnoreCase("exit")) {
                    break;
                }

                // Get second number
                System.out.print("Enter second number: ");
                input = scanner.nextLine().trim();
                if (input.equalsIgnoreCase("exit")) {
                    break;
                }
                double num2 = Double.parseDouble(input);

                // Perform calculation
                double result;
                switch (operator) {
                    case "+":
                        result = add(num1, num2);
                        break;
                    case "-":
                        result = subtract(num1, num2);
                        break;
                    case "*":
                        result = multiply(num1, num2);
                        break;
                    case "/":
                        result = divide(num1, num2);
                        break;
                    default:
                        System.out.println("Invalid operator! Please use +, -, *, or /\n");
                        continue;
                }

                // Display result
                System.out.println("Result: " + num1 + " " + operator + " " + num2 + " = " + result + "\n");

            } catch (NumberFormatException e) {
                System.out.println("Invalid number format! Please enter a valid number.\n");
            } catch (ArithmeticException e) {
                System.out.println("Error: " + e.getMessage() + "\n");
            }
        }

        System.out.println("Thank you for using the calculator. Goodbye!");
        scanner.close();
    }
}
