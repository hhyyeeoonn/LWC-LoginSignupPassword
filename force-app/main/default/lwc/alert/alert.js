import { LightningElement } from 'lwc';

export default class Alert extends LightningElement {
    
    errorType;

    isLoginError = false;
    isSignupError = false;
    isPasswordError = false;

    connectedCallback() {
        resultErrorType(this.errorType);
    }

    resultErrorType(errorType) {
        if(!errorType && errorType !== null) {
            this.isLoginError = errorType === 'loginError';
            this.isSignupError = errorType === 'signupError';
            this.isPasswordError = errorType === 'passwordError';
        }
    }
    
    alertClose() {
        this.template.querySelector('.alert-box').style.display = 'none';
    }
}