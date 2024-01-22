import { LightningElement, wire, api } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import LOGINSIGNUPPASSWORD_CSS from '@salesforce/resourceUrl/lwcLoginSignupPasswordCss';
import LSP_CHANNEL from "@salesforce/messageChannel/LoginSignupPassword__c";
import SUCCESS_CHANNEL from "@salesforce/messageChannel/SuccessMessage__c";
import { publish, MessageContext } from 'lightning/messageService';
import { NavigationMixin } from 'lightning/navigation';

export default class Signup extends NavigationMixin(LightningElement) {
    @wire(MessageContext) messageContext;

    @api tabValue;
    currentTabValue;
    type = '';
    
    usedInfo = [
        {id:'hwigyeom.kim@dkbmc.com', password:'1234qwer!@#$QWER'}
    ];

    /*
    get tabValue() {
        return this.tabValue = this.currentTabValue;
    }

    static get observedAttributes() {
        return ['tabValue']
    }
    attributeChangedCallback() {
        if(tabValue !== 'tabTwo') {
            const $signupId = this.template.querySelector('.signupId');
            const $signupPassword = this.template.querySelector('.signupPassword');
            
            $signupId.value = '';
            $signupId.style = 'margin-bottom: 24px';
            $signupId.setCustomValidity("");
            $signupId.reportValidity();
            
            $signupPassword.value = '';
            $signupPassword.style = 'margin-bottom: 24px';
            $signupPassword.setCustomValidity("");
            $signupPassword.reportValidity();

        }
    }
    */

    renderedCallback() {
        Promise.all([loadStyle (this, LOGINSIGNUPPASSWORD_CSS)]);
    }

    handleContainerCss(passwordVaild) {
        let $card =  this.template.querySelector('.custom-card');
        if(!passwordVaild) {
            $card.style.height = '298px';
        } else {
            $card.style.height = '278px';        
        }
    }

    handleBlurId() {
        const testEmail = RegExp('[a-z0-9]+@[a-z0-9]+\.[a-z]{1,2}');
        let $signupId = this.template.querySelector('.signupId');
        let idValid = testEmail.test($signupId.value);
        if(!idValid) {
            $signupId.style = 'margin-bottom: 4px';
            $signupId.setCustomValidity("아이디를 올바르게 입력해 주세요.");
        } else {
            $signupId.style = 'margin-bottom: 24px';
            $signupId.setCustomValidity("");
        }
        $signupId.reportValidity();
    }

    handleBlurPassword() {
        //let $card =  this.template.querySelector('.custom-card');
        
        const testPW = RegExp('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{1,10}');
        let $signupPassword = this.template.querySelector('.signupPassword');
        let passwordVaild = testPW.test($signupPassword.value);

        if(!passwordVaild) {
            //$card.style.height = '298px';
            this.handleContainerCss(passwordVaild);
            $signupPassword.style = 'margin-bottom: 0px';
            $signupPassword.setCustomValidity(`
                                패스워드는 소문자, 대문자, 숫자, 특수문자를 조합해야합니다.`)
        } else {
            //$card.style.height = '278px';
            handleContainerCss(passwordVaild);
            $signupPassword.style = 'margin-bottom: 24px';
            $signupPassword.setCustomValidity('');
        }
        $signupPassword.reportValidity();
    }

    handleMessage(type) {
        let message = {
             alertType : type,
        };
        console.log('**** signup.js type: ' + this.type);
        console.log('***** signup.js message.alertType: ' + message.alertType);
        publish(this.messageContext, LSP_CHANNEL, message);
    }

    handleSuccessMessage() {
        let message = {
             successType : 'signup',
        };
        console.log('***** signup.js message.successType: ' + message.successType);
        publish(this.messageContext, SUCCESS_CHANNEL, message);
    }

    isInputCorrect() {
        let $signupId = this.template.querySelector('.signupId');
        let $signupPassword = this.template.querySelector('.signupPassword');
        let isUsedId = false;
        let isEmpty = false;
        /*
        const isInputsAllCorrect = [
            ...this.template.querySelectorAll('.input-id-password'),
        ].reduce((validSoFar, inputField) => {
            inputField.reportValidity();
            return validSoFar && inputField.checkValidity();
        }, true);
        */
        for(let i = 0; i < this.usedInfo.length; ++i) {
            let usedId = this.usedInfo[i].id;
            if(usedId !== $signupId.value) {
                isUsedId = true;
            } else {
                console.log('is used id');
            }
        }

        if($signupId.value === '' || $signupId.value === null 
                || $signupPassword.value === '' || $signupPassword === null) {
                    if($signupId.value === '' || $signupId.value === null) {
                        $signupId.focus();
                    } else if($signupPassword.value === '' || $signupPassword === null
                            && $signupId.value !== '' && $signupId.value !== null) {
                        $signupPassword.focus();
                    }
        } else {
            isEmpty = true;
        }

        if(isUsedId && isEmpty) {
            $signupId.style = 'margin-bottom: 24px';
            $signupId.setCustomValidity("");
            $signupId.reportValidity();
            this[NavigationMixin.Navigate]({
                type : 'comm__namedPage',
                attributes : {
                    name : 'customSignup__c'
                },
            });
        } else if(!isUsedId) {
            $signupId.focus();
            console.log('***** isUsedId: ' + isUsedId);
            this.type = 'signupAlert';
            this.handleMessage(this.type);
        } else if(!isEmpty) {
            $signupId.focus();
            $signupId.style = 'margin-bottom: 4px';
            $signupId.setCustomValidity("아이디를 올바르게 입력해 주세요.");
            $signupId.reportValidity();
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
            console.error(exception);
        }
    }
}