// ===== Required Imports =====
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");   
const http = require("http"); 
const mainRouter = require("./routes/main.router");           

// ===== App Config =====
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// ===== Middleware =====
app.use(cors({origin:"*"}));               
app.use(bodyParser.json());   
app.use(express.json());       

// ===== MongoDB Local Connection =====
const mongoURI = "mongodb://127.0.0.1:27017/githubclone";

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB (Local) connected to 'githubclone'"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));



app.use("/", mainRouter); 


// ===== Create HTTP server (required by Socket.io) =====
const server = http.createServer(app);

// ===== Socket.io Setup =====
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let user = "test";

io.on("connection", (socket) => {
  console.log("⚡ New socket connected:", socket.id);

  socket.on("joinRoom", (userID) => {
    user = userID;
    console.log("=====");
    console.log(`User joined room: ${user}`);
    console.log("=====");
    socket.join(userID);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// ===== MongoDB Event =====
const db = mongoose.connection;

db.once("open", async () => {
  console.log("🧠 MongoDB Connected → CRUD operations ready!");
  // future CRUD operations
});

// app.get("/", (req, res) => {
//   res.send("🚀 Socket.io Test Server Running!");
// });


// ===== Start Server =====
server.listen(port, () => {
  console.log(`🌐 Server is running on http://localhost:${port}`);
});
