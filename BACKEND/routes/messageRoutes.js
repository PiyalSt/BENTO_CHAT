const express = require("express");
const {
  sendMessage,
  getMessages,
  getConversations,
} = require("../controllers/messageController");
const protect = require("../maddleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.get("/", getConversations);
router.get("/:friendId", getMessages);
router.post("/:friendId", sendMessage);

module.exports = router;