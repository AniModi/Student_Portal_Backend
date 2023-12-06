const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentDocumentSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  registrationForm: {
    type: String,
  },
  result : {
    type: String,
  },
  instituteFeeReceipt: {
    type: String,
  },
  hostelFeeReceipt: {
    type: String,
  },
  messFeeReceipt: {
    type: String,
  },
});

module.exports = StudentDocument = mongoose.model(
  "Student Documents",
  studentDocumentSchema
);
