const jwt = require("jsonwebtoken");

const StudentDocument = require("../models/StudentDocument");

// @desc Register student for semester
// @route POST /api/registration/register
// @access Admin

async function register(req, res) {
    console.log(req.body);
  const {username, registrationForm, semester} = req.body;

    try {
        let studentDocument = await StudentDocument.findOne({username: username, semester: semester});
        if(studentDocument){
            studentDocument = await StudentDocument.findOneAndUpdate({username: username, semester: semester}, {registrationForm: registrationForm});
        }
        else {
            studentDocument = new StudentDocument({username: username, registrationForm: registrationForm, semester: semester});
            await studentDocument.save();
        }
        res.status(200).json({success: true, data: studentDocument});
    }
    catch (err) {
        res.status(500).json({success: false, data: err});
    }
}

// @desc Get student data for registration
// @route GET /api/registration/get-registration-details/:username/:semester
// @access Admin

async function getRegistrationDetails(req, res) {
    const {username, semester} = req.body;
    console.log(req.body);

    try {
        const studentDocument = await StudentDocument.findOne({username: username, semester: semester});
        if(!studentDocument){
            res.status(200).json({success: true, data: null});
        }
        res.status(200).json({success: true, data: studentDocument});
    }
    catch (err) {
        res.status(500).json({success: false, data: err});
    }
}

module.exports = {
  register,
  getRegistrationDetails,
}
