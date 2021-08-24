import {Api} from "./Api.js";
import { Dom } from "./Dom.js";
import { Form } from "./Form.js";


let html = `
<div class="modal" tabindex="-1" role="dialog" id="modal">
    <div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">{$title}</h5>
            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            {$body}
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-danger" id="delete-book">Delete</button>
        </div>
    </div>
    </div>
</div>
`;
export class Modal {
    api = new Api();
    constructor() {}
    writeModal(title, body, editForm=false) {
        let oldModal = document.getElementById("modal");
        if(oldModal)
            oldModal.remove();
        let modal = document.createElement("div");
        modal.setAttribute("id", "modal");
        modal.setAttribute("role", "dialog");
        modal.setAttribute("tabIndex", "-1");
        modal.classList.add("modal");

        let modal_dialog = document.createElement("div");
        modal_dialog.setAttribute("role", "document");
        modal_dialog.classList.add("modal-dialog");

        modal.appendChild(modal_dialog);
        // let modal_cont = document.createElement("div");
        // modal_cont.setAttribute("id", "modal");
        // modal_cont.setAttribute("role", "dialog");
        // modal_cont.setAttribute("tabIndex", "-1");
        // modal_cont.classList.add("modal");

        let modal_cont = document.createElement("div");
        modal_cont.classList.add("modal-content");

        modal.appendChild(modal_cont);

        let modal_header = document.createElement("div");
        modal_header.classList.add("modal-header");

        let modal_title = document.createElement("h5");
        modal_title.classList.add("modal-title");
        modal_title.innerHTML = title;

        modal_header.appendChild(modal_title);

        let button_close = document.createElement("button");
        button_close.setAttribute("class", "close");
        button_close.setAttribute("type", "button");
        button_close.setAttribute("data-bs-dismiss", "modal");
        button_close.setAttribute("aria-label", "Close");

        let button_close_span = document.createElement("span");
        button_close_span.setAttribute("aria-hidden", "true");
        button_close_span.innerHTML="&times;";
        
        button_close.appendChild(button_close_span);
        modal_header.appendChild(button_close);

        let modal_body = document.createElement("div");
        modal_body.classList.add("modal-body");
        modal_body.innerHTML = body;

        let modal_footer = document.createElement("div");
        modal_footer.classList.add("modal-footer");

        let footer_save = document.createElement("button");
        footer_save.setAttribute("type", "button");
        footer_save.classList.add("btn");
        footer_save.classList.add("btn-primary");
        footer_save.innerHTML = "Save changes";

        modal_footer.appendChild(footer_save);

        let footer_delete = document.createElement("button");
        footer_delete.setAttribute("type", "button");
        footer_delete.setAttribute("id", "delete-button");
        footer_delete.classList.add("btn");
        footer_delete.classList.add("btn-danger");
        $(footer_delete).text("Delete book");

        modal_footer.appendChild(footer_delete);

        modal_cont.appendChild(modal_header);
        modal_cont.appendChild(modal_body);
        modal_cont.appendChild(modal_footer);

        return {
            modal: modal,
            saveBtn: footer_save
        };
    }
    openModal(title, body) {
        let oldModals = document.querySelectorAll(".modal");
        if(oldModals) {
            oldModals.forEach(modal => {
                modal.remove();
            })
            // document.body.removeChild(document.getElementById("modal"));
        }
        let modal = html;
        modal = modal.replace("{$title}", title, html);
        modal = modal.replace("{$body}", body, html);

        document.body.insertAdjacentHTML("beforeend", modal);
        $(modal).modal('show');

        return modal;
    }

    static openBookInfoModal(book, html, classNames) {
        let api = new Api();
        api.fetchOrderUserByBook(book.id).then(res => {
            let title = book.name + "(" + book.numberPages + " pages)" + " - " + book.author.firstName + " " + book.author.lastName;
            let modal = new Modal().openModal(title, "");
            let user_container = document.createElement("div");
            let user_container_title = document.createElement("h2")
            user_container_title.innerHTML = "Users:";
            user_container.appendChild(user_container_title);
            if(res && res.users) {
                res.users.forEach(user => {
                    let div = document.createElement("li");
                    div.classList.add("list-item");
                    let text = document.createElement("span");
                    text.innerHTML = user.firstName + " " + user.lastName;
                    div.appendChild(text);
                    user_container.appendChild(div);
                })
            }
            document.querySelectorAll('.modal .modal-body').forEach(modal => {
                modal.appendChild(user_container);
            })

            $(modal).show();

            let deleteButton = document.querySelectorAll('.modal #delete-book');
            if(deleteButton) {
                deleteButton.forEach(button => {
                    button.addEventListener("click", function() {
                        console.log(book);
                        new Api().deleteBook(book.id).then(res => {
                            // console.log(("#modal").modal());
                            $(".modal").remove();
                            $('.modal-backdrop').remove();
                            // Todo Remove book container
                            book.row.remove();
                            console.log(user_container);
                            // window.location.href = window.location.href;
                        }).catch(err => { 
                            console.log(err);
                        })
                    })
                })
            }
            // DOdatna funkcionalnost
            return modal;
        });
    }

    static openEditInfoModal(data, authors) {
        
        let bookFormContainer = new Dom().createElement("div", ["form-book", "p-1"], "",window.container);
        let bookForm = Form.makeForm("/author/insert", "", "form");
        let name = Form.makeTextInput(bookForm, "Name", "name", "New Name", "book");
        name.value = data.name;
        let numberPages = Form.makeTextInput(bookForm, "Number of Pages", "numberPages","Number pages", "book");
        numberPages.value = data.numberPages;
        let authorId = Form.makeSelectInput(bookForm, "Author", "author", "","book", "author", authors);
        let selects = $(authorId).find("option");
        $.each(selects, (index, el) => {
            if(el.value = data.authorId)
                el.setAttribute("selected", "selected");
        })

        let {modal, saveBtn} = new Modal().writeModal("Edit Book", bookForm.innerHTML);
        modal.classList.add("edit-book-modal");
        let user_container = document.createElement("div");
        let user_container_title = document.createElement("h2")
        user_container_title.innerHTML = "";
        user_container.appendChild(user_container_title);
    
        document.body.appendChild(modal)
        $(modal).show();
        
        saveBtn.addEventListener("click", () => {
            let postData = {
                id: data.id,
                name: bookForm.name.value,
                NumberPages: bookForm.numberPages.value,
                AuthorId: data.authorId ?? 1
            }
            // $(bookForm).find('option').each((index, option) => {
            //     console.log(option.getAttribute("selected") == "true", option.getAttribute("selected"));
            //     if(option.getAttribute("selected") == "true") {
            //         console.log(option);
            //         postData.authorId = option.getAttribute('data-id');
            //     }
            // })
            let api = new Api();
            api.editBook(postData);
        })
        
        // bookFormContainer.appendChild(bookForm);

        // container.appendChild(bookFormContainer);

        if(window.row)
            window.row = container;
    }
}