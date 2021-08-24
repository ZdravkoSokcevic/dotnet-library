import * as jQuery from './jquery.module.js';
import { Author } from './Author.js';
import { Order } from './Order.js';
import { User } from './User.js';
import { Book } from './Book.js';
import { Dom } from './Dom.js';

export class Api {
    
    constructor(type) {
        this.authors = []
        this.books = [];
        this.orders = [];
        this.users = [];
        this.type = type;
        this.baseUri = "http://localhost:5000/";
        this.authorGetPath= "author/all";
        this.bookGetPath = "book/all";
        this.orderGetPath = "order/all";
        this.orderPostPath = "order/insert";
        this.userGetPath = "user/all";
        this.postAuthorPath = "author/insert";
        this.postUserPath = "user/insert";
        this.postOrderPath = "order/insert";
        this.postBookPath = "book/insert";
        this.postEditBook = "book/edit/";
        this.libraryGetPath = "library/all";
        this.postLibraryPath = "library/insert"
        // Initial set
        this.url = '';
    }

    static fetchApi(url, method="get", data={}) {
        if(typeof data != "string") {
            // data= JSON.stringify(data);
        }
        return new Promise((res,rej) => {
            let headers = {}
            if(method =='POST') {
                // headers['Content-Type'] = 'multipart/form-data';
                // headers['Referrer-Policy'] = 'no-referrer';
                // headers['Referrer-Policy'] = 'origin-when-cross-origin';
                // headers['Content-Type'] = "application/json";

            }
            $.ajax({
                type: method,
                mode: "no-cors",
                url: url,
                data: data,
                dataType: "json",
                headers: headers,
                success: function (response) {
                    // console.log(response);
                }
            })
            .then(data => {
                res(data);
            })
            .catch((err,data) => {
                console.log(data);
                rej(err);
            });
        })
    }

    async fetchUsers () {
        this.url = this.baseUri + this.userGetPath;
        let users = await Api.fetchApi(this.url);
        this.users = users;
        return users;
    }

    async fetchBooks() {
        this.url = this.baseUri + this.bookGetPath;
        let books = await Api.fetchApi(this.url);
        this.books = books;
        return books;
    }

    async fetchOrderUserByBook(bookId) {
        this.url = this.baseUri + "order/book/"+bookId + "/info";
        let users = await Api.fetchApi(this.url);
        return users;
    }

    async deleteBook(bookId) {
        return new Promise(async(res,rej) => {
            this.url = this.baseUri + "book/delete/"+bookId;
            Api.fetchApi(this.url, "delete")
            .then(response => {
                console.log("RESPONSE");
                console.log(response);
                res(response);
            })
            .catch(response =>{
                if(response && response.status == 200) {
                    res("Done!");
                }else {
                    rej("Error");
                }
            });
        })
    }

    async fetchAuthors() {
        this.url = this.baseUri + this.authorGetPath;
        let authors = await Api.fetchApi(this.url);
        return authors;
    }

    async fetchUsers() {
        this.url = this.baseUri + this.userGetPath;
        let users = await Api.fetchApi(this.url);
        return users;
    }

    async fetchLibraries() {
        this.url = this.baseUri + this.libraryGetPath;
        let libraries = await Api.fetchApi(this.url);
        return libraries;
    }

    async postUserForm(form) {
        let data = await User.validateGetData();
        if(data) {
            this.url = this.baseUri + this.postUserPath;
            let success = await Api.fetchApi(this.url,"POST", data);
            alert("User added!");
            Dom.clearUserForm();
            // window.location.href = window.location.href;
        }
    }

    async postLibraryForm(form) {
        let forms = window.forms || {}
        let libraryForm = forms.libraryForm;
        if(libraryForm) {
            form = libraryForm;
            if(!form['name'] || form['name'] == '') {
                alert('Insert All fields');
            }
            let data = form;
            if(data) {
                this.url = this.baseUri + this.postLibraryPath;
                data = {
                    name: form['name'].value
                }
                console.log(data);
                let success = await Api.fetchApi(this.url,"POST", data);
                alert("Library added!");
                Dom.clearLibraryForm();
                // window.location.href = window.location.href;
            }
        }else {
            alert("Something wen't wrong");
        }
    }

    async postAuthorForm(form) {
        let data = await Author.validateGetData();
        if(data) {
            this.url = this.baseUri + this.postAuthorPath;
            let success = await Api.fetchApi(this.url,"POST", data);
            // localStorage.removeItem("author")
            alert("Author added!");
            Dom.clearAuthorForm()
            // window.location.href = window.location.href;
        }
    }

    async postOrderForm(form) {
        let data = await Order.validateGetData();
        if(data) {
            this.url = this.baseUri + this.postOrderPath;
            let success = await Api.fetchApi(this.url,"POST", data);
            alert("Order added!");
            Dom.clearOrderForm();
            // window.location.href = window.location.href;
        }
    }
    async postBookForm(form) {
        let data = await Book.validateGetData();
        if(data) {
            this.url = this.baseUri + this.postBookPath;
            let response = await Api.fetchApi(this.url,"POST", data);
            let book = new Book(response);
            book.render(window.allAuthors, true);
            alert("Book added!");
            Dom.clearBookInsertForm();
            // window.location.href = window.location.href;
        }
    }

    async editBook(data) {
        if(data) {
            this.url = this.baseUri + this.postEditBook + data.id;
            let d = {
                NumberPages: data.NumberPages,
                name: data.name,
                AuthorId: data.AuthorId
            }
            let success = await Api.fetchApi(this.url,"POST", d);
            alert("Book updated!");
            window.location.href = window.location.href;
        }
    }
}