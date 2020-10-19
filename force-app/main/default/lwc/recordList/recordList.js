import { LightningElement, api } from 'lwc';

export default class RecordList extends LightningElement {
    @api record;
    @api title;
    @api details;
    @api iconName;

    handleSelect(event) {
        // 1. Prevent default behavior of anchor tag click which is to navigate to the href url
        event.preventDefault();
        // 2. Create a custom event that bubbles. Read about event best practices at http://developer.salesforce.com/docs/component-library/documentation/lwc/lwc.events_best_practices
        const selectEvent = new CustomEvent('recordselect', {
            detail: { recordId: event.currentTarget.dataset.recordId }
        });
        // 3. Fire the custom event
        this.dispatchEvent(selectEvent);
    }
}