// Login handler with validation and authentication logic
export class LoginHandler {
    constructor(formId) {
        const form = document.getElementById(formId);
        if (!form) {
            throw new Error(`Form with id "${formId}" not found`);
        }
        this.form = form;
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const rememberCheckbox = document.getElementById('remember');
        if (!emailInput || !passwordInput || !rememberCheckbox) {
            throw new Error('Required form inputs not found');
        }
        this.emailInput = emailInput;
        this.passwordInput = passwordInput;
        this.rememberCheckbox = rememberCheckbox;
        this.attachEventListeners();
    }
    attachEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    validatePassword(password) {
        // Password must be at least 6 characters
        return password.length >= 6;
    }
    validateCredentials(credentials) {
        const errors = [];
        if (!credentials.email) {
            errors.push('Email is required');
        }
        else if (!this.validateEmail(credentials.email)) {
            errors.push('Please enter a valid email address');
        }
        if (!credentials.password) {
            errors.push('Password is required');
        }
        else if (!this.validatePassword(credentials.password)) {
            errors.push('Password must be at least 6 characters long');
        }
        return {
            isValid: errors.length === 0,
            errors
        };
    }
    async authenticateUser(credentials) {
        // Simulate API call with delay
        return new Promise((resolve) => {
            setTimeout(() => {
                // In a real application, this would make an API call
                // For demo purposes, we'll accept any valid credentials
                if (credentials.email && credentials.password.length >= 6) {
                    resolve({
                        success: true,
                        message: 'Login successful!',
                        token: 'demo-token-' + Date.now()
                    });
                }
                else {
                    resolve({
                        success: false,
                        message: 'Invalid credentials'
                    });
                }
            }, 1000);
        });
    }
    async handleSubmit(event) {
        event.preventDefault();
        const credentials = {
            email: this.emailInput.value.trim(),
            password: this.passwordInput.value,
            remember: this.rememberCheckbox.checked
        };
        // Validate credentials
        const validation = this.validateCredentials(credentials);
        if (!validation.isValid) {
            this.showError(validation.errors.join('\n'));
            return;
        }
        // Show loading state
        this.setLoadingState(true);
        try {
            // Authenticate user
            const response = await this.authenticateUser(credentials);
            if (response.success) {
                this.showSuccess(response.message);
                // Store token if remember me is checked
                if (credentials.remember && response.token) {
                    localStorage.setItem('authToken', response.token);
                    localStorage.setItem('userEmail', credentials.email);
                }
                // Log credentials (in production, never log passwords!)
                console.log('Login successful:', {
                    email: credentials.email,
                    remember: credentials.remember,
                    token: response.token
                });
                // In a real app, redirect to dashboard
                setTimeout(() => {
                    console.log('Redirecting to dashboard...');
                }, 1500);
            }
            else {
                this.showError(response.message);
            }
        }
        catch (error) {
            this.showError('An error occurred during login. Please try again.');
            console.error('Login error:', error);
        }
        finally {
            this.setLoadingState(false);
        }
    }
    setLoadingState(loading) {
        const submitButton = this.form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = loading;
            submitButton.textContent = loading ? 'Logging in...' : 'Login';
        }
    }
    showError(message) {
        alert('❌ Error\n\n' + message);
    }
    showSuccess(message) {
        alert('✅ Success\n\n' + message + '\n\nEmail: ' + this.emailInput.value);
    }
    getCredentials() {
        return {
            email: this.emailInput.value.trim(),
            password: this.passwordInput.value,
            remember: this.rememberCheckbox.checked
        };
    }
}
