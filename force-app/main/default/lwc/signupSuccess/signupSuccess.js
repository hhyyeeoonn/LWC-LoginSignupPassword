import { LightningElement, wire } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import LOGINSIGNUPPASSWORD_CSS from '@salesforce/resourceUrl/lwcLoginSignupPasswordCss';
import SUCCESS_CHANNEL from "@salesforce/messageChannel/SuccessMessage__c";
import { subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext } from 'lightning/messageService';

export default class SignupSuccess extends LightningElement {
    @wire(MessageContext) messageContext;
    
    subscription = null;
    successType = '';

    loginSuccess = false;
    signupSuccess = false;
    passwordSuccess = false;
    
    renderedCallback() {
        Promise.all([loadStyle (this, LOGINSIGNUPPASSWORD_CSS)]);
    } 

    async connectedCallback() {
        this.handleSubscribe();
    }

    handleSubscribe() {
        
        if (this.subscription) {
            console.log ('*** fail');
            return;
        }
        console.log('외않되: ' + this.subscription);
        // message : 구독자에게 게시된 메시지를 포함하는 직렬화 가능한 JSON 개체임 메시지에 함수나 심볼을 포함할 수 없다
        this.subscription = subscribe(this.messageContext, SUCCESS_CHANNEL, (message) => {
            console.log('외않되2');
            this.successType = message.successType;
            this.handleSuccessType(this.successType);
            console.log('***** this.successType: ' + this.successType);
            console.log ('***** loginSuccess.js message.successType : ' + message.successType);
        }, {scope: APPLICATION_SCOPE},);
    }

    handleSuccessType(type) {
        if(type !== '' && type !== null) {
            this.loginSuccess = type === 'login';
            this.signupSuccess = type === 'signup';
            this.passwordSuccess = type === 'password';
        }
    }
}