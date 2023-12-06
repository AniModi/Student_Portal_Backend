const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentsSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  financeComments: {
    type: String,
  },
  facultyComments: {
    type: String,
  }
});

module.exports = Comments = mongoose.model(
  "Comments",
  commentsSchema
);
