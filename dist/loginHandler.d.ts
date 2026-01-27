import { LoginCredentials } from './types';
export declare class LoginHandler {
    private form;
    private emailInput;
    private passwordInput;
    private rememberCheckbox;
    constructor(formId: string);
    private attachEventListeners;
    private validateEmail;
    private validatePassword;
    private validateCredentials;
    private authenticateUser;
    private handleSubmit;
    private setLoadingState;
    private showError;
    private showSuccess;
    getCredentials(): LoginCredentials;
}
//# sourceMappingURL=loginHandler.d.ts.map