import { LightningElement, track } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import LOGINSIGNUPPASSWORD_CSS from '@salesforce/resourceUrl/lwcLoginSignupPasswordCss';

export default class LwcLoginSignup extends LightningElement {
    @track tabValue = 'tabOne';

    renderedCallback() {
        Promise.all([loadStyle (this, LOGINSIGNUPPASSWORD_CSS)]);
    }
    
    clickTabOne() {
        this.tabValue = 'tabOne';
        console.log(this.tabValue);
    }

    clickTabTwo() {
        this.tabValue = 'tabTwo';
        console.log(this.tabValue);
    }

    clickTabThree() {
        this.tabValue = 'tabThree';
        console.log(this.tabValue);
    }
}