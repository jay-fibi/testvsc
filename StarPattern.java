public class StarPattern {
    
    public static void main(String[] args) {
        int rows = 5;
        
        System.out.println("=== Right Triangle Star Pattern ===");
        rightTriangle(rows);
        
        System.out.println("\n=== Inverted Right Triangle Star Pattern ===");
        invertedRightTriangle(rows);
        
        System.out.println("\n=== Pyramid Star Pattern ===");
        pyramid(rows);
        
        System.out.println("\n=== Inverted Pyramid Star Pattern ===");
        invertedPyramid(rows);
        
        System.out.println("\n=== Diamond Star Pattern ===");
        diamond(rows);
    }
    
    // Right Triangle Pattern
    public static void rightTriangle(int rows) {
        for (int i = 1; i <= rows; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
    
    // Inverted Right Triangle Pattern
    public static void invertedRightTriangle(int rows) {
        for (int i = rows; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
    
    // Pyramid Pattern
    public static void pyramid(int rows) {
        for (int i = 1; i <= rows; i++) {
            // Print spaces
            for (int j = rows; j > i; j--) {
                System.out.print(" ");
            }
            // Print stars
            for (int k = 1; k <= (2 * i - 1); k++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
    
    // Inverted Pyramid Pattern
    public static void invertedPyramid(int rows) {
        for (int i = rows; i >= 1; i--) {
            // Print spaces
            for (int j = rows; j > i; j--) {
                System.out.print(" ");
            }
            // Print stars
            for (int k = 1; k <= (2 * i - 1); k++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
    
    // Diamond Pattern
    public static void diamond(int rows) {
        // Upper half
        for (int i = 1; i <= rows; i++) {
            for (int j = rows; j > i; j--) {
                System.out.print(" ");
            }
            for (int k = 1; k <= (2 * i - 1); k++) {
                System.out.print("*");
            }
            System.out.println();
        }
        // Lower half
        for (int i = rows - 1; i >= 1; i--) {
            for (int j = rows; j > i; j--) {
                System.out.print(" ");
            }
            for (int k = 1; k <= (2 * i - 1); k++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}
