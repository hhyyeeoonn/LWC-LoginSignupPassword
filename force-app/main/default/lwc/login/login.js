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
        let $loginId = this.template.querySelector('.loginId');
        let idValid = testEmail.test($loginId.value);
        if(!idValid) {
            $loginId.setCustomValidity("아이디를 올바르게 입력해 주세요.");
        } else {
            $loginId.setCustomValidity("");
        }
        $loginId.reportValidity();
        

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