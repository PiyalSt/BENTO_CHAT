const { default: mongoose } = require("mongoose");

const connect_db = () => {
  try {
    const connect = mongoose.connect(process.env.MONGODB_URI);
    console.log("mongodb connection successfully complete!");
  } catch (error) {
    console.log("mongodb connnection failed!", error.message);
  }
};

module.exports = connect_db;
