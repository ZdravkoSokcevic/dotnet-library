import { Validation } from "./Validation.js";

export class Library extends Validation {
    constructor(data) {
        super();
        this.name = (data && data.name)? data.name : '';
    }
    static validateGetData() {
        let data = localStorage.getItem("library");
        data = JSON.parse(data);
        let library = new Library(data);
        if(library.validatedFields()) {
            return {
                name: library.name
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
        let forms = window.forms || {}
        if(forms.libraryForm)
        {
            let form = forms.libraryForm;
            if(!form.checkValidity()) {
                alert("Check fields");
                return false;
            }
            return validated;
        }
    }
}