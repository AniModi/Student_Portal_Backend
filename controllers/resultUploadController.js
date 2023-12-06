const StudentDocument = require("../models/StudentDocument");

async function uploadResult(req, res) {
  try {
    const { username, semester, hash } = req.body;
    let studentDocuments = await StudentDocument.findOne({
      username: username,
      semester: semester,
    });

    if (studentDocuments) {
      studentDocuments = await StudentDocument.findOneAndUpdate(
        {
          username: username,
          semester: semester,
        },
        {
          $set: {
            result: hash,
          },
        },
        {
          new: true,
        }
      );
      res.status(200).json({
        message: "Result uploaded successfully",
      });
    } else {
      const newStudentDocument = new StudentDocument({
        username: username,
        semester: semester,
        result: hash,
      });
      await newStudentDocument.save();
      res.status(200).json({
        message: "Result uploaded successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = {
  uploadResult,
};
