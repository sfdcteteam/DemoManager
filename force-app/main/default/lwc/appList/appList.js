import { LightningElement, track, wire, api } from 'lwc';
import getAppList from '@salesforce/apex/AppController.getAppList';
import totalRecords from '@salesforce/apex/AppController.totalRecords';
import { NavigationMixin } from 'lightning/navigation';

/* eslint-disable no-console */
/* eslint-disable no-alert */


const PAGESIZE = 10;

export default class AppList extends NavigationMixin(LightningElement) {
    @api offset=0;
    @api pageSize = PAGESIZE;
    totalRecords=0;
    currentPage = 1;
    totalPages = 0;

    //Fetching records from apex class
    @wire(getAppList, { offset: '$offset', pagesize: '$pageSize' }) apps;

    //Executes on the page load
    connectedCallback() {
        totalRecords().then(result=>{
            this.totalRecords = result;
        });
    }
    renderedCallback(){
        this.calculatePageData();
    }
    calculatePageData(){
        this.totalPages = Math.ceil(this.totalRecords/this.pageSize);
        this.currentPage = Math.floor(this.offset / this.pageSize) + 1;
        this.template.querySelector('c-paginator').changeView(this.currentPage, this.totalPages);
    }

    handleAppSelect(event) {
        const appId = event.detail.recordId;
        this.selectedApp = this.apps.data.find(
            (app) => app.Id === appId
        );
        console.log(this.selectedApp);
        console.log(this.selectedApp.Deploy_URL__c);

        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: this.selectedApp.Deploy_URL__c
            }
        });
    }

    
    previousHandler(){
        //If less than 0 then make it 0
        this.offset = ((this.offset - this.pageSize) <0)? 0: this.offset - this.pageSize;
        this.calculatePageData();
    }
    nextHandler(){
        //If somehow offset becomes more than number of total records then don't change
        this.offset = ((this.offset + this.pageSize) > this.totalRecords)? this.offset: this.offset + this.pageSize;
        this.calculatePageData();
    }

    changePageSizeHandler(event){
        const det = event.detail;
        this.pageSize = det;
        //Page size changed so set offset to 0 to start from beginning
        this.offset = 0;
        this.calculatePageData();
    }
    firstpagehandler(){
        this.offset = 0;
        this.calculatePageData();
    }
    lastpagehandler(){
        this.offset = (this.totalPages -1) * this.pageSize;//this.totalRecords - (this.totalRecords % this.pageSize);
        this.calculatePageData();
    }
}