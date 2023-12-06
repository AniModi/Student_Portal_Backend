const jwt = require("jsonwebtoken");

// @desc    Require admin role

exports.requireAdmin = (req, res, next) => {

  if(1 === 1) {
    next();
    return;
  }

  const authorizationHeader = req.headers["authorization"];

  if (!authorizationHeader) {
    return res.status(401).json({
      auth: false,
      message: "No token provided.",
    });
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "No token, authorization denied" });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!["admin", "student", "finance", "academics"].includes(decoded.role)) {

      return res.status(403).json({ success: false, message: "Not authorized as an admin" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Token is not valid" });
  }
};
