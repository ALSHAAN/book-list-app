const API_URL = "https://book-list-app-5f5r.onrender.com";

export async function getBooks() {
  const response = await fetch(API_URL);
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
  await fetch(`${API_URL}/${isbn}`, {
    method: "DELETE"
  });
}