import { api, track, wire, LightningElement } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

import getSObjectType from '@salesforce/apex/Chatters.getSObjectType'
import getChatters from '@salesforce/apex/Chatters.getChatters'

import {
    IGNORE,
} from './util'

export default class Chatters extends LightningElement {

    @api icon = 'utility:chat'
    @api header = 'Chatterings'
    @api recordId = '0011U00000MV7GGQA1'

    @track chatters = []

    sObjectType

    @wire(getObjectInfo, { objectApiName: '$sObjectType' }) //objectInfo;
    wiredObjectInfo({ error, data }) {
        if (data) {
            this.objectInfo = data;
            this.init()
        } else if (error) {
            console.error(error.message)
        }
    }

    get fields(){
        return this.objectInfo ? this.objectInfo.fields : undefined;
    }

    async connectedCallback(){

        const {recordId} = this;

        this.sObjectType = await getSObjectType({recordId})
    }

    async init(){

        const {sObjectType, recordId} = this;

        //references
        const fields = Object.keys(this.fields)
            .filter(key => this.fields[key].reference && !IGNORE.includes(key))

        //console.log(fields)

        const chatters = await getChatters({
            recordId,
            sObjectType,
            fields,
        })

        this.chatters = chatters.map((c,i) => Object.assign({
            key: '_key'+i,
            key_com: '_key_com'+i
        }, c));
    }

    debug(){
        
        console.log(JSON.parse(JSON.stringify({
            type: this.sObjectType,
            objectInfo: this.objectInfo,
            objectInfo: this.objectInfo,
            chatters: this.chatters,
        })));
    }

    toast(message, variant){
        
    }
}