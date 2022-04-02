import {LightningElement, wire} from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import RECORD_UPDATED_CHANNEL from '@salesforce/messageChannel/Record_Update__c';

export default class CreateContact extends LightningElement {
    @wire(MessageContext)
    messageContext;

    handleSuccess(e) {
        const payload = {
            recordId: e.detail.id,
            recordData: e.detail
        }
        console.log('recordData=',{...e.detail})
        publish(this.messageContext, RECORD_UPDATED_CHANNEL, payload);
        const event = new ShowToastEvent({
            title: 'Contact is created',
            message: `New Contact record has been created. Name of the Contact is ${e.detail.Name}`,
        });
        this.dispatchEvent(event);
    }
}