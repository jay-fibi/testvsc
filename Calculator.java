import java.util.Scanner;

public class Calculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("=================================");
        System.out.println("    Simple Java Calculator");
        System.out.println("=================================");
        
        while (true) {
            System.out.println("\nSelect an operation:");
            System.out.println("1. Multiplication (*)");
            System.out.println("2. Division (/)");
            System.out.println("3. Modulus (%)");
            System.out.println("4. Power (a^b)");
            System.out.println("5. Maximum (max)");
            System.out.println("6. Minimum (min)");
            System.out.println("7. Exit");
            System.out.print("\nEnter your choice (1-7): ");
            
            int choice = scanner.nextInt();
            
            if (choice == 7) {
                System.out.println("\nThank you for using the calculator. Goodbye!");
                break;
            }
            
            if (choice < 1 || choice > 7) {
                System.out.println("Invalid choice. Please try again.");
                continue;
            }
            
            System.out.print("Enter first number: ");
            double num1 = scanner.nextDouble();
            
            System.out.print("Enter second number: ");
            double num2 = scanner.nextDouble();
            
            double result = 0;
            String operation = "";
            
            switch (choice) {
                case 1:
                    result = multiply(num1, num2);
                    operation = "*";
                    break;
                case 2:
                    if (num2 == 0) {
                        System.out.println("Error: Division by zero is not allowed!");
                        continue;
                    }
                    result = divide(num1, num2);
                    operation = "/";
                    break;
                case 3:
                    if (num2 == 0) {
                        System.out.println("Error: Modulus by zero is not allowed!");
                        continue;
                    }
                    result = modulus(num1, num2);
                    operation = "%";
                    break;
                case 4:
                    result = power(num1, num2);
                    operation = "^";
                    break;
                case 5:
                    result = max(num1, num2);
                    operation = "max";
                    break;
                case 6:
                    result = min(num1, num2);
                    operation = "min";
                    break;
            }
            
            System.out.println("\nResult: " + num1 + " " + operation + " " + num2 + " = " + result);
        }
        
        scanner.close();
    }
    
    // Multiplication method
    public static double multiply(double a, double b) {
        return a * b;
    }
    
    // Division method
    public static double divide(double a, double b) {
        return a / b;
    }

    // Modulus method
    public static double modulus(double a, double b) {
        return a % b;
    }

    // Power method
    public static double power(double a, double b) {
        return Math.pow(a, b);
    }

    // Maximum method
    public static double max(double a, double b) {
        return Math.max(a, b);
    }

    // Minimum method
    public static double min(double a, double b) {
        return Math.min(a, b);
    }
}
