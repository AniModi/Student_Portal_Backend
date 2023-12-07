const StudentDocument = require("../models/StudentDocument");
const StudentVerification = require("../models/StudentVerifications");

async function uploadResult(req, res) {
  try {
    console.log("uploadResult", req.body);
    const { username, semester, result } = req.body;
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
            result: result,
          },
        },
        {
          new: true,
        }
      );
      const verifications = await StudentVerification.findOneAndUpdate({
        username: username,
        semester: semester,
      }, {
        $set: {
          resultPublished: true
        }
      }, {
        new: true
      });
      res.status(200).json({
        message: "Result uploaded successfully",
        data : studentDocuments
      });
    } else {
      const newStudentDocument = new StudentDocument({
        username: username,
        semester: semester,
        result: result,
      });
      await newStudentDocument.save();
      res.status(200).json({
        message: "Result uploaded successfully",
        data : newStudentDocument
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err,
    });
  }
}

module.exports = {
  uploadResult,
};
