const express = require("express");
const {
  sendRequest,
  getReceivedRequests,
  getSentRequests,
  acceptRequest,
  rejectRequest,
  cancelRequest,
  removeFriend,
} = require("../controllers/friendController");
const protect = require("../maddleware/authMiddleware");

const router = express.Router();

// shob route e login lagbe
router.use(protect);

router.get("/requests", getReceivedRequests);
router.get("/sent", getSentRequests);
router.post("/request/:userId", sendRequest);
router.delete("/request/:requestId", cancelRequest);
router.put("/accept/:requestId", acceptRequest);
router.put("/reject/:requestId", rejectRequest);
router.delete("/:friendId", removeFriend);

module.exports = router;