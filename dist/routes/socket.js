"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        // 2 way handshake Start
        io.to(socket.id).emit('sendSocketIdAndRequestUserId', socket.id); //get user id and send socket.id to store on both ends
        socket.on('setUserId', (data) => {
            const check = sockets.findIndex(sock => sock.userId === data.userId);
            if (check === -1) {
                sockets.push({
                    socketId: socket.id,
                    userId: data.userId,
                    role: data.role,
                    lat: data.lat,
                    lng: data.lng
                });
                console.log(sockets);
            }
            else {
                sockets[check] = {
                    socketId: socket.id,
                    userId: data.userId,
                    role: data.role,
                    lat: data.lat,
                    lng: data.lng
                };
                console.log(sockets);
            }
        });
        // 2 way handshake End
        //Chat Start
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
        //Chat End
        //Order Start
        socket.on('newDriverRequest', (data) => __awaiter(this, void 0, void 0, function* () {
            const drivers = sockets.filter(soc => soc.role == "driver");
            console.log(drivers);
            // SocketController.notifyDrivers(io, drivers);
            drivers.forEach(driver => {
                console.log(driver.socketId);
                io.to(driver.socketId).emit('requestDriver', { data: "New Request" });
            });
        }));
        socket.on('disconnect', () => {
            console.log(socket.id);
            const index = sockets.findIndex(soc => soc.socketId == socket.id);
            sockets.splice(index, 1);
        });
    });
}
exports.default = initSocket;
//# sourceMappingURL=socket.js.map