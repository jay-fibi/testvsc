public class StringOperations {
    public static void main(String[] args) {
        String str1 = "Hello";
        String str2 = "World";
        String str3 = "  Java Programming  ";

        System.out.println("String 1: '" + str1 + "'");
        System.out.println("String 2: '" + str2 + "'");
        System.out.println("String 3: '" + str3 + "'");
        System.out.println();

        // 1. Concatenation
        String concatenated = str1 + " " + str2;
        System.out.println("1. Concatenation: " + concatenated);

        // 2. Length
        System.out.println("2. Length of String 1: " + str1.length());

        // 3. Character at index
        System.out.println("3. Character at index 1 in String 1: " + str1.charAt(1));

        // 4. Substring
        System.out.println("4. Substring of String 2 (index 1 to 4): " + str2.substring(1, 4));

        // 5. Case Conversion
        System.out.println("5. Upper Case String 1: " + str1.toUpperCase());
        System.out.println("5. Lower Case String 2: " + str2.toLowerCase());

        // 6. Trim (removes leading and trailing whitespace)
        System.out.println("6. Trimmed String 3: '" + str3.trim() + "'");

        // 7. Replace
        System.out.println("7. Replace 'Java' with 'Python' in String 3: " + str3.replace("Java", "Python").trim());

        // 8. Contains
        System.out.println("8. Does String 1 contain 'ell'?: " + str1.contains("ell"));

        // 9. Starts with / Ends with
        System.out.println("9. Does String 2 start with 'Wo'?: " + str2.startsWith("Wo"));
        System.out.println("9. Does String 2 end with 'ld'?: " + str2.endsWith("ld"));

        // 10. Comparison
        String str4 = "hello";
        System.out.println("10. Comparison (str1.equals(str4)): " + str1.equals(str4));
        System.out.println("10. Comparison (str1.equalsIgnoreCase(str4)): " + str1.equalsIgnoreCase(str4));

        // 11. Split
        String csv = "apple,banana,orange";
        String[] fruits = csv.split(",");
        System.out.print("11. Split 'apple,banana,orange' by comma: ");
        for (String fruit : fruits) {
            System.out.print(fruit + " ");
        }
        System.out.println();

        // 12. Empty/Blank Check
        String emptyStr = "";
        String blankStr = "   ";
        System.out.println("12. Is emptyStr empty?: " + emptyStr.isEmpty());
        System.out.println("12. Is blankStr blank? (Java 11+): " + blankStr.isBlank());
    }
}
