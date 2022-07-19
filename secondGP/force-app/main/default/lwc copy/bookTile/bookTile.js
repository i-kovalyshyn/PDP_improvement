import { LightningElement, api } from 'lwc';

export default class BookTile extends LightningElement {
   @api book={}; 

   selectBook(){
    this.dispatchEvent(new CustomEvent('selected', {
        detail:this.book.volumeInfo
    }))
   }
}