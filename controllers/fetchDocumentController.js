const StudentDocument = require("../models/StudentDocument");


async function fetchDocuments(req, res) {
  try {
    const { semester, username } = req.params;
    const documents = await StudentDocument.findOne({ semester, username });
    res.json(documents);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
}


module.exports = {fetchDocuments};