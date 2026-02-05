#!/usr/bin/env python3
"""
Strong Password Generator
Generates secure, random passwords with customizable options.
"""

import random
import string
import argparse


def generate_password(length=16, use_uppercase=True, use_lowercase=True, 
                      use_digits=True, use_special=True, exclude_ambiguous=False):
    """
    Generate a strong random password.
    
    Args:
        length: Length of the password (default: 16)
        use_uppercase: Include uppercase letters (default: True)
        use_lowercase: Include lowercase letters (default: True)
        use_digits: Include digits (default: True)
        use_special: Include special characters (default: True)
        exclude_ambiguous: Exclude ambiguous characters like 0, O, l, 1, I (default: False)
    
    Returns:
        A randomly generated password string
    """
    # Define character sets
    uppercase = string.ascii_uppercase
    lowercase = string.ascii_lowercase
    digits = string.digits
    special = "!@#$%^&*()_+-=[]{}|;:,.<>?"
    
    # Remove ambiguous characters if requested
    if exclude_ambiguous:
        ambiguous = "0O1lI"
        uppercase = ''.join(c for c in uppercase if c not in ambiguous)
        lowercase = ''.join(c for c in lowercase if c not in ambiguous)
        digits = ''.join(c for c in digits if c not in ambiguous)
    
    # Build the character pool
    char_pool = ""
    required_chars = []
    
    if use_uppercase:
        char_pool += uppercase
        required_chars.append(random.choice(uppercase))
    
    if use_lowercase:
        char_pool += lowercase
        required_chars.append(random.choice(lowercase))
    
    if use_digits:
        char_pool += digits
        required_chars.append(random.choice(digits))
    
    if use_special:
        char_pool += special
        required_chars.append(random.choice(special))
    
    # Validate inputs
    if not char_pool:
        raise ValueError("At least one character type must be selected!")
    
    if length < len(required_chars):
        raise ValueError(f"Password length must be at least {len(required_chars)} to include all selected character types!")
    
    # Generate the remaining characters
    remaining_length = length - len(required_chars)
    password_chars = required_chars + [random.choice(char_pool) for _ in range(remaining_length)]
    
    # Shuffle to avoid predictable patterns (required chars at the beginning)
    random.shuffle(password_chars)
    
    return ''.join(password_chars)


def calculate_strength(password):
    """
    Calculate password strength score and provide feedback.
    
    Returns:
        tuple: (score, strength_label, feedback)
    """
    score = 0
    feedback = []
    
    # Length scoring
    if len(password) >= 8:
        score += 1
    if len(password) >= 12:
        score += 1
    if len(password) >= 16:
        score += 1
    if len(password) >= 20:
        score += 1
    
    # Character variety scoring
    if any(c.isupper() for c in password):
        score += 1
    else:
        feedback.append("Add uppercase letters")
    
    if any(c.islower() for c in password):
        score += 1
    else:
        feedback.append("Add lowercase letters")
    
    if any(c.isdigit() for c in password):
        score += 1
    else:
        feedback.append("Add digits")
    
    if any(c in "!@#$%^&*()_+-=[]{}|;:,.<>?" for c in password):
        score += 1
    else:
        feedback.append("Add special characters")
    
    # Determine strength label
    if score <= 3:
        strength = "Weak"
    elif score <= 5:
        strength = "Moderate"
    elif score <= 7:
        strength = "Strong"
    else:
        strength = "Very Strong"
    
    return score, strength, feedback


def main():
    parser = argparse.ArgumentParser(
        description="Generate strong, secure passwords",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python password_generator.py                    # Generate a 16-character password
  python password_generator.py -l 24              # Generate a 24-character password
  python password_generator.py -l 12 --no-special # No special characters
  python password_generator.py -n 5               # Generate 5 passwords
  python password_generator.py --exclude-ambiguous # Exclude confusing characters
        """
    )
    
    parser.add_argument('-l', '--length', type=int, default=16,
                        help='Password length (default: 16)')
    parser.add_argument('-n', '--count', type=int, default=1,
                        help='Number of passwords to generate (default: 1)')
    parser.add_argument('--no-uppercase', action='store_true',
                        help='Exclude uppercase letters')
    parser.add_argument('--no-lowercase', action='store_true',
                        help='Exclude lowercase letters')
    parser.add_argument('--no-digits', action='store_true',
                        help='Exclude digits')
    parser.add_argument('--no-special', action='store_true',
                        help='Exclude special characters')
    parser.add_argument('--exclude-ambiguous', action='store_true',
                        help='Exclude ambiguous characters (0, O, 1, l, I)')
    parser.add_argument('-s', '--show-strength', action='store_true',
                        help='Show password strength analysis')
    
    args = parser.parse_args()
    
    print("\n🔐 Strong Password Generator\n")
    print("-" * 50)
    
    for i in range(args.count):
        try:
            password = generate_password(
                length=args.length,
                use_uppercase=not args.no_uppercase,
                use_lowercase=not args.no_lowercase,
                use_digits=not args.no_digits,
                use_special=not args.no_special,
                exclude_ambiguous=args.exclude_ambiguous
            )
            
            if args.count > 1:
                print(f"Password {i + 1}: {password}")
            else:
                print(f"Password: {password}")
            
            if args.show_strength:
                score, strength, feedback = calculate_strength(password)
                print(f"Strength:  {strength} ({score}/8)")
                if feedback:
                    print(f"Tips:      {', '.join(feedback)}")
            
            if i < args.count - 1:
                print()
                
        except ValueError as e:
            print(f"Error: {e}")
            return 1
    
    print("-" * 50)
    print(f"Length: {args.length} characters")
    print()
    
    return 0


if __name__ == "__main__":
    exit(main())
