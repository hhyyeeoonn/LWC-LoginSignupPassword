import { LightningElement, api, wire } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import LOGINSIGNUPPASSWORD_CSS from '@salesforce/resourceUrl/lwcLoginSignupPasswordCss';
import LSP_CHANNEL from "@salesforce/messageChannel/LoginSignupPassword__c";
import SUCCESS_CHANNEL from "@salesforce/messageChannel/SuccessMessage__c";
import { publish, MessageContext } from 'lightning/messageService';
import { NavigationMixin } from 'lightning/navigation';

export default class Login extends NavigationMixin(LightningElement) {
    @wire(MessageContext) messageContext;
    @api tabLogin;

    loginInfo = {
        loginId : 'hwigyeom.kim@dkbmc.com',
        loginPassword : '1234qwer!@#$QWER',
    }

    type = '';

    renderedCallback() {
        Promise.all([loadStyle (this, LOGINSIGNUPPASSWORD_CSS)]);
    } 

    handleBlurId() {
        const testEmail = RegExp('[a-z0-9]+@[a-z0-9]+\.[a-z]{1,2}');
        let $loginId = this.template.querySelector('.loginId');
        let idValid = testEmail.test($loginId.value);
        if(!idValid) {
            $loginId.style = 'margin-bottom: 5px';
            $loginId.setCustomValidity("아이디를 올바르게 입력해 주세요.");
        } else {
            $loginId.style = 'margin-bottom: 24px';
            $loginId.setCustomValidity("");
        }
        $loginId.reportValidity();
    }

    
    handleMessage(type) {
        let message = {
             alertType : type,
        };
        console.log('**** login.js type: ' + this.type);
        console.log('***** login.js message.alertType: ' + message.alertType);
        console.log('***** login.js message.successType: ' + message.successType);
        publish(this.messageContext, LSP_CHANNEL, message);
    }

    handleSuccessMessage() {
        let message = {
             successType : 'login',
        };
        console.log('***** login.js message.successType: ' + message.successType);
        publish(this.messageContext, SUCCESS_CHANNEL, message);
    }
    
    isInputCorrect(loginInfo) {
        let $loginId = this.template.querySelector('.loginId');
        let $loginPassword = this.template.querySelector('.loginPassword');

        const isInputsAllCorrect = [
            ...this.template.querySelectorAll('.input-id-password'),
        ].reduce((validSoFar, inputField) => {
            inputField.reportValidity();
            return validSoFar && inputField.checkValidity();
        }, true);

        if(isInputsAllCorrect && $loginId.value === loginInfo.loginId && $loginPassword.value === loginInfo.loginPassword) {
            this[NavigationMixin.Navigate]({
                type : 'comm__namedPage',
                attributes : {
                    name : 'customLogin__c'
                },
            });
        } else {
            this.type = 'loginAlert';
            this.handleMessage(this.type);
        }
    }

    handleSubmit() {
        try {
            this.handleSuccessMessage();
            this.isInputCorrect(this.loginInfo);
        } catch(exception) {
            this.type = 'unknownAlert';
            this.handleMessage(this.type);
            console.log('catch');
        }
    }
}