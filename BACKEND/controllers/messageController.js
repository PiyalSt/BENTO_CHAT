const mongoose = require("mongoose");
const Message = require("../models/messageModel");

// je user er sathe chat korbo, se ami-r bondhu kina
const isFriend = (user, friendId) =>
  user.friends.some((f) => f.equals(friendId));

// POST /api/messages/:friendId  (message pathano)
const sendMessage = async (req, res) => {
  try {
    const { friendId } = req.params;
    const text = (req.body.text || "").trim();

    if (!mongoose.isValidObjectId(friendId)) {
      return res.status(400).json({ message: "User id thik na" });
    }
    if (!text) {
      return res.status(400).json({ message: "Message khali hobe na" });
    }
    if (!isFriend(req.user, friendId)) {
      return res
        .status(403)
        .json({ message: "Shudhu bondhu der message pathano jay" });
    }

    const message = await Message.create({
      sender: req.user._id,
      receiver: friendId,
      text,
    });

    const io = req.app.get("io");
    io.to(friendId).emit("message:new", message); // bondhu pabe
    io.to(req.user._id.toString()).emit("message:new", message); // amar onno tab o pabe

    res.status(201).json({ message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/messages/:friendId?limit=50&before=<ISO date>  (chat history)
const getMessages = async (req, res) => {
  try {
    const myId = req.user._id;
    const { friendId } = req.params;
    const limit = Math.min(parseInt(req.query.limit) || 50, 100); // sorbocho 100

    if (!mongoose.isValidObjectId(friendId)) {
      return res.status(400).json({ message: "User id thik na" });
    }
    if (!isFriend(req.user, friendId)) {
      return res.status(403).json({ message: "Tora bondhu na" });
    }

    const filter = {
      $or: [
        { sender: myId, receiver: friendId },
        { sender: friendId, receiver: myId },
      ],
    };

    // before dile oi shomoyer age-r message ashbe (purono message load korar jonno)
    if (req.query.before) {
      filter.createdAt = { $lt: new Date(req.query.before) };
    }

    // notun theke purono, tarpor ulte dei jate purono ta age thake
    const messages = await Message.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit);
    messages.reverse();

    // bondhu je message gulo pathiyeche, segulo "pora hoyeche" kore dao
    const result = await Message.updateMany(
      { sender: friendId, receiver: myId, isRead: false },
      { isRead: true, readAt: new Date() },
    );

    // bondhu ke jananu je tar message gulo pora hoyeche
    if (result.modifiedCount > 0) {
      req.app
        .get("io")
        .to(friendId)
        .emit("messages:read", { by: myId.toString() });
    }

    res.json({ messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/messages  (chat list: proti bondhur shesh message ar unread shonkha)
const getConversations = async (req, res) => {
  try {
    const myId = req.user._id;

    const conversations = await Message.aggregate([
      // amar shathe jora shob message
      { $match: { $or: [{ sender: myId }, { receiver: myId }] } },
      { $sort: { createdAt: -1 } },
      // onno user er id diye group kora
      {
        $group: {
          _id: {
            $cond: [{ $eq: ["$sender", myId] }, "$receiver", "$sender"],
          },
          lastMessage: { $first: "$$ROOT" }, // sort kora, tai prothom ta-i shesh message
          unread: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$receiver", myId] },
                    { $eq: ["$isRead", false] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      { $sort: { "lastMessage.createdAt": -1 } },
      // onno user er naam, avatar ana
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 0,
          unread: 1,
          user: { _id: 1, username: 1, avatar: 1, isOnline: 1, lastSeen: 1 },
          lastMessage: { text: 1, sender: 1, createdAt: 1 },
        },
      },
    ]);

    res.json({ conversations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendMessage, getMessages, getConversations };
