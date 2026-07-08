import { getBooks, addBook, removeBook } from "./bookManager.js";

const userId = localStorage.getItem("userId");

if (!userId) {
    window.location.href = "login.html";
}

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

const logoutBtn = document.getElementById("logout-btn");
const totalBooks = document.getElementById("total-books");
const readBooks = document.getElementById("read-books");
const readingBooks = document.getElementById("reading-books");
const notReadBooks = document.getElementById("notread-books");
const progressCircle = document.getElementById("progress-circle");

const progressPercent = document.getElementById("progress-percent");

const progressRead = document.getElementById("progress-read");

const progressReading = document.getElementById("progress-reading");

const progressNotRead = document.getElementById("progress-notread");

const confirmBox = document.getElementById("confirmBox");

const yesBtn = document.getElementById("yesBtn");

const noBtn = document.getElementById("noBtn");

let currentPage = 1;
const booksPerPage = 5;

let debounceTimer;
let allBooks = [];

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
async function loadBooks() {
    allBooks = await getBooks();
}
async function renderBooks(searchText = "") {
  try {
    const books = allBooks;

    const read = books.filter(book => book.status === "Read").length;

   const reading = books.filter(book => book.status === "Reading").length;

   const notRead = books.filter(book => book.status === "Not Read").length;

    const total = books.length;

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

   totalBooks.textContent = total;

readBooks.textContent = read;

readingBooks.textContent = reading;

notReadBooks.textContent = notRead;

  let completedPercent = 0;

if (total > 0) {
    completedPercent = Math.round((read / total) * 100);
}

progressPercent.textContent = completedPercent + "%";

const readingPercent =
    total > 0 ? Math.round((reading / total) * 100) : 0;

const notReadPercent =
    total > 0 ? Math.round((notRead / total) * 100) : 0;

progressRead.textContent =
    `${read} (${completedPercent}%)`;

progressReading.textContent =
    `${reading} (${readingPercent}%)`;

progressNotRead.textContent =
    `${notRead} (${notReadPercent}%)`;

const greenEnd = completedPercent;
const yellowEnd = completedPercent + readingPercent;

progressCircle.style.background = `
conic-gradient(
from -90deg,

#22c55e 0% ${greenEnd}%,
white ${greenEnd}% ${greenEnd + 1}%,

#facc15 ${greenEnd + 1}% ${yellowEnd}%,
white ${yellowEnd}% ${yellowEnd + 1}%,

#ef4444 ${yellowEnd + 1}% 100%
)
`;

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
  <td class="book-title">${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
 <td>
    <span class="genre-badge ${book.genre.toLowerCase().replace(/\s+/g, '-')}">
        ${book.genre}
    </span>
</td>

<td>
    <span class="status-badge ${book.status.toLowerCase().replace(/\s+/g, '-')}">
        ${book.status}
    </span>
</td>
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

  if (isbn.length < 6) {
    showAlert("ISBN must be at least 6 characters.", "error");
    return;
}

  if (title.length < 2) {
  showAlert("Book title must contain at least 2 characters.", "error");
  return;
}
  if (!/^[A-Za-z\s.]+$/.test(author)) {
  showAlert("Author name can contain only letters, spaces and periods.", "error");
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

confirmBox.style.display = "flex";
yesBtn.onclick = async () => {
    confirmBox.style.display = "none";
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
    await loadBooks();
    renderBooks();
};
noBtn.onclick = () => {
    confirmBox.style.display = "none";
};

    form.reset();

    showAlert(
      "Book added successfully!",
      "success"
    );

    await loadBooks();

    renderBooks();
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

    if (!confirm("Are you sure you want to delete this book?")) {
    return;
}

    await removeBook(isbn);

    showAlert(
      "Book removed successfully!",
      "success"
    );

    await loadBooks();
    renderBooks();
  } catch (error) {
    console.error("Delete Error:", error);
    showAlert("Failed to delete book", "error");
  }
});

document.addEventListener("DOMContentLoaded", async () => {

    await loadBooks();

    renderBooks();

});

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

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {

        currentPage = 1;

        renderBooks(searchInput.value);

    }, 300);

});


logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");

    window.location.href = "login.html";

});