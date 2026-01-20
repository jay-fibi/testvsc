// Utility functions
function isEmpty(value) {
    return value === null || value === undefined || value === '';
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDate(date) {
    return date.toLocaleDateString();
}

module.exports = {
    isEmpty,
    capitalize,
    formatDate
};