import { LightningElement, track } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import LOGINSIGNUPPASSWORD_CSS from '@salesforce/resourceUrl/lwcLoginSignupPasswordCss';

export default class LwcLoginSignup extends LightningElement {
    @track tabValue = 'tabOne';

    renderedCallback() {
        Promise.all([loadStyle (this, LOGINSIGNUPPASSWORD_CSS)]);
    }
    
    changeCss(value) {
        const $tab = this.template.querySelector('.custom-card');
        if(value === 'tabOne' || value === 'tabTwo') {
            $tab.style.height = '278px';
        } else {
            $tab.style.height = '202px';
        }
    }
    
    activeTabOne(e) {
        this.tabValue = 'tabOne';
        //console.log(this.tabValue);
        this.changeCss(this.tabValue);        
    }

    activeTabTwo(e) {
        this.tabValue = 'tabTwo';
        //console.log(this.tabValue);
        this.changeCss(this.tabValue);
    }

    activeTabThree(e) {
        this.tabValue = 'tabThree';
        //console.log(this.tabValue);
        this.changeCss(this.tabValue);
    }
}