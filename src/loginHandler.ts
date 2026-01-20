// Login handler with validation and authentication logic

import { LoginCredentials, ValidationResult, LoginResponse } from './types';

export class LoginHandler {
  private form: HTMLFormElement;
  private emailInput: HTMLInputElement;
  private passwordInput: HTMLInputElement;
  private rememberCheckbox: HTMLInputElement;

  constructor(formId: string) {
    const form = document.getElementById(formId) as HTMLFormElement | null;
    if (!form) {
      throw new Error(`Form with id "${formId}" not found`);
    }
    this.form = form;

    const emailInput = document.getElementById('email') as HTMLInputElement | null;
    const passwordInput = document.getElementById('password') as HTMLInputElement | null;
    const rememberCheckbox = document.getElementById('remember') as HTMLInputElement | null;

    if (!emailInput || !passwordInput || !rememberCheckbox) {
      throw new Error('Required form inputs not found');
    }

    this.emailInput = emailInput;
    this.passwordInput = passwordInput;
    this.rememberCheckbox = rememberCheckbox;

    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    this.form.addEventListener('submit', (e: Event) => this.handleSubmit(e));
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validatePassword(password: string): boolean {
    // Password must be at least 6 characters
    return password.length >= 6;
  }

  private validateCredentials(credentials: LoginCredentials): ValidationResult {
    const errors: string[] = [];

    if (!credentials.email) {
      errors.push('Email is required');
    } else if (!this.validateEmail(credentials.email)) {
      errors.push('Please enter a valid email address');
    }

    if (!credentials.password) {
      errors.push('Password is required');
    } else if (!this.validatePassword(credentials.password)) {
      errors.push('Password must be at least 6 characters long');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private async authenticateUser(credentials: LoginCredentials): Promise<LoginResponse> {
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
        } else {
          resolve({
            success: false,
            message: 'Invalid credentials'
          });
        }
      }, 1000);
    });
  }

  private async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();

    const credentials: LoginCredentials = {
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
      } else {
        this.showError(response.message);
      }
    } catch (error) {
      this.showError('An error occurred during login. Please try again.');
      console.error('Login error:', error);
    } finally {
      this.setLoadingState(false);
    }
  }

  private setLoadingState(loading: boolean): void {
    const submitButton = this.form.querySelector('button[type="submit"]') as HTMLButtonElement;
    if (submitButton) {
      submitButton.disabled = loading;
      submitButton.textContent = loading ? 'Logging in...' : 'Login';
    }
  }

  private showError(message: string): void {
    alert('❌ Error\n\n' + message);
  }

  private showSuccess(message: string): void {
    alert('✅ Success\n\n' + message + '\n\nEmail: ' + this.emailInput.value);
  }

  public getCredentials(): LoginCredentials {
    return {
      email: this.emailInput.value.trim(),
      password: this.passwordInput.value,
      remember: this.rememberCheckbox.checked
    };
  }
}
