import { LightningElement, api } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import LOGINSIGNUPPASSWORD_CSS from '@salesforce/resourceUrl/lwcLoginSignupPasswordCss';

export default class Login extends LightningElement {
    @api tabLogin;

    loginId;
    loginPassword;

    renderedCallback() {
        Promise.all([loadStyle (this, LOGINSIGNUPPASSWORD_CSS)]);
    } 

    handleblurId(e) {
        let testEmail = RegExp('[a-z0-9]+@[a-z0-9]+\.[a-z]{1,2}');
        this.loginId = this.template.querySelector('.loginId').value;
        let idValid = testEmail.test(idValid);
        if(!idValid) {
            
        }
        
        

    }

    handleLogin(e) {
        console.log('Current  Value of the input: ' + e.target.value);

        const allValid = [
            ...this.template.querySelectorAll('.input-id-password'),
        ].reduce((validSoFar, inputCmp) => {
            inputCmp.reportValidity();
            return validSoFar && inputCmp.checkValidity();
        }, true);
        if(allValid) {
            alert('All from entries look valid. Ready to submit!');
        } else {
            alert('Please update the invalid form entries and try again.');
        }
    }
}