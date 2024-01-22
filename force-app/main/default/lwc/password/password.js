import { LightningElement, api, wire } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import LOGINSIGNUPPASSWORD_CSS from '@salesforce/resourceUrl/lwcLoginSignupPasswordCss';
import LSP_CHANNEL from "@salesforce/messageChannel/LoginSignupPassword__c";
import SUCCESS_CHANNEL from "@salesforce/messageChannel/SuccessMessage__c";
import { publish, MessageContext } from 'lightning/messageService';
import { NavigationMixin } from 'lightning/navigation';

export default class Password extends NavigationMixin(LightningElement) {
    @wire(MessageContext) messageContext;

    @api tabValue;
    type = '';

    renderedCallback() {
        Promise.all([loadStyle (this, LOGINSIGNUPPASSWORD_CSS)]);
    }

    handleBlurId() {
        const testEmail = RegExp('[a-z0-9]+@[a-z0-9]+\.[a-z]{1,2}');
        let $passwordId = this.template.querySelector('.passwordId');
        let idValid = testEmail.test($passwordId.value);
        if(!idValid) {
            $passwordId.style = 'margin-bottom: 4px';
            $passwordId.setCustomValidity("아이디를 올바르게 입력해 주세요.");
        } else {
            $passwordId.style = 'margin-bottom: 24px';
            $passwordId.setCustomValidity("");
        }
        $passwordId.reportValidity();
    }

    handleMessage(type) {
        let message = {
             alertType : type,
        };
        console.log('**** password.js type: ' + this.type);
        console.log('***** password.js message.alertType: ' + message.alertType);
        console.log('***** password.js message.successType: ' + message.successType);
        publish(this.messageContext, LSP_CHANNEL, message);
    }

    handleSuccessMessage() {
        let message = {
             successType : 'password',
        };
        console.log('***** password.js message.successType: ' + message.successType);
        publish(this.messageContext, SUCCESS_CHANNEL, message);
    }

    isInputCorrect() {
        let $passwordId = this.template.querySelector('.passwordId');
        console.log($passwordId.value);
        let id = 'hwigyeom.kim@dkbmc.com';
        let checkId = false;

        if(id !== $passwordId.value) {
            $passwordId.style = 'margin-bottom: 4px';
            $passwordId.setCustomValidity("아이디를 다시 확인해주세요.");
            $passwordId.focus();
        } else {
            $passwordId.style = 'margin-bottom: 24px';
            $passwordId.setCustomValidity("");
            checkId = true;
        }
        $passwordId.reportValidity();

        if(checkId) {
            this[NavigationMixin.Navigate]({
                type : 'comm__namedPage',
                attributes : {
                    name : 'customPassword__c'
                },
            });
        } else {
            this.type = 'passwordAlert';
            this.handleMessage(this.type);
        }
    }

    handleSubmit() {
        try {
            this.handleSuccessMessage();
            this.isInputCorrect();
        } catch(exception) {
            this.type = 'unknownAlert';
            this.handleMessage(this.type);
            console.log('catch');
        }
    }
}