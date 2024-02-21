const io = require("socket.io-client");

const socket = io("http://localhost:2000"); // Sesuaikan dengan URL server NestJS

// socket.on("connect", () => {
//   console.log("Connected to server");
// });

socket.on("chat message", (message) => {
  console.log("Received chat message:", message);
});

socket.on("kode message", (message) => {
  console.log("Received kode message:", message);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
