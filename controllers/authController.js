const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

// @desc Login user
// @route POST /api/auth/login
// @access Public

async function loginUser(req, res) {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    // Include username and name in the response
    res.json({
      token,
      role: user.role,
      username: user.username,
      name: user.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function checkJwt(req, res) {
  const authorizationHeader = req.headers["authorization"];

  if (!authorizationHeader) {
    return res.status(401).json({
      auth: false,
      message: "No token provided.",
    });
  }

  const token = authorizationHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      return res.status(500).json({
        auth: false,
        message: "Failed to authenticate token.",
      });
    }

    res.status(200).json({
      auth: true,
      message: "Token is valid.",
    });
  });
}

module.exports = {
  loginUser,
  checkJwt,
};
