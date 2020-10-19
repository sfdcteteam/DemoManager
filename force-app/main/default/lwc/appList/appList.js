import { LightningElement, wire } from 'lwc';
import getAppList from '@salesforce/apex/AppController.getAppList';

export default class ContactList extends LightningElement {
    @wire(getAppList) apps;

    handleAppSelect(event) {
        console.log(event.detail);
        const appId = event.detail.recordId;
        this.selectedApp = this.apps.data.find(
            (app) => app.Id === appId
        );
    }
}