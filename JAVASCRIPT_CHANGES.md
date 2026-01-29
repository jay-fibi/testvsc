# JavaScript Changes - Visual Representation

## BEFORE (Original script.js)
```javascript
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
```

---

## AFTER (Updated script.js with Dark/Light Theme Toggle)
```javascript
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
```

---

## Summary of Changes

### ➕ Added Functions:
1. **getSavedTheme()** - Retrieves theme preference from localStorage
2. **saveTheme(theme)** - Saves theme preference to localStorage
3. **applyTheme(theme)** - Applies theme to body and updates button text
4. **toggleTheme()** - Switches between light and dark themes

### 🔧 Enhanced Features:
- DOMContentLoaded event now applies saved theme on page load
- Added theme toggle button handler
- Existing "Click Me" button now toggles theme (if no dedicated toggle button exists)

### 💾 Persistence:
- Theme preference is saved to localStorage
- Theme persists across page reloads

### 🎨 Dynamic UI:
- Button text changes: 🌙 Dark Mode ↔ ☀️ Light Mode
- Console logs theme switches

### ✅ Kept Original:
- greetUser() function
- H1 click color change functionality
- Module export code
