const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "User name is required."],
      trim: true, // age pichone extra space thakle kete dey
    },
    email: {
      type: String,
      unique: true, // ek email diye duibar account hobe na
      lowercase: true, // shob choto hater okkhore save hobe
      trim: true,
      required: [true, "Email is required."],
    },
    password: {
      type: String,
      required: [true, "Password dorkar"],
      minlength: [6, "Password kompokkhe 6 okkhor"],
      select: false, // query korle default e password ashbe na
    },

    about: { type: String, default: "Banshbagan e achi", maxlength: 150 },
    avatar: { type: String, default: "" },

    // onno user der _id er array
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    isOnline: {
      type: Boolean,
      default: false,
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },

    // Settings panel er shob toggle
    settings: {
      sound: { type: Boolean, default: true },
      desktop: { type: Boolean, default: false },
      preview: { type: Boolean, default: true },
      showOnline: { type: Boolean, default: true },
      readReceipts: { type: Boolean, default: true },
      showLastSeen: { type: Boolean, default: true },
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
module.exports = User;
