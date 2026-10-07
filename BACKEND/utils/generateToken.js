const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true, // javascript diye cookie pora jabe na, tai chor er hatey jabe na
    secure: process.env.NODE_ENV === "production", // production e shudhu https e jabe
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 din
  });
};

module.exports = generateToken;
