const User = require("../models/User");
const bcrypt = require("bcrypt");

// @desc    Create a new student
// @route   POST /api/admin/create-student
// @access  Admin
exports.createStudent = async (req, res) => {
  try {
    const { name, username, password, walletAddress } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let student = await User.findOne({ username });

    if (student) {
      student = await User.findOneAndUpdate(
        { username },
        { name, password: hashedPassword, walletAddress : walletAddress },
        { new: true } 
      );
    } else {
      student = await User.create({
        name,
        username,
        password: hashedPassword,
        walletAddress : walletAddress,
        role: "student",
      });
    }

    res.status(201).json({
      success: true,
      data: student,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Get all students
// @route   GET /api/admin/get-students
// @access  Admin
exports.getStudents = async (req, res) => {
  try {
    const students = await User.find();
    console.log("getStudents",students);

    res.status(200).json({
      success: true,
      data: students,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};

// @desc    Get single student
// @route   GET /api/admin/get-students/:id
// @access  Admin
exports.getStudent = async (req, res) => {
  console.log("getStudent",req.params.id);
  try {
    const student = await User.findOne({"username" : req.params.id});

    if (!student) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error : err
    });
  }
};
