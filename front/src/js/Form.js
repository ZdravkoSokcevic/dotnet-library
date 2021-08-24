import { Api } from "./Api.js";
export class Form {
    static makeForm(action, elTitle, className, name = "") {
        let form = document.createElement("form");
        if(elTitle != '') {
            let title = document.createElement("h3");
            title.innerHTML = elTitle;
            form.appendChild(title);
        }

        form.action = action;
        form.classList.add(className);
        form.setAttribute("method", "POST");
        
        // Append it to window, to easier manipulate
        if(name != '') {
            let forms = window.forms || {}
            forms[name] = form;
        }

        return form;
    }
    static onTextChange = (e, type) => {
        let input = e.target;
        let name = input.getAttribute("name");
        let value = input.value;
        if(value !== '') {
            let data = localStorage.getItem(type);
            if(data && data != null) {
                data = JSON.parse(data);
                if(data != null)
                    data[name] = value;
                else {
                    data = {}
                    data[name] = value;
                }
            }else {
                let data = {}
                data[name] = value;
            }
            localStorage.setItem(type, JSON.stringify(data));
        }
    }
    static makeTextInput(form, label, name, placeholder="", type) {
        let inputContainer = document.createElement("div");
        inputContainer.classList.add("form-group");
        inputContainer.classList.add("mt-1");

        let inputLabel = document.createElement("label");
        inputLabel.setAttribute("for", "input");
        inputLabel.innerHTML = label;

        inputContainer.appendChild(inputLabel);

        let input = document.createElement("input");
        input.classList.add("form-control");
        input.setAttribute("id", "input");
        input.setAttribute("name", name);
        input.setAttribute("aria-describedby", "name");
        input.setAttribute("placeholder", placeholder);
        input.setAttribute("required", true);
        input.setAttribute("autocomplete", "off");
        
        input.addEventListener("change", e=> Form.onTextChange(e,type), false);
        input.addEventListener("click", e => Form.onTextChange(e,type), false);
        input.addEventListener("keyup", e => Form.onTextChange(e,type), false);
        // input.addEventListener("change keyup click", function() {

        // })

        inputContainer.appendChild(input);

        if(form && form instanceof HTMLElement) {
            form.appendChild(inputContainer);
        }
        return input;
    }

    static makeSelectInput(form, label, name, placeholder="", inputName, dataName, data) {
        let inputContainer = document.createElement("div");
        inputContainer.classList.add("form-group");
        inputContainer.classList.add("mt-1");

        let inputLabel = document.createElement("label");
        inputLabel.setAttribute("for", "input");
        inputLabel.innerHTML = label;

        inputContainer.appendChild(inputLabel);

        let select = document.createElement("select");
        select.classList.add("form-control");
        select.setAttribute("id", "input");
        select.setAttribute("name", name);

        select.addEventListener("change", function() {
            if(select.value !== '') {
                let value = select.value;
                let data = localStorage.getItem(inputName);
                if(data && data != null) {
                    data = JSON.parse(data);
                    if(data != null)
                        data[dataName] = value;
                    else {
                        data = {}
                        data[dataName] = value;
                    }
                }else {
                    let data = {}
                    data[dataName] = value;
                }
                localStorage.setItem(inputName, JSON.stringify(data));
            }
        });

        let option = document.createElement("option");
        option.innerText = "Select " + dataName.charAt(0).toUpperCase() + dataName.slice(1);
        option.value = "2";
        option.setAttribute("disabled", true);
        option.setAttribute("selected", true);
        
        select.appendChild(option);

        console.error("DATA NAME");
        // console.error(dataName);
        // console.log(data);
        console.error("DATA NAME");
        console.log(dataName);
        switch(dataName) {
            case "user":
            {
                data.forEach(user => {
                    let option = document.createElement("option");
                    option.value = user.id;
                    option.innerHTML = user.firstName + " " + user.lastName;
                    select.appendChild(option);
                })
                break;
            }
            case "book":
            {
                data.forEach(book => {
                    let option = document.createElement("option");
                    option.value = book.id;
                    option.innerHTML = book.name;
                    select.appendChild(option);
                })
                break;
            }
            case "library":
                {
                    data.forEach(library => {
                        let option = document.createElement("option");
                        option.value = library.id;
                        option.innerHTML = library.name;
                        select.appendChild(option);
                    })
                    break;
                }
            case "author":
            {
                data.forEach(author => {
                    console.log(author);
                    if(author && author.firstName != undefined && author.lastName != undefined)
                    {
                        let option = document.createElement("option");
                        option.setAttribute("data-id", author.id);
                        option.innerText = author.firstName + " " + author.lastName;
                        // *****************************************************
                        // ToDo, onchange use data-id to put in select value
                        // *****************************************************
                        // option.addEventListener("click", function() {
                        //     console.log("kliknuto");
                        //     select.value= this.getAttribute("data-id");
                        // })
                        // let option = new Option(author.firstName + " " + author.lastName," author.id")
                        // console.log($(select));
                        // $(select).append($('<option></option>').val(author.id.toString()).html(author.firstName + " " + author.lastName));
                        // option.setAttribute("value", author.id);
                        // $(option).val(author.id.toString());
                        // option.innerHTML = author.firstName + " " + author.lastName;
                        // select.innerHTML += option;
                        select.appendChild(option);
                    }
                })

                // let options = $(select).find("option");
                // option.addEventListener("change", () => {

                // })
                // options.each((el, option) => {
                //     option.addEventListener("keyup", function() {
                //         console.log("kliknuto");
                //         select.value = this.getAttribute("data-id");
                //     })
                // })
                break;
            }
        }
        
        // select.addEventListener("click", async() => {
        //     if(input.value !== '') {
        //         let data = localStorage.getItem(form);
        //         if(data) {
        //             data = JSON.parse(data);
        //             data[name] = input.value;
        //         }else {
        //             let data = {}
        //             data[name] = input.value;
        //         }
        //         localStorage.setItem(type, form,JSON.stringify(data));
        //     }
        // })

        inputContainer.appendChild(select);

        if(form && form instanceof HTMLElement) {
            form.appendChild(inputContainer);
        }
        return inputContainer;  
    }

    static makeFormButton(type, label, form) {
        let api = new Api();
        let buttonContainer = document.createElement("div");
        buttonContainer.classList.add("form-group");
        buttonContainer.classList.add("text-end");
        buttonContainer.classList.add("mt-1");

        let button = document.createElement("button");
        button.classList.add("btn");
        button.classList.add("btn-secondary");
        button.setAttribute("type", "button");
        button.addEventListener("click", () => {

            switch(type) {
                case 'user': 
                {
                    api.postUserForm(form);
                    break;
                }
                case 'author': 
                {
                    api.postAuthorForm(form);
                    break;
                }
                case 'order': 
                {
                    api.postOrderForm(form);
                    break;
                }
                case 'book': 
                {
                    api.postBookForm(form);
                    break;
                }
                case 'library':
                {
                    console.log('Api call library');
                    api.postLibraryForm(form);
                    break;
                }
            }
        });
        button.innerHTML = label;

        buttonContainer.appendChild(button);

        return buttonContainer;
    }

    static makeFormContainer(container = document.getElementById("container")) {
        let div = document.createElement("div")
        div.classList.add("form-container");
        div.classList.add("flex-row");

        container.appendChild(div);
        return div;
    }

}