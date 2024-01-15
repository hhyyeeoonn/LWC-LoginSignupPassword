import { LightningElement, api } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import LOGIN_CSS from '@salesforce/resourceUrl/lwcLoginCss';

export default class Login extends LightningElement {
    @api tabLogin;

    
    renderedCallback () {
        Promise.all ([loadStyle (this, LOGIN_CSS)]);
    } 
    
}