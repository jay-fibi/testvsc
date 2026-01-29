// Helper utilities file in nested directory structure
// Located at: src/utils/helper.js

/**
 * Formats a date object to a readable string
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Validates an email address
 * @param {string} email - The email to validate
 * @returns {boolean} True if valid, false otherwise
 */
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Capitalizes the first letter of a string
 * @param {string} str - The string to capitalize
 * @returns {string} Capitalized string
 */
function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Generates a random ID
 * @returns {string} Random alphanumeric ID
 */
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatDate,
        validateEmail,
        capitalize,
        generateId
    };
}
