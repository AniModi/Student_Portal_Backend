const Comments = require("../models/comments");

const financeComments = (req, res) => {
  try {
    const { username, semester, financeComments } = req.body;
    const newComment = new Comments({
      username,
      semester,
      financeComments,
    });
    newComment
      .save()
      .then(() => res.json("Comment added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const facultyComments = (req, res) => {
  try {
    const { username, semester, facultyComments } = req.body;
    const newComment = new Comments({
      username,
      semester,
      facultyComments,
    });
    newComment
      .save()
      .then(() => res.json("Comment added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    financeComments,
    facultyComments,
}