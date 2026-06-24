require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("./config/sqlite");

const app = express();

app.use(cors());
app.use(express.json());

const bookRoutes = require("./routes/books");
const authRoutes = require("./routes/auth");

app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});