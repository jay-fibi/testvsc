// Basic JavaScript file
console.log('Hello from script.js!');

// Simple function to greet users
function greetUser(name) {
    return `Welcome, ${name}!`;
}

// ✨ NEW: Theme management
const THEME_KEY = 'user-theme-preference';

// ✨ NEW: Get saved theme or default to light
function getSavedTheme() {
    return localStorage.getItem(THEME_KEY) || 'light';
}

// ✨ NEW: Save theme preference
function saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
}

// ✨ NEW: Apply theme to document
function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    
    // Update toggle button text
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    }
    
    console.log(`Theme switched to: ${theme}`);
}

// ✨ NEW: Toggle between dark and light theme
function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    applyTheme(newTheme);
    saveTheme(newTheme);
}

// Event listener for DOM content loaded (ENHANCED)
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    // ✨ NEW: Apply saved theme on page load
    const savedTheme = getSavedTheme();
    applyTheme(savedTheme);
    
    // Example: Change text content (KEPT)
    const heading = document.querySelector('h1');
    if (heading) {
        heading.addEventListener('click', function() {
            heading.style.color = heading.style.color === 'blue' ? 'green' : 'blue';
        });
    }
    
    // ✨ NEW: Theme toggle button handler
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // ✨ NEW: Also allow button to toggle theme
    const button = document.querySelector('.button');
    if (button && !themeToggle) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            toggleTheme();
        });
    }
});
