# book-list-app
Project-link : https://book-list-app-peach.vercel.app/

# Book List Manager

## Overview

Book List Manager is a full-stack web application that allows users to register, log in, and manage their personal book collection. Users can add, view, and delete books while organizing them using Genre and Reading Status. The application features a responsive frontend built with HTML, CSS, and JavaScript, a backend developed with Node.js and Express.js, and uses MongoDB Atlas for cloud-based data storage.

## Features

* User Signup and Login Authentication
* Add new books
* View all books
* Delete books
* Organize books using Genre
* Track reading progress with Status (Read, Reading, Not Read)
* Store user and book data in MongoDB Atlas
* SQLite integration for local database support

## Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript (ES6)

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose
* Sqlite

## Project Structure

```text
book-list-app/
│
├── index.html              # Signup Page (Landing Page)
├── login.html              # User Login Page
├── books.html              # Book List Manager Dashboard
├── style.css               # Common Stylesheet
├── README.md
│
├── images/
│   ├── booki2.jpg
│   ├── signup-bg.jpg
│   └── login-bg.jpg
│
├── js/
│   ├── app.js              # Frontend Application Logic
│   └── bookManager.js      # API Communication
│
└── server/
    ├── server.js
    ├── package.json
    ├── .env
    │
    ├── config/
    │   └── sqlite.js
    │
    ├── database/
    │   └── books.db
    │
    ├── models/
    │   ├── Book.js
    │   └── User.js
    │
    ├── routes/
    │   ├── books.js
    │   └── auth.js
    │
    └── node_modules/
```

## API Endpoints

### Get All Books

```http
GET /api/books
```

### Add a Book

```http
POST /api/books
```

### Delete a Book

```http
DELETE /api/books/:isbn
```


### Start Backend

```bash
node server.js
```

### Run Frontend

Open `index.html` using Live Server or any local development server.

## Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas , Sqlite

