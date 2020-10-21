import { LightningElement, api, track } from 'lwc';
/* eslint-disable no-console */
 /* eslint-disable no-alert */

//https://medium.com/@rs60033/pagination-in-lwc-lightning-web-component-7a6dcb5a9385
export default class Paginator extends LightningElement {
    @api pageSize = 10;
    @api currentPage;
    @api totalPages;
    @api totalRecords; 
    
    connectedCallback(){
        this.value = this.pageSize;
    }

    get options() {
        return [
            { label: '5', value: 5 },
            { label: '10', value: 10 },
            { label: '20', value: 20 },
        ];
    }

    disableButton(button, disabled){
        this.template.querySelector(button).disabled = disabled;
    }

    @api
    changeView(currentPage, totalPages){
        //If current page <=1 then we don't need First or {Previous buttons}
        if(currentPage <= 1){
            this.disableButton("[data-name='Previous']", true);
            this.disableButton("[data-name='First']", true);
        }else if(currentPage > 1){
            //If current page >1 then we need First or {Previous buttons}
            this.disableButton("[data-name='Previous']", false);
            this.disableButton("[data-name='First']", false);
        }

        //If current page >11 AND we have fewer records than more than 1 pages then we don't need Next or Last buttons
        if(totalPages === currentPage){
            this.disableButton("[data-name='Next']", true);
            this.disableButton("[data-name='Last']", true);
        }else if(totalPages !== currentPage){
            this.disableButton("[data-name='Next']", false);
            this.disableButton("[data-name='Last']", false);
        }
    }
    renderedCallback(){
        //Disable First and Previous buttons as this is first page
        this.disableButton("[data-name='Previous']", true);
        this.disableButton("[data-name='First']", true);
        //this.template.querySelector("[data-name='Previous']").disabled = true;
    }
    previousHandler() {
        this.dispatchEvent(new CustomEvent('previous'));
    }

    nextHandler() {
        this.dispatchEvent(new CustomEvent('next'));
    }
    FirstPageHandler(){
        this.dispatchEvent(new CustomEvent('firstpage'));
    }
    LastPageHandler(){
        this.dispatchEvent(new CustomEvent('lastpage'));
    }
    changePageSizeHandler(event){
        this.value = event.detail.value;
        const selectedEvent = new CustomEvent('pagesizechanged', { detail: this.value});
        this.dispatchEvent(selectedEvent);
 
    }
}