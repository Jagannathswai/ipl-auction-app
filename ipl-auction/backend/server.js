const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
require('dotenv').config();


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
});

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ createParentPath: true, limits: { fileSize: 5 * 1024 * 1024 } }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// DB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ipl-auction')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// Make io accessible to routes
app.use((req, res, next) => { req.io = io; next(); });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/players', require('./routes/players'));
app.use('/api/teams', require('./routes/teams'));
app.use('/api/auction', require('./routes/auction'));
app.use('/api/rooms', require('./routes/rooms'));
app.use('/api/export', require('./routes/export'));

// Socket.io Logic
const auctionSocket = require('./sockets/auctionSocket');
auctionSocket(io);

app.get('/', (req, res) => res.json({ message: 'IPL Auction API Running 🏏' }));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
// const express = require("express");
// const http = require("http");
// const cors = require("cors");
// const { Server } = require("socket.io");


// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use("/api/rooms", require("./routes/rooms"));
// app.use("/api/players", require("./routes/players"));
// app.use("/api/teams", require("./routes/teams"));

// const server = http.createServer(app);

// // 🔥 SOCKET.IO START
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"]
//   }
// });

// io.on("connection", (socket) => {
//   console.log("User Connected:", socket.id);

//   socket.on("joinRoom", (roomId) => {
//     socket.join(roomId);
//     console.log("Joined Room:", roomId);

//     io.to(roomId).emit("roomUsers", {
//       message: "User joined",
//       userId: socket.id
//     });
//   });

//   socket.on("disconnect", () => {
//     console.log("User Disconnected");
//   });
// });
// // 🔥 SOCKET.IO END

// app.get("/", (req, res) => {
//   res.send("Server Running");
// });

// server.listen(5000, () => {
//   console.log("Server running on port 5000");
// });