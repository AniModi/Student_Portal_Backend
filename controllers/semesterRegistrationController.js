const StudentDocument = require("../models/StudentDocument");
const StudentVerifications = require("../models/StudentVerifications");

// @desc Register student for semester
// @route POST /api/registration/register
// @access Admin

async function register(req, res) {
  console.log(req.body);
  const { username, registrationForm, semester } = req.body;

  try {
    let studentDocument = await StudentDocument.findOne({
      username: username,
      semester: semester,
    });
    if (studentDocument) {
      studentDocument = await StudentDocument.findOneAndUpdate(
        { username: username, semester: semester },
        { registrationForm: registrationForm }
      );
    } else {
      studentDocument = new StudentDocument({
        username: username,
        registrationForm: registrationForm,
        semester: semester,
      });
      await studentDocument.save();
    }
    res.status(200).json({ success: true, data: studentDocument });
  } catch (err) {
    res.status(500).json({ success: false, data: err });
  }
}

// @desc Get student data for registration
// @route GET /api/registration/get-registration-details/:username/:semester
// @access Admin

async function getRegistrationDetails(req, res) {
  const { username, semester } = req.params;

  try {
    const studentDocument = await StudentDocument.findOne({
      username: username,
      semester: semester,
    });
    if (!studentDocument) {
      res.status(200).json({ success: true, data: null });
    }
    res.status(200).json({ success: true, data: studentDocument });
  } catch (err) {
    res.status(500).json({ success: false, data: err });
  }
}

async function getAllStudents(req, res) {
  try {
    const studentDocument = await StudentDocument.find({});
    const students = [];
    for (let i = 0; i < studentDocument.length; i++) {
      if (studentDocument[i].registrationForm) {
        students.push(studentDocument[i]);
      }
    }
    res.status(200).json({ success: true, data: students });
  } catch (err) {
    res.status(500).json({ success: false, data: err });
  }
}

const approveRegistration = async (req, res) => {
  try {
    const { username, semester } = req.params;

    const verify = await StudentVerifications.findOneAndUpdate(
      { username: username, semester: semester },
      {
        registrationVerified: true,
      }
    );
    res.status(200).json({ success: true, data: verify });
  } catch (err) {
    res.status(500).json({ success: false, data: err });
  }
};

async function isVerified(req, res) {
    try {
        const { username, semester } = req.params;
        const verify = await StudentVerifications.findOne({
        username: username,
        semester: semester,
        });
        if (!verify) {
        res.status(200).json({ success: true, data: null });
        }
        res.status(200).json({ success: true, data: verify });
    } catch (err) {
        res.status(500).json({ success: false, data: err });
    }
}

module.exports = {
  register,
  getRegistrationDetails,
  getAllStudents,
  approveRegistration,
    isVerified,
};
