// Type definitions for the login screen application

export interface LoginCredentials {
  email: string;
  password: string;
  remember: boolean;
}

export interface Stock {
  symbol: string;
  price: number;
  change: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
}
