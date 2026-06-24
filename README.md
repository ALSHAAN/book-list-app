# book-list-app
Project-link : https://book-list-app-peach.vercel.app/

# Book List Manager

## Overview

Book List Manager is a full-stack web application that allows users to add, view, and delete books. The application uses a responsive frontend built with HTML, CSS, and JavaScript, a backend built with Node.js and Express.js, and MongoDB Atlas for cloud-based data storage.

## Features

* Add new books
* View all books
* Delete books
* Store book data in MongoDB Atlas
* Fetch API for frontend-backend communication

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
* Database: MongoDB Atlas

