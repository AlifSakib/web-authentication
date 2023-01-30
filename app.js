require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 500;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/./views/index.html");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
