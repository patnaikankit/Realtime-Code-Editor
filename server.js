const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const ACTIONS = require("./src/Actions");
const io = new Server(server);

// to match the socket id with corresponding client  
const userSocketMap = {};

function getAllConnectedClients(roomId){
    // will return an array of all the existing users in an array or it will return an empty array
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
        return {
            socketId,
            username: userSocketMap[socketId]
        }
    });
}

// event is triggered whenever a socket gets connected with server
io.on("connection", function (socket) {
    console.log("socket connected", socket.id);
    // listening for the emit 
    socket.on(ACTIONS.JOIN, ({roomId, username}) => {
        userSocketMap[socket.id] = username;
        // to allow the client to enter the room
        socket.join(roomId);
        // to store all the clients in a particular room
        const clients = getAllConnectedClients(roomId);
        clients.forEach(({socketId}) => {
            // to notify existing users that a new client has joined
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id
            });
        });

        delete userSocketMap[socket.id];
        socket.leave();
    });

    // listening for any code change
    socket.on(ACTIONS.CODE_CHANGE, ({roomId, code}) => {
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, {code});
    })

// in case the user is disconnected - leaves the room
    socket.on('disconnecting',function(){
        const rooms = [...socket.rooms];
        rooms.forEach(function(roomId){
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id]
            })
        })
    })
})



const PORT = process.env.PORT || 3000;
server.listen(PORT, function (req, res) {
    console.log("Listening on port " + PORT);
})
