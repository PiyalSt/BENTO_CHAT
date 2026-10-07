const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const connect_db = require("./config/db");
const userRoutes = require("./routes/userRoute");
const friendRoutes = require("./routes/friendRoutes");
const messageRoutes = require("./routes/messageRoutes");
const cookieParser = require("cookie-parser");

// socket
const http = require("http");
const initSocket = require("./socket");
const User = require("./models/userModel");

const app = express();
const port = process.env.PORT || 4000;

// dotenv config
dotenv.config();

// mongodb connection
connect_db();

// I don't know
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // tomar React er port ta likho
    credentials: true, // cookie ana-newa korte dey
  }),
); // use for cors policy

// routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/friends", friendRoutes);
app.use("/api/v1/messages", messageRoutes);


// socket
const server = http.createServer(app);
const io = initSocket(server);
app.set("io", io); // controller theke io pawar jonno

app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
