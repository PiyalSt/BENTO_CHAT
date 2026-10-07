const { default: mongoose } = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: [true, "message is not empyt"],
      trim: true,
      maxlength: 2000,
    },
    isRead: { type: Boolean, default: false },
    readAt: { type: Date },
  },
  { timestamps: true },
);

// dui jon er chat history druto khujar jonno
messageSchema.index({ sender: 1, receiver: 1, createdAt: -1 });

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
