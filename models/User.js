const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username : {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  role: {
    type: String,
    enum: ["student", "finance", "academic"],
    default: "student",
  },
});

module.exports = User = mongoose.model("user", UserSchema);
