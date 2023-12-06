const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const feeReferences = new Schema({
  username: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  instituteFeeReferences: {
    type: String,
  },
  hostelFeeReferences: {
    type: String,
  },
  messFeeReferences: {
    type: String,
  },
});

module.exports = FeeReferences = mongoose.model(
  "Fee References",
  feeReferences
);
