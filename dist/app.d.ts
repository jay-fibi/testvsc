import { LoginHandler } from './loginHandler';
import { TickerHandler } from './tickerHandler';
declare class LoginApp {
    private loginHandler;
    private tickerHandler;
    constructor();
    private initialize;
    private setupAdditionalListeners;
    private handleForgotPassword;
    private handleSignup;
    private checkSavedCredentials;
    getLoginHandler(): LoginHandler | null;
    getTickerHandler(): TickerHandler | null;
}
export default LoginApp;
//# sourceMappingURL=app.d.ts.map