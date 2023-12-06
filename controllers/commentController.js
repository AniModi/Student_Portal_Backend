const Comments = require("../models/comments");

const financeComments = async (req, res) => {
  try {
    console.log(req.body);
    const { username, semester, comment } = req.body;

    let newComment = await Comments.findOne({ username, semester });

    if (newComment) {
      newComment = await Comments.findOneAndUpdate(
        { username, semester },
        { financeComments : comment }
      );
    } else {
      newComment = await new Comments({
        username,
        semester,
        financeComments : comment,
      });
      newComment.save();
    }
    res.status(201).json({ message: "Comment added!", newComment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const facultyComments = async (req, res) => {
  try {
    const { username, semester, comment } = req.body;
    let newComment = await Comments.findOne({ username, semester });

    if (newComment) {
      newComment = await Comments.findOneAndUpdate(
        { username, semester },
        { facultyComments : comment }
      );
    } else {
      newComment = await new Comments({
        username,
        semester,
        facultyComments : comment,
      });
      newComment.save();
      res.status(201).json({ message: "Comment added!" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getComments = async (req, res) => {
  const { username, semester } = req.params;
  let newComment = await Comments.findOne({ username, semester });
  res.status(200).json({ newComment })
};

module.exports = {
  financeComments,
  facultyComments,
  getComments
};
