import java.util.Scanner;

public class MultiplyThreeNumbers {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter first number: ");
        double num1 = scanner.nextDouble();
        
        System.out.print("Enter second number: ");
        double num2 = scanner.nextDouble();
        
        System.out.print("Enter third number: ");
        double num3 = scanner.nextDouble();
        
        double result = multiply(num1, num2, num3);
        
        System.out.println("The product of " + num1 + " x " + num2 + " x " + num3 + " = " + result);
        
        scanner.close();
    }
    
    public static double multiply(double a, double b, double c) {
        return a * b * c;
    }
}
