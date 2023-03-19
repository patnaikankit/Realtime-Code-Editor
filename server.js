const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

// event is triggered whenever a socket gets connected with server
io.on("connection", function (socket) {
    console.log("socket connected", socket.id);
})



const PORT = process.env.PORT || 3000;
server.listen(PORT, function (req, res) {
    console.log("Listening on port " + PORT);
})
