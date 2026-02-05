// Basic JavaScript file
// Created by Cline

// Simple greeting function
function greet(name) {
    return `Hello, ${name}! Welcome to our application.`;
}

// Array manipulation example
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);

// Event listener for DOM ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Application initialized');
    console.log(greet('User'));
    console.log('Doubled numbers:', doubled);
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { greet };
}
