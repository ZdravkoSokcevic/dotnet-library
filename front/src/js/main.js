
import * as Api from './Api.js';
import * as Book from './Book.js';
import { Dom } from './Dom.js';
// let data = {};
let api = new Api.Api();
// console.log(api);
let container = document.getElementById("container");
window.container = container;
let initApp = async () => {
    let books = await api.fetchBooks();
    let authors = await api.fetchAuthors();
    let users = await api.fetchUsers();
    let libraries = await api.fetchLibraries();
    window.libraries = libraries;
    window.allBooks = books;
    window.allAuthors = authors;
    window.allUsers = users;
    Dom.AddFormsLeft(users,books,libraries);
    books.forEach(book => {
        book = new Book.Book(book);
        book.render(authors);
    })
    Book.Book.makeBookForm(authors, libraries);
}
initApp()

