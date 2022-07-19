import { LightningElement } from 'lwc';
import {createRecord} from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import BOOK_OBJECT from '@salesforce/schema/Book__c'
const BOOK_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
export default class BookApp extends LightningElement {
    serchQuery;
    books;
    timer;
    isOpen = false;    
    error;
    checkBoxFieldValue;
    selectedBook={};
    _formFields={};
    formFields={};

    connectedCallback() {
        this.fetchBookData();
    }
    fetchBookData() {
        fetch(BOOK_URL + this.serchQuery).then(response => response.json())
            .then(data => {
                console.log(data)
                this.books = data;
            })
            .catch(error => {
                console.log(error);
                this.error=error;
            });
    }
    fetchBooksHandler(event){        
        if(!!event.target.value){
            this.serchQuery=event.target.value;
            window.clearTimeout(this.timer);
            this.timer = setTimeout(()=>{
                this.fetchBookData();
            },500);
        }        
    }
    
    changeHandler(event){
        const {name, value} = event.target;        
        this._formFields[name]=value;
        this.formFields={...this._formFields, 
        Name: this.selectedBook.title,
        Published_Date__c:this.selectedBook.publishedDate,
        Authors__c:JSON.stringify(this.selectedBook.authors),
        ImageLink__c:this.selectedBook.imageLinks.thumbnail,
        In_Calenadr__c : true     
        }
    }
   
    createBook(){
        const recordInput = {apiName:BOOK_OBJECT.objectApiName, fields:this.formFields}
        createRecord(recordInput).then(result=>{
            this.showToast('Success!!', `book created with is ${result.id}`)
            this.template.querySelector('form.createForm').reset()
            this.formFields={};
            this.selectedBook={};
        }).catch(error=>{
            this.showToast('Error Creating record', error.body.message, 'error')
        })
        this.isOpen = false
    }

    handleBookSelected(event){        
         this.isOpen=true; 
         this.selectedBook= event.detail;      
        console.log("book data= ",event.detail.title)
    }
    closeHandler(){
        this.isOpen = false
    }
    showToast(title, message, variant){
        this.dispatchEvent(new ShowToastEvent({
            title,
            message,
            variant:variant || 'success'
        }))
    }
}