import { LightningElement, wire, track } from 'lwc';
import LSP_CHANNEL from "@salesforce/messageChannel/LoginSignupPassword__c";
//import { subscribe, MessageContext } from 'lightning/messageService';
import { subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext } from 'lightning/messageService'; 

export default class Alert extends LightningElement {
    @wire(MessageContext) messageContext;
    
    subscription = null;
    alertType = '';
    isAlertExist = false;

    isUnknownAlert = false;
    isLoginAlert = false;
    isSignupAlert = false;
    isPasswordAlert = false;

    connectedCallback() {
        this.handleSubscribe();
    }

    /*
    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }
    */
    
    handleSubscribe() {
        if (this.subscription) {
            console.log ('*** fail');
            return;
        }

        // message : 구독자에게 게시된 메시지를 포함하는 직렬화 가능한 JSON 개체임 메시지에 함수나 심볼을 포함할 수 없다
        this.subscription = subscribe(this.messageContext, LSP_CHANNEL, (message) => {
            this.alertType = message.alertType;
            this.resultAlertType(this.alertType);
            console.log ('***** alert.js message.alertType : ' + message.alertType);
        }, {scope: APPLICATION_SCOPE},);
    }

    resultAlertType(type) {
        if(type !== '' && type !== null) {
            this.isAlertExist = true;
            this.isUnknownAlert = type === 'unknownAlert';
            this.isLoginAlert = type === 'loginAlert';
            this.isSignupAlert = type === 'signupAlert';
            this.isPasswordAlert = type === 'passwordAlert';
        } else {
            this.isAlertExist = false;
        }
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }


    alertClose() {
        //this.template.querySelector('.alert-box').style.display = 'none';
        this.isAlertExist = false;
    }
}