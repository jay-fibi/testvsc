// Basic JavaScript functionality
console.log('Application loaded successfully!');

// Simple greeting function
function greetUser(name) {
    return `Hello, ${name}! Welcome to our application.`;
}

// Event listener for DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    // Example: Change text content
    const heading = document.querySelector('h1');
    if (heading) {
        heading.style.transition = 'color 0.3s ease';
    }
});

// Export function for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { greetUser };
}
