

import { getBooks, addBook, removeBook } from './bookManager.js';

const form = document.getElementById('book-form');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const isbnInput = document.getElementById('isbn');
const bookList = document.getElementById('book-list');
const alertContainer = document.getElementById('alert-container');


function showAlert(message, type) {
 
  alertContainer.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
  
  
  setTimeout(() => {
    alertContainer.innerHTML = '';
  }, 3000);
}


function renderBooks() {
  const books = getBooks();
  bookList.innerHTML = '';

  if (books.length === 0) {
    bookList.innerHTML = `
      <tr>
        <td colspan="4" style="text-align: center; color: var(--text-muted);">
          No books in collection.
        </td>
      </tr>
    `;
    return;
  }

  books.forEach(book => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><button class="btn-delete" data-isbn="${book.isbn}">Delete</button></td>
    `;
    bookList.appendChild(row);
  });
}


form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const isbn = isbnInput.value.trim();


  if (!title || !author || !isbn) {
    showAlert('Please fill in all fields', 'error');
    return;
  }


  const books = getBooks();
  const isbnExists = books.some(book => book.isbn === isbn);
  if (isbnExists) {
    showAlert('A book with this ISBN already exists!', 'error');
    return;
  }

  
  addBook({ title, author, isbn });
  showAlert('Book added successfully!', 'success');
  form.reset();
  titleInput.focus();
  renderBooks();
});


bookList.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-delete')) {
    const isbn = e.target.getAttribute('data-isbn');
    removeBook(isbn);
    showAlert('Book removed successfully!', 'success');
    renderBooks();
  }
});


document.addEventListener('DOMContentLoaded', renderBooks);
