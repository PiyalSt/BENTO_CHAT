const express = require("express");
const {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  updateSettings,
  changePassword,
  searchUsers,
  getFriends,
} = require("../controllers/userController");
const protect = require("../maddleware/authMiddleware");

const router = express.Router();

// login chhara jabe
router.post("/register", register);
router.post("/login", login);
router.post("logout", logout);

// login lagbe, tai protect boshano
router.get("/me", protect, getMe);
router.put("/profile", protect, updateProfile);
router.put("/settings", protect, updateSettings);
router.put("/password", protect, changePassword);
router.get("/search", protect, searchUsers);
router.get("/friends", protect, getFriends);

module.exports = router;
