const mongoose = require("mongoose");
const User = require("../models/userModel");
const FriendRequest = require("../models/friendRequestModel");

// POST /api/friends/request/:userId  (request pathano)
const sendRequest = async (req, res) => {
  try {
    const myId = req.user._id;
    const { userId } = req.params;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "User id thik na" });
    }
    if (myId.equals(userId)) {
      return res
        .status(400)
        .json({ message: "Nijeke request pathano jabe na" });
    }

    const target = await User.findById(userId);
    if (!target) {
      return res.status(404).json({ message: "User khuje pawa jayni" });
    }

    // age theke bondhu kina
    if (req.user.friends.some((f) => f.equals(userId))) {
      return res.status(400).json({ message: "Tora age-i bondhu" });
    }

    // oi user ami ke request pathiye rekheche kina
    const reverse = await FriendRequest.findOne({
      sender: userId,
      receiver: myId,
      status: "pending",
    });
    if (reverse) {
      return res.status(400).json({
        message: "Oi user tomake age-i request pathiyeche, accept koro",
      });
    }

    // ami age request pathiyechi kina
    const existing = await FriendRequest.findOne({
      sender: myId,
      receiver: userId,
    });
    if (existing) {
      if (existing.status === "pending") {
        return res
          .status(400)
          .json({ message: "Request age-i pathano hoyeche" });
      }
      // reject hoye thakle abar pathano jabe
      existing.status = "pending";
      await existing.save();
      return res.json({
        message: "Request abar pathano hoyeche",
        request: existing,
      });
    }

    const request = await FriendRequest.create({
      sender: myId,
      receiver: userId,
    });

    const populated = await request.populate("sender", "username avatar about");
    req.app.get("io").to(userId).emit("friend:request", populated);

    res.status(201).json({ message: "Request pathano hoyeche", request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/friends/requests  (amake je request ashche)
const getReceivedRequests = async (req, res) => {
  try {
    const requests = await FriendRequest.find({
      receiver: req.user._id,
      status: "pending",
    })
      .populate("sender", "username avatar about")
      .sort({ createdAt: -1 });

    res.json({ requests });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/friends/sent  (ami je request pathiyechi)
const getSentRequests = async (req, res) => {
  try {
    const requests = await FriendRequest.find({
      sender: req.user._id,
      status: "pending",
    })
      .populate("receiver", "username avatar about")
      .sort({ createdAt: -1 });

    res.json({ requests });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/friends/accept/:requestId
const acceptRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    if (!mongoose.isValidObjectId(requestId)) {
      return res.status(400).json({ message: "Request id thik na" });
    }

    const request = await FriendRequest.findById(requestId);
    if (!request || request.status !== "pending") {
      return res.status(404).json({ message: "Request khuje pawa jayni" });
    }

    // shudhu je receiver, shei accept korte parbe
    if (!request.receiver.equals(req.user._id)) {
      return res.status(403).json({ message: "Eta tomar request na" });
    }

    request.status = "accepted";
    await request.save();

    // dui jon er friends array te ek ek jon ke jog kora
    // $addToSet dile duplicate hoy na
    await User.findByIdAndUpdate(request.sender, {
      $addToSet: { friends: request.receiver },
    });
    await User.findByIdAndUpdate(request.receiver, {
      $addToSet: { friends: request.sender },
    });

    const io = req.app.get("io");
    io.to(request.sender.toString()).emit("friend:accepted", {
      by: req.user._id.toString(),
    });

    res.json({ message: "Ekhon tora bondhu" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/friends/reject/:requestId
const rejectRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    if (!mongoose.isValidObjectId(requestId)) {
      return res.status(400).json({ message: "Request id thik na" });
    }

    const request = await FriendRequest.findById(requestId);
    if (!request || request.status !== "pending") {
      return res.status(404).json({ message: "Request khuje pawa jayni" });
    }
    if (!request.receiver.equals(req.user._id)) {
      return res.status(403).json({ message: "Eta tomar request na" });
    }

    request.status = "rejected";
    await request.save();

    res.json({ message: "Request reject kora hoyeche" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/friends/request/:requestId  (nijer pathano request cancel)
const cancelRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    if (!mongoose.isValidObjectId(requestId)) {
      return res.status(400).json({ message: "Request id thik na" });
    }

    const request = await FriendRequest.findOneAndDelete({
      _id: requestId,
      sender: req.user._id, // shudhu nijer request-i muchte parbe
      status: "pending",
    });
    if (!request) {
      return res.status(404).json({ message: "Request khuje pawa jayni" });
    }

    res.json({ message: "Request cancel kora hoyeche" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/friends/:friendId  (unfriend)
const removeFriend = async (req, res) => {
  try {
    const myId = req.user._id;
    const { friendId } = req.params;

    if (!mongoose.isValidObjectId(friendId)) {
      return res.status(400).json({ message: "User id thik na" });
    }

    // dui jon er friends array theke dujon ke soriye dao
    await User.findByIdAndUpdate(myId, { $pull: { friends: friendId } });
    await User.findByIdAndUpdate(friendId, { $pull: { friends: myId } });

    // purono request muche dao, na hole pore abar request pathano jabe na
    await FriendRequest.deleteMany({
      $or: [
        { sender: myId, receiver: friendId },
        { sender: friendId, receiver: myId },
      ],
    });

    res.json({ message: "Bondhu list theke soriye deya hoyeche" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendRequest,
  getReceivedRequests,
  getSentRequests,
  acceptRequest,
  rejectRequest,
  cancelRequest,
  removeFriend,
};
