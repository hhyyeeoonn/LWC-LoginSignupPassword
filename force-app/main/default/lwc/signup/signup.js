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
    
    userInfo = [
        {id:'hwigyeom.kim@dkbmc.com', password:'1234qwer!@#$QWER'},
        {id:'qw@qw.qw', password:'1!qQ'},
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

    /*
    handleContainerCss(passwordVaild) {
        let $card =  this.template.querySelector('.custom-card');
        if(!passwordVaild) {
            $card.style.height = '298px';
        } else {
            $card.style.height = '278px';        
        }
    }
    */

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
            $signupPassword.style = 'margin-bottom: 0px';
            $signupPassword.setCustomValidity(`
                                패스워드는 소문자, 대문자, 숫자, 특수문자를 조합해야합니다.`)
        } else {
            //$card.style.height = '278px';
            $signupPassword.style = 'margin-bottom: 24px';
            $signupPassword.setCustomValidity('');
        }
        $signupPassword.reportValidity();
    }

    /*
    handleBlurId() {
        const testEmail = RegExp('[a-z0-9]+@[a-z0-9]+.[a-z]{1,2}');
        this.validateInput('.signupId', testEmail, '아이디를 올바르게 입력해 주세요.');
    }

    handleBlurPassword() {
        const testPW = RegExp('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{1,10}');
        this.validateInput('.signupPassword', testPW, '패스워드는 소문자, 대문자, 숫자, 특수문자를 조합해야합니다.');
    }

    validateInput(selector, testRegex, errorMessage) {
        const inputField = this.template.querySelector(selector);
        const isValid = testRegex.test(inputField.value);
        
        inputField.style.marginBottom = isValid ? '24px' : '4px';
        inputField.setCustomValidity(isValid ? '' : errorMessage);
        inputField.reportValidity();
    }
    */


    handleMessage(type) {
        let message = {
             alertType : type,
        };
        //console.log('**** signup.js type: ' + this.type);
        //console.log('***** signup.js message.alertType: ' + message.alertType);
        publish(this.messageContext, LSP_CHANNEL, message);
    }

    handleSuccessMessage() {
        let message = {
             successType : 'signup',
        };
        //console.log('***** signup.js message.successType: ' + message.successType);
        publish(this.messageContext, SUCCESS_CHANNEL, message);
    }

    /*
    handleMessage(type) {
        publish(this.messageContext, LSP_CHANNEL, { alertType: type });
    }

    handleSuccessMessage() {
        publish(this.messageContext, SUCCESS_CHANNEL, { successType: 'signup' });
    }
    */

    newUser(newId, newPassword) {
        let newInfo = {
            id : newId,
            password : newPassword,
        }
        this.userInfo.push(newInfo);
        //console.log('***** signup.js_this.userInfo:' + JSON.stringify(this.userInfo));
    }

    /*
    newUser(newId, newPassword) {
        this.userInfo.push({ id: newId, password: newPassword });
    }
    */

    isInputCorrect() {
        let $signupId = this.template.querySelector('.signupId');
        let $signupPassword = this.template.querySelector('.signupPassword');
        let isUsedId = false;
        let isEmpty = false;
        let allCheckId = [];

        /*
        const isInputsAllCorrect = [
            ...this.template.querySelectorAll('.input-id-password'),
        ].reduce((validSoFar, inputField) => {
            inputField.reportValidity();
            return validSoFar && inputField.checkValidity();
        }, true);
        */
        for(let i = 0; i < this.userInfo.length; ++i) {
            //console.log('***** signup.js_this.userInfo.length: ' + this.userInfo.length);
            let usedId = this.userInfo[i].id;

            if(usedId !== $signupId.value) {
                //console.log('***** usedId: ' + usedId);
                //console.log('***** $signupId.value: ' + $signupId.value);
                allCheckId.push(true);
            } else {
                console.log('1');
                allCheckId.push(false);
            }
        }
        //console.log('allCheckId: ' + JSON.stringify(allCheckId));
        if(allCheckId.every((a) => a === true)) isUsedId = true;
        
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
            this.newUser($signupId.value, $signupPassword.value);
            console.log('***** signup.js_this.userInfo_newUserIn:' + JSON.stringify(this.userInfo));
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

    /*
    isInputCorrect() {
        const $signupId = this.template.querySelector('.signupId');
        const $signupPassword = this.template.querySelector('.signupPassword');
        const isUsedId = !this.userInfo.every(user => user.id !== $signupId.value);
        const isEmpty = !$signupId.value || !$signupPassword.value;

        if (isUsedId && isEmpty) {
            this.newUser($signupId.value, $signupPassword.value);
            $signupId.style.marginBottom = '24px';
            $signupId.setCustomValidity('');
            $signupId.reportValidity();

            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage',
                attributes: { name: 'customSignup__c' },
            });
        } else if (!isUsedId) {
            $signupId.focus();
            this.type = 'signupAlert';
            this.handleMessage(this.type);
        } else if (!isEmpty) {
            $signupId.focus();
            $signupId.style.marginBottom = '4px';
            $signupId.setCustomValidity('아이디를 올바르게 입력해 주세요.');
            $signupId.reportValidity();
        }
    }

    handleSubmit() {
        try {
            this.handleSuccessMessage();
            this.isInputCorrect();
        } catch (exception) {
            this.type = 'unknownAlert';
            this.handleMessage(this.type);
            console.log('catch');
            console.error(exception);
        }
    }
    */
}