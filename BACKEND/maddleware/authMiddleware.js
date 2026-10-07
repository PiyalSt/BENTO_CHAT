const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "You are not login. Please Login first.",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User khuje pawa jayni" });
    }

    req.user = user; // pore controller e req.user diye ei user ke pabe
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token valid na ba shomoy shesh" });
  }
};

module.exports = protect;
