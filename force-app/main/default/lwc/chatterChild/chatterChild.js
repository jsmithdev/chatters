import { api, LightningElement } from 'lwc';

export default class ChatterChild extends LightningElement {

    @api key
    @api chatter
    @api format

    get isComment(){ return this.format === 'comment' ? true : false }

    get body(){ if(!this.chatter){return ''}; return this.isComment ? this.chatter.CommentBody : this.chatter.Body}

    get likeCount(){ if(!this.chatter){return ''}; return this.chatter.LikeCount }

    get commentCount(){ if(!this.chatter){return ''}; return this.chatter.CommentCount }
}