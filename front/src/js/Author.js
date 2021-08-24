import { Validation } from "./Validation.js";

export class Author extends Validation {
    constructor(data) {
        super();
        this.firstName =(data && data.firstName)? data.firstName : '';
        this.lastName = (data && data.lastName)? data.lastName : '';
        this.city = (data && data.firstName)? data.city : '';
    }
    static validateGetData() {
        let data = localStorage.getItem("author");
        data = JSON.parse(data);
        let author = new Author(data);
        if(author.validatedFields()) {
            return {
                FirstName: author.firstName,
                LastName: author.lastName,
                City: author.city
            }
        }else {
            console.dir("Validation failed");
            return false;
        }
    }

    validatedFields() {
        let validated = true;
        let fields = ["firstName", "lastName", "city"];
        for(let i=0; i<fields.length; i++) {
            let field = fields[i];
            if(this[field] == null || this[field] == '' || typeof this[field] == undefined) {
                alert("Unesite sva polja");
                validated = false;
                break;
            }
        }
        let form = document.forms['author_form'];
        if(!form.checkValidity()) {
            alert("Proverite sva polja");
            return false;
        }
        return validated;
    }
}