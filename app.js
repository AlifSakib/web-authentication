require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/./views/index.html");
});

app.post("/register", (req, res) => {
  const { email, password } = req.body;
  res.status(201).json({ email, password });
});
app.post("/login", (req, res) => {
  res.status(200).json({ message: "User Loged In" });
});

//Route Not Found Error
app.use((req, res, next) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

//Handling Server Error
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Something Broken",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
