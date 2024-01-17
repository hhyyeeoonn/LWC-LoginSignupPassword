import { LightningElement, api } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import LOGINSIGNUPPASSWORD_CSS from '@salesforce/resourceUrl/lwcLoginSignupPasswordCss';

export default class LwcLoginSignup extends LightningElement {
    renderedCallback() {
        Promise.all([loadStyle (this, LOGINSIGNUPPASSWORD_CSS)]);
    } 
    

}