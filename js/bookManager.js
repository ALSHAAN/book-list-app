const API_URL = "https://book-list-app-5f5r.onrender.com/api/books";



export async function getBooks() {
  const userId = localStorage.getItem("userId");

  const response = await fetch(`${API_URL}?userId=${userId}`);

  return await response.json();
}

export async function addBook(book) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(book)
  });

  return await response.json();
}

export async function removeBook(isbn) {
  const userId = localStorage.getItem("userId");

  await fetch(`${API_URL}/${isbn}?userId=${userId}`, {
    method: "DELETE"
  });
}