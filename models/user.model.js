const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.export = mongoose.model("user", usersSchema);
