"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function initSocket(io) {
    io.on("connection", (socket) => {
        console.log('socket connected... id: ' + socket.id);
        socket.on('test', data => {
            console.log(data);
        });
        socket.on('disconnect', (socket) => {
            console.log('disconnected');
        });
    });
}
exports.default = initSocket;
//# sourceMappingURL=socket.js.map