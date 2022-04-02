import {LightningElement, wire} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import RECORD_UPDATED_CHANNEL from '@salesforce/messageChannel/Record_Update__c';
import getContacts from '@salesforce/apex/QueryService.getContacts';

export default class ReviewContacts extends LightningElement {
    subscription = null;
    columns = [
        {label: 'Name', fieldName: 'Name'},
        {label: 'Email', fieldName: 'Email', type: 'email'},
        {label: 'Description', fieldName: 'Description'}
    ]
    records

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscribeToMessageChannel()
        this.retrievedContacts()
    }
    disconnectedCallback() {
        unsubscribe(this.subscription)
        this.subscription = null
    }

    subscribeToMessageChannel() {
        this.subscription = subscribe(
            this.messageContext,
            RECORD_UPDATED_CHANNEL,
            (message) => this.handleMessage(message)
        );
    }

    handleMessage(message) {
        console.log('message ', {...message})
        this.retrievedContacts()
    }

    showToastMessage(title, message) {
        this.dispatchEvent(new ShowToastEvent({
            title: title,
            message: message
        }))
    }

    retrievedContacts() {
        getContacts()
            .then(response => {
                this.records = response;
                console.log('--records=',this.records)
                this.showToastMessage('Contacts retrieved', 'All contacts are retrieved')
            })
            .catch(error => {
                this.showToastMessage('Error message', error)
            })
    }
}