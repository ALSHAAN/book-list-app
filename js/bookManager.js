const API_URL = "https://book-list-app-5f5r.onrender.com/api/books";



export async function getBooks() {

    const response = await fetch(API_URL, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });

    const data = await response.json();

    console.log(data);

    return data;
}

export async function addBook(book) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(book)
  });
  return await response.json();
}

export async function removeBook(isbn) {
  
  await fetch(`${API_URL}/${isbn}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
}