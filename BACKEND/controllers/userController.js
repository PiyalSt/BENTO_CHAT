const User = require("../models/userModel");
const generateToken = require("../utils/generateToken.js");
const bcrypt = require("bcrypt");

// response e password pathabo na, tai ekta helper
const safeUser = (user) => {
  const obj = user.toObject();
  delete obj.password;
  return obj;
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Shob ghor puron koro",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password kompokkhe 6 okkhor hote hobe",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res
        .status(400)
        .json({ message: "Ei email diye age-i account ache" });
    }

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    generateToken(res, user._id);

    res
      .status(201)
      .json({ message: "Account toiri hoyeche", user: safeUser(user) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if ((!email, !password)) {
      return res.status(400).json({ message: "Email ar password dao" });
    }

    // const user = await User.findOne({ email });
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user) {
      return res.status(401).json({
        message: "Email Ba Password vul",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Email Ba Password vul",
      });
    }

    generateToken(res, user._id);
    res.json({ message: "Login hoyeche", user: safeUser(user) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.json({ message: "Logout successfully!" });
};

const getMe = (req, res) => {
  res.json({ user: safeUser(req.user) });
};

const updateProfile = async (req, res) => {
  try {
    const { username, about, avatar } = req.body;

    if (username !== undefined && !username.trim()) {
      return res.status(400).json({ message: "Naam khali rakha jabe na" });
    }

    const user = req.user;
    if (username !== undefined) user.username = username;
    if (about !== undefined) user.about = about;
    if (avatar !== undefined) user.avatar = avatar;

    await user.save();
    res.json({ message: "Profile update hoyeche", user: safeUser(user) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    const allowed = [
      "sound",
      "desktop",
      "preview",
      "showOnline",
      "readReceipts",
      "showLastSeen",
    ];
    const user = req.user;

    // shudhu amader jana key gulo nibo, onno kichu dile ignore
    allowed.forEach((key) => {
      if (typeof req.body[key] === "boolean") {
        user.settings[key] = req.body[key];
      }
    });

    await user.save();
    res.json({ message: "Settings save hoyeche", settings: user.settings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { current, next } = req.body;

    if (!current || !next || next.length < 6) {
      return res
        .status(400)
        .json({ message: "Notun password kompokkhe 6 okkhor" });
    }

    const user = await User.findById(req.user._id).select("+password");
    if (!(await user.comparePassword(current))) {
      return res.status(401).json({ message: "Ager password vul" });
    }

    user.password = next;
    await user.save(); // save() er karone pre("save") hook chole hash hobe
    res.json({ message: "Password change hoyeche" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchUsers = async (req, res) => {
  try {
    const q = (req.query.q || "").trim();
    if (!q) return res.json({ users: [] });

    // special character thakle regex bhenge na jay, tai escape kora holo
    const safe = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const users = await User.find({
      _id: { $ne: req.user._id }, // nijeke bad
      $or: [
        { username: { $regex: safe, $options: "i" } }, // i mane choto boro hater okkhor ek
        { email: { $regex: safe, $options: "i" } },
      ],
    })
      .select("username email avatar about")
      .limit(10);

    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "friends",
      "username avatar about isOnline lastSeen",
    );
    res.json({ friends: user.friends });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  updateSettings,
  changePassword,
  searchUsers,
  getFriends,
};
