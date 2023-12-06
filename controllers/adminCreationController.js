const User = require("../models/User");
const bcrypt = require("bcrypt");

// @desc    Create a new admin
// @route   POST /api/admin/create-admin
// @access  Admin
exports.createAdmin = async (req, res) => {
  try {
    const { name, username, password, role, walletAddress } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let admin = await User.findOne({ username });

    if (admin) {
      admin = await User.findOneAndUpdate(
        { username },
        { name, password: hashedPassword, walletAddress : walletAddress },
        { new: true } 
      );
    } else {
      admin = await User.create({
        name,
        username,
        password: hashedPassword,
        role: role,
        walletAddress : walletAddress,
      });
    }

    res.status(201).json({
      success: true,
      data: admin,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};