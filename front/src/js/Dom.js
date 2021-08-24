import { Form } from "./Form.js";

export class Dom {
    createElement(el, classNames = [], html, parent=false) {
        let element = document.createElement(el);
        if(classNames.length) {
            classNames.forEach(className => {
                element.classList.add(className); 
            });
        }
        element.innerHTML = html;
        if(parent) 
            parent.appendChild(element);
        return element;
    }

    static openBookInfoModal() {
        
    }

    static makeRow(container) {
        return new Dom().createElement("div", ["row"],"", container =window.container)

    }

    static AddFormsLeft(users, books, libraries) {
        let fContainer = Form.makeFormContainer();

        let libaryShowContainer = new Dom().createElement("div", ["form-library", "p-2"],"", window.container);
        let libraryShowForm =  Form.makeForm("", "Libraries", "form");
        Form.makeSelectInput(libraryShowForm, "Libraries", "libraryId","","library", "library", libraries);
        libaryShowContainer.appendChild(libraryShowForm);

        // Library form
        let libraryFormContainer = new Dom().createElement("div", ["form-library", "p-2"],"", window.container);
        let libraryForm = Form.makeForm("/library/insert", "Add library", "form");
        
        Form.makeTextInput(libraryForm, "Name", "name", "", "library");
        let librarySubmit = Form.makeFormButton("library", "Submit", libraryForm);
        libraryForm.appendChild(librarySubmit);
        
        libraryFormContainer.appendChild(libraryForm);

        // Author
        let authorFormContainer = new Dom().createElement("div", ["form-author", "p-2"], "",window.container);
        let authorForm = Form.makeForm("/author/insert", "Add author", "form");

        Form.makeTextInput(authorForm, "First name", "firstName", "", "author");
        Form.makeTextInput(authorForm, "Last name", "lastName","", "author");
        Form.makeTextInput(authorForm, "City", "city","", "author");
        authorForm.setAttribute("name", "author_form");

        let submit = Form.makeFormButton("author","Submit", authorForm);

        authorForm.appendChild(submit);

        // User
        let userFormContainer = new Dom().createElement("div", ["form-user", "p-2"],"", window.container);
        let userForm = Form.makeForm("/user/insert", "Add user", "form");

        Form.makeTextInput(userForm, "First name", "firstName", "", "user");
        Form.makeTextInput(userForm, "Last name", "lastName","", "user");
        Form.makeTextInput(userForm, "Email", "email","", "user");
        
        let userSubmit = Form.makeFormButton("user", "Submit", userForm);
        userForm.appendChild(userSubmit);

        let orderFormContainer = new Dom().createElement("div", ["form-order", "p-2"], "", window.container);
        let orderForm = Form.makeForm("/order/insert", "Add order", "form");

        Form.makeSelectInput(orderForm, "User", "userId", "","order", "user", users);
        Form.makeSelectInput(orderForm, "Book", "bookId","","order", "book", books);
        
        let orderSubmit = Form.makeFormButton("order", "Submit", orderForm);
        orderForm.appendChild(orderSubmit);

        authorFormContainer.appendChild(authorForm);
        userFormContainer.appendChild(userForm);
        orderFormContainer.appendChild(orderForm);

        fContainer.appendChild(libaryShowContainer);
        fContainer.appendChild(libraryFormContainer)
        fContainer.appendChild(authorFormContainer);
        fContainer.appendChild(userFormContainer);
        fContainer.appendChild(orderFormContainer);

        window.forms = window.forms || {};
        window.forms.libraryForm = libraryForm;
        window.forms.authorForm = authorForm;
        window.forms.userForm = userForm;
        window.forms.orderForm = orderForm;
    }

    static clearBookInsertForm = () => {
        let forms = window.forms || {}
        if(forms.bookInsertForm) {
            let form = forms.bookInsertForm;
            form["name"].value = "";
            form.numberPages.value = "";
        }
    }

    static clearAuthorForm = () => {
        let forms = window.forms || {}
        if(forms.authorForm) {
            let form = forms.authorForm;
            form["firstName"].value = "";
            form["lastName"].value = "";
            form["city"].value = "";
        }
    }

    static clearUserForm = () => {
        let forms = window.forms || {}
        if(forms.userForm) {
            let form = forms.userForm;
            form["firstName"].value = "";
            form["lastName"].value = "";
            form.email.value = "";
        }
    }

    static clearLibraryForm = () => {
        let forms = window.forms || {}
        if(forms.libraryForm) {
            let form = forms.libraryForm;
            form["name"].value = "";
        }
    }

    static clearOrderForm = () => {
        let forms = window.forms || {}
        if(forms.orderForm) {
            let form = forms.orderForm;
            let userSelect = form.userId;
            let bookSelect = form.bookId;
            let userInputs = $(userSelect).find("option");
            let bookInputs = $(bookSelect).find("option");
            userInputs.each((ind, el) => {
                if(ind>0)
                    el.removeAttribute("selected");
                else {
                    el.setAttribute("selected", "selected");
                    userSelect.value = "intial";
                }
            })
            bookInputs.each((ind, el) => {
                if(ind>0) 
                    el.removeAttribute("selected")
                else {
                    el.setAttribute("selected", "selected");
                    bookSelect.value = "intial";
                }
            })
        }
    }
}