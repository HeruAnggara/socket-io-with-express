const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
      origin: '*', // Mengizinkan permintaan dari semua origin
      methods: ['GET', 'POST'], // Mengizinkan metode HTTP GET dan POST
      allowedHeaders: ['Origin', 'Authorization', 'authorization', 'X-Requested-With', 'Content-Type', 'Accept'] // Mengizinkan header yang diizinkan
    }
  });

io.on("connection", (socket) => {
    console.log("Client connected");
  
    const sendRandomMessage = () => {
      const randomMessage = Math.random().toString(36).substring(7); // Membuat string acak
      io.emit("chat message", randomMessage); // Mengirim pesan ke semua klien
      io.emit("kode message", "Hello"); // Mengirim pesan ke semua klien
      console.log(randomMessage);
    };
  
    const intervalId = setInterval(sendRandomMessage, 3000);
  
    // Menangani ketika klien meminta untuk berhenti menerima pesan acak
    socket.on("stop messages", () => {
      clearInterval(intervalId); // Menghentikan pengiriman pesan acak
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
  });

const PORT = process.env.PORT || 2000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
