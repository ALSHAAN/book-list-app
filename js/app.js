import { getBooks, addBook, removeBook } from "./bookManager.js";

const form = document.getElementById("book-form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const isbnInput = document.getElementById("isbn");
const bookList = document.getElementById("book-list");
const alertContainer = document.getElementById("alert-container");

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

async function renderBooks() {
  try {
    const books = await getBooks();

    bookList.innerHTML = "";

    if (!books || books.length === 0) {
      bookList.innerHTML = `
        <tr>
          <td colspan="4" style="text-align:center;">
            No books in collection.
          </td>
        </tr>
      `;
      return;
    }

    books.forEach((book) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>
          <button class="btn-delete" data-isbn="${book.isbn}">
            Delete
          </button>
        </td>
      `;

      bookList.appendChild(row);
    });
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

  if (!title || !author || !isbn) {
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