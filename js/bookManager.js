
export function getBooks() {
  const books = localStorage.getItem('books');
  return books ? JSON.parse(books) : [];
}


export function addBook(book) {
  const books = getBooks();
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
}


export function removeBook(isbn) {
  const books = getBooks();
  const filteredBooks = books.filter(book => book.isbn !== isbn);
  localStorage.setItem('books', JSON.stringify(filteredBooks));
}
