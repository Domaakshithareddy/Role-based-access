const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.verifyToken = (req, res, next) => {
  let token = null;

  if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token && req.headers.authorization) {
    const [scheme, value] = req.headers.authorization.split(" ");
    if (scheme === "Bearer" && value) token = value;
  }

  if (!token) return res.status(401).json({ message: "No token, auth denied" });

  jwt.verify(token, process.env.JWT_TOKEN, async (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token invalid or expired" });

    try {
      const user = await User.findById(decoded.id).select("-password");
      if (!user) return res.status(401).json({ message: "User not found" });

      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Error verifying user" });
    }
  });
};

