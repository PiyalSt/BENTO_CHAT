const { mongo } = require("mongoose");
const { default: mongoose } = require("mongoose");

const friendRequestSchema = new mongoose.Schema(
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
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

// ekই sender theke ekই receiver ke duibar request jabe na
friendRequestSchema.index({ sender: 1, receiver: 1 }, { unique: true });

// nijeke nijei request pathano athkano
friendRequestSchema.pre("validate", function () {
  if (this.sender.equals(this.receiver)) {
    this.invalidate("receiver", "Nijeke request pathano jabe na");
  }
});

const FriendRequest = mongoose.model("FriendRequest", friendRequestSchema);
module.exports = FriendRequest;
