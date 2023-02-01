require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dbURL = process.env.MONGO_URL;
const User = require("./models/user.model");

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("DataBase Connected");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/./views/index.html");
});

app.post("/register", async (req, res) => {
  // const { email, password } = req.body;
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user && user.password === password) {
      res.status(200).json({ status: "Valid User" });
    } else {
      res.status(404).json({ status: "Invalid User" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
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
    message: "Server Broken",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
