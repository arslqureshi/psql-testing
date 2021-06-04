"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_controller_1 = __importDefault(require("../controller/socket.controller"));
let sockets = [];
function initSocket(io) {
    io.on("connection", (socket) => {
        socket.emit('function Name');
        console.log('socket connected... id: ' + socket.id);
        io.to(socket.id).emit('sendSocketIdAndRequestUserId', socket.id); //get user id and send socket.id to store on both ends
        socket.on('setUserId', (userId) => {
            const check = sockets.findIndex(sock => sock.userId === userId);
            if (check === -1) {
                sockets.push({
                    socketId: socket.id,
                    userId: userId
                });
                console.log(sockets);
            }
            else {
                sockets[check] = {
                    socketId: socket.id,
                    userId: userId
                };
                console.log(sockets);
            }
        });
        socket.on('newMessage', (data, to) => {
            const index = sockets.findIndex(soc => soc.userId == to);
            if (index == -1) {
                socket_controller_1.default.addMessage(io, data, -1);
            }
            else {
                const toId = sockets[index].socketId;
                socket_controller_1.default.addMessage(io, data, toId);
            }
        });
        socket.on('disconnect', () => {
            console.log(socket.id);
            const index = sockets.findIndex(soc => soc.socketId == socket.id);
            sockets.splice(index, 1);
            console.log(sockets);
        });
    });
}
exports.default = initSocket;
//# sourceMappingURL=socket.js.map