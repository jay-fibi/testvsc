"""
Python Calculator Module
Contains all calculator logic with various mathematical operations
"""

class Calculator:
    """Calculator class with basic and advanced operations"""
    
    def __init__(self):
        self.history = []
    
    def add(self, a: float, b: float) -> float:
        """Add two numbers"""
        result = a + b
        self._add_to_history(f"{a} + {b} = {result}")
        return result
    
    def subtract(self, a: float, b: float) -> float:
        """Subtract b from a"""
        result = a - b
        self._add_to_history(f"{a} - {b} = {result}")
        return result
    
    def multiply(self, a: float, b: float) -> float:
        """Multiply two numbers"""
        result = a * b
        self._add_to_history(f"{a} × {b} = {result}")
        return result
    
    def divide(self, a: float, b: float) -> float:
        """Divide a by b"""
        if b == 0:
            raise ValueError("Cannot divide by zero")
        result = a / b
        self._add_to_history(f"{a} ÷ {b} = {result}")
        return result
    
    def power(self, base: float, exponent: float) -> float:
        """Raise base to the power of exponent"""
        result = base ** exponent
        self._add_to_history(f"{base} ^ {exponent} = {result}")
        return result
    
    def modulo(self, a: float, b: float) -> float:
        """Get remainder of a divided by b"""
        if b == 0:
            raise ValueError("Cannot perform modulo with zero")
        result = a % b
        self._add_to_history(f"{a} % {b} = {result}")
        return result
    
    def square_root(self, a: float) -> float:
        """Get square root of a number"""
        if a < 0:
            raise ValueError("Cannot calculate square root of negative number")
        result = a ** 0.5
        self._add_to_history(f"√{a} = {result}")
        return result
    
    def percentage(self, value: float, percent: float) -> float:
        """Calculate percentage of a value"""
        result = (value * percent) / 100
        self._add_to_history(f"{percent}% of {value} = {result}")
        return result
    
    def _add_to_history(self, operation: str):
        """Add operation to history"""
        self.history.append(operation)
        # Keep only last 50 operations
        if len(self.history) > 50:
            self.history.pop(0)
    
    def get_history(self) -> list:
        """Get calculation history"""
        return self.history.copy()
    
    def clear_history(self):
        """Clear calculation history"""
        self.history = []


# Singleton instance for the app
calc_instance = Calculator()
