// Main application entry point

import { LoginHandler } from './loginHandler';
import { TickerHandler } from './tickerHandler';

class LoginApp {
  private loginHandler: LoginHandler | null = null;
  private tickerHandler: TickerHandler | null = null;

  constructor() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initialize());
    } else {
      this.initialize();
    }
  }

  private initialize(): void {
    try {
      // Initialize login handler
      this.loginHandler = new LoginHandler('loginForm');
      console.log('✅ Login handler initialized');

      // Initialize ticker handler
      this.tickerHandler = new TickerHandler('ticker');
      this.tickerHandler.initialize();
      console.log('✅ Ticker handler initialized');

      // Setup additional event listeners
      this.setupAdditionalListeners();

      console.log('✅ Login application started successfully');
    } catch (error) {
      console.error('Failed to initialize application:', error);
      alert('Application initialization failed. Please refresh the page.');
    }
  }

  private setupAdditionalListeners(): void {
    // Handle forgot password link
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    if (forgotPasswordLink) {
      forgotPasswordLink.addEventListener('click', (e: Event) => {
        e.preventDefault();
        this.handleForgotPassword();
      });
    }

    // Handle signup link
    const signupLink = document.getElementById('signupLink');
    if (signupLink) {
      signupLink.addEventListener('click', (e: Event) => {
        e.preventDefault();
        this.handleSignup();
      });
    }

    // Check for saved credentials
    this.checkSavedCredentials();
  }

  private handleForgotPassword(): void {
    const email = prompt('Please enter your email address to reset your password:');
    if (email) {
      console.log('Password reset requested for:', email);
      alert(`Password reset link has been sent to ${email}\n\n(This is a demo - no email was actually sent)`);
    }
  }

  private handleSignup(): void {
    console.log('Redirecting to signup page...');
    alert('Sign up functionality would redirect to the registration page.\n\n(This is a demo)');
  }

  private checkSavedCredentials(): void {
    const savedEmail = localStorage.getItem('userEmail');
    const savedToken = localStorage.getItem('authToken');

    if (savedEmail && savedToken) {
      console.log('Found saved credentials for:', savedEmail);
      const emailInput = document.getElementById('email') as HTMLInputElement;
      const rememberCheckbox = document.getElementById('remember') as HTMLInputElement;
      
      if (emailInput) {
        emailInput.value = savedEmail;
      }
      if (rememberCheckbox) {
        rememberCheckbox.checked = true;
      }
    }
  }

  public getLoginHandler(): LoginHandler | null {
    return this.loginHandler;
  }

  public getTickerHandler(): TickerHandler | null {
    return this.tickerHandler;
  }
}

// Initialize the application
const app = new LoginApp();

// Make app available globally for debugging
(window as any).loginApp = app;

export default LoginApp;
