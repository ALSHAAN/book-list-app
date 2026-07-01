import { getBooks, addBook, removeBook } from "./bookManager.js";


const searchInput = document.getElementById("search");
const form = document.getElementById("book-form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const isbnInput = document.getElementById("isbn");
const genreInput = document.getElementById("genre");
const statusInput = document.getElementById("status");
const bookList = document.getElementById("book-list");
const alertContainer = document.getElementById("alert-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const pageInfo = document.getElementById("page-info");

let currentPage = 1;
const booksPerPage = 5;

function showAlert(message, type) {
  alertContainer.innerHTML = `
    <div class="alert alert-${type}">
      ${message}
    </div>
  `;

  setTimeout(() => {
    alertContainer.innerHTML = "";
  }, 3000);
}

async function renderBooks(searchText = "") {
  try {
    const books = await getBooks();
    const filteredBooks = books.filter((book) => {
    const search = searchText.toLowerCase();

  return (
    book.title.toLowerCase().includes(search) ||
    book.author.toLowerCase().includes(search) ||
    book.isbn.toLowerCase().includes(search) ||
    book.genre.toLowerCase().includes(search) ||
    book.status.toLowerCase().includes(search)
  );
});
   const start = (currentPage - 1) * booksPerPage;
   const end = start + booksPerPage;

   const paginatedBooks = filteredBooks.slice(start, end);

    bookList.innerHTML = "";

    if (filteredBooks.length === 0) {
      bookList.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center;">
            No books in collection.
          </td>
        </tr>
      `;
      return;
    }

    paginatedBooks.forEach((book) => {
      const row = document.createElement("tr");

      row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td>${book.genre || "-"}</td>
  <td>${book.status || "-"}</td>
  <td>
    <button class="btn-delete" data-isbn="${book.isbn}">
      Delete
    </button>
  </td>
`;

      bookList.appendChild(row);
    });
    const totalPages = Math.max(1, Math.ceil(filteredBooks.length / booksPerPage));

    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

     prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  } catch (error) {
    console.error("Render Error:", error);
    showAlert("Failed to load books", "error");
  }
  



}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const isbn = isbnInput.value.trim();
  const genre = genreInput.value.trim();
  const status = statusInput.value; 

  if (!title || !author || !isbn || !genre || !status) {
    showAlert("Please fill in all fields", "error");
    return;
  }

  try {
    const books = await getBooks();

    const exists = books.some(
      (book) => book.isbn === isbn
    );

    if (exists) {
      showAlert(
        "A book with this ISBN already exists!",
        "error"
      );
      return;
    }

    await addBook({
      title,
      author,
      isbn,
      genre,
      status
});

    form.reset();

    showAlert(
      "Book added successfully!",
      "success"
    );

    await renderBooks();
  } catch (error) {
    console.error("Add Error:", error);
    showAlert("Failed to add book", "error");
  }
});

bookList.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("btn-delete")) {
    return;
  }

  try {
    const isbn = e.target.dataset.isbn;

    await removeBook(isbn);

    showAlert(
      "Book removed successfully!",
      "success"
    );

    await renderBooks();
  } catch (error) {
    console.error("Delete Error:", error);
    showAlert("Failed to delete book", "error");
  }
});

document.addEventListener(
  "DOMContentLoaded",
  async () => {
    await renderBooks();
  }
);


prevBtn.addEventListener("click", () => {

    if(currentPage > 1){

        currentPage--;

        renderBooks(searchInput.value);

    }

});

nextBtn.addEventListener("click", () => {

    currentPage++;

    renderBooks(searchInput.value);

});

searchInput.addEventListener("input", () => {

    currentPage = 1;

    renderBooks(searchInput.value);

});