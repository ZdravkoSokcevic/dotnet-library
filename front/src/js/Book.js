import { Author } from "./Author.js";
import { Dom } from "./Dom.js";
import { Modal } from "./Modal.js";
import {Validation} from "./Validation.js";
import { Form } from "./Form.js";

export class Book extends Validation {
    constructor(data) {
        super()
        this.id = (data && data.id) ? data.id : null;
        this.name = (data && data.name) ? data.name : '';
        this.numberPages = (data && data.numberPages)? data.numberPages : 0;
        this.author = (data && data.author)? data.author : {};
        // this.authorId = data.author ?? '';
        this.dom = new Dom();
    }

    render(authors, newRow = false) {
        let container = window.container;
        let row;
        let el;
        for (var i = 0; i < container.childNodes.length; i++) {
            if (container.childNodes[i].className == "row") {
              row = container.childNodes[i];
              break;
            }        
        }
        if(row) {
            let row = document.getElementsByClassName("row")[0];
        }else {
            row = Dom.makeRow(container);
        }
        window.row = row;

        // Make book item
        el = this.dom.createElement("div", ["item", "book-item", "book-" + this.id], "", row);

        if(newRow) {
            $(el).insertBefore('.item.last-book-form');
        }else {
            row.appendChild(el);
        }

        // Add book container to use it in remove
        this.row = el;
        el.innerHTML = "<p>" + this.name + "</p>";
        // window.container = container;
        let editButton = document.createElement("i");
        editButton.classList.add("fa");
        editButton.classList.add("fa-edit");
        editButton.classList.add("book-edit-icon");
        editButton.addEventListener("click", () => {
            alert(this.id);
        })
        // console.log(editButton);
        el.appendChild(editButton);
        
        if(newRow) {

        }else {
        }

        // Add users who order this book
        let html = '';
        el.addEventListener("click",(e) => {

            // open edit modal
            if(e.target.nodeName == 'svg' || e.target.nodeName == 'path') {
                Modal.openEditInfoModal(this, authors);
            }else {
                Modal.openBookInfoModal(this, html ,[])
            }
            // if(e.target == 'svg')
        });
    }

    static makeBookForm(authors, libararies) {
        let container = new Dom().createElement("div", ["item", "no-image", "last-book-form"], "", document.getElementsByClassName("row")[0]);
        
        let bookFormContainer = new Dom().createElement("div", ["form-book", "p-1"], "",window.container);
        let bookForm = Form.makeForm("/author/insert", "", "form", "bookInsertForm");

        Form.makeTextInput(bookForm, "Name", "name", "", "book");
        Form.makeTextInput(bookForm, "Number of Pages", "numberPages","", "book");
        Form.makeSelectInput(bookForm, "Author", "author", "","book", "author", authors);
        Form.makeSelectInput(bookForm, "Library", "library", "","book", "library", libararies);

        let submit = Form.makeFormButton("book","Submit", bookForm);

        bookForm.appendChild(submit);

        bookFormContainer.appendChild(bookForm);

        container.appendChild(bookFormContainer);

        if(window.row)
            window.row = container;
    }

    static validateGetData() {
        let data = localStorage.getItem("book");
        data = JSON.parse(data);
        let book = new Book(data);
        if(book.validatedFields()) {
            let forms = window.forms || {}
            if(forms.bookInsertForm)
            {
                console.log(book);
                data = window.forms.bookInsertForm;
                console.log({
                    name: data.name.value,
                    NumberPages: data.numberPages.value,
                    AuthorId: window.allAuthors[0].id,
                    LibraryId: data.library.value 
                })
                return {
                    name: data.name.value,
                    NumberPages: data.numberPages.value,
                    AuthorId: window.allAuthors[0].id,
                    LibraryId: data.library.value 
                }
            }else {
                return null;
            }
        }else {
            console.dir("Validation failed");
            return false;
        }
    }

    validatedFields() {
        let validated = true;
        // let fields = ["name", "numberPages", "authorId", "library"];
        // for(let i=0; i<fields.length; i++) {
        //     let field = fields[i];

        //     if(!this.validated(field))
        //         validated = false;
        //         break;
        // }
        let forms = window.forms || {}
        let insertForm = forms.bookInsertForm;
        if(insertForm)
        {
            if(!insertForm.checkValidity()) {
                alert("Insert all fields");
                return false;
            }
        }else alert("Valid");
        return validated;
    }
}