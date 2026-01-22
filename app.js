// Basic JavaScript file
// Application entry point

document.addEventListener('DOMContentLoaded', function() {
    console.log('Application loaded successfully!');
    
    // Initialize the app
    initApp();
});

function initApp() {
    const appName = 'My Application';
    const version = '1.0.0';
    
    console.log(`${appName} v${version} initialized`);
    
    // Add greeting to the page
    const greeting = document.getElementById('greeting');
    if (greeting) {
        greeting.textContent = `Welcome to ${appName}!`;
    }
}

function formatDate(date) {
    return new Date(date).toLocaleDateString();
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Export functions for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initApp, formatDate, validateEmail };
}
