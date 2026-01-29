// Basic JavaScript file
console.log('Hello from script.js!');

// Simple function to greet users
function greetUser(name) {
    return `Welcome, ${name}!`;
}

// Event listener for DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    // Example: Change text content
    const heading = document.querySelector('h1');
    if (heading) {
        heading.addEventListener('click', function() {
            heading.style.color = heading.style.color === 'blue' ? 'green' : 'blue';
        });
    }
});

// Export function for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { greetUser };
}
