const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudentVerificationsSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: [true, "Please enter a semester"],
  },
  instituteFeeVerified: {
    type: Boolean,
  },
  hostelFeeVerified: {
    type: Boolean,
  },
  messFeeVerified: {
    type: Boolean,
  },
  resultPublished: {
    type: Boolean,
  },
  registrationVerified: {
    type: Boolean,
  },
});

module.exports = StudentVerifications = mongoose.model(
  "Student Verifications",
  StudentVerificationsSchema
);
