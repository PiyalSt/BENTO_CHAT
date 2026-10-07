const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const User = require("./models/userModel");

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // tomar React er port
      credentials: true,
    },
  });

  // kon user koyta tab/device theke connected, tar hishab
  const onlineCount = new Map();

  // bondhu der ekta event pathano
  const notifyFriends = async (userId, event, payload) => {
    const user = await User.findById(userId).select("friends");
    if (!user) return;
    user.friends.forEach((f) => io.to(f.toString()).emit(event, payload));
  };

  // connect howar age login check (cookie theke token pora)
  io.use(async (socket, next) => {
    try {
      const cookies = cookie.parse(socket.handshake.headers.cookie || "");
      if (!cookies.token) return next(new Error("Age login koro"));

      const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("_id");
      if (!user) return next(new Error("User khuje pawa jayni"));

      socket.userId = user._id.toString();
      next();
    } catch (error) {
      next(new Error("Token valid na"));
    }
  });

  io.on("connection", async (socket) => {
    const userId = socket.userId;

    // proti user er nijer ekta "room", tar naam hoilo tar userId
    socket.join(userId);

    const count = (onlineCount.get(userId) || 0) + 1;
    onlineCount.set(userId, count);

    // prothom tab khulle-i shudhu online dekhabe
    if (count === 1) {
      await User.findByIdAndUpdate(userId, { isOnline: true });
      notifyFriends(userId, "user:online", { userId });
    }

    // ami connect hole, amar kon kon bondhu ekhon online ta pathai
    const me = await User.findById(userId).select("friends");
    const onlineFriends = me.friends
      .map((f) => f.toString())
      .filter((id) => onlineCount.has(id));
    socket.emit("online:list", onlineFriends);

    // typing indicator
    socket.on("typing", ({ to }) => {
      if (to) io.to(to).emit("typing", { from: userId });
    });
    socket.on("typing:stop", ({ to }) => {
      if (to) io.to(to).emit("typing:stop", { from: userId });
    });

    socket.on("disconnect", async () => {
      const left = (onlineCount.get(userId) || 1) - 1;

      if (left <= 0) {
        onlineCount.delete(userId);
        const lastSeen = new Date();
        await User.findByIdAndUpdate(userId, { isOnline: false, lastSeen });
        notifyFriends(userId, "user:offline", { userId, lastSeen });
      } else {
        onlineCount.set(userId, left);
      }
    });
  });

  return io;
};

module.exports = initSocket;