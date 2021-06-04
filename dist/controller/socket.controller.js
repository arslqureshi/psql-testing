"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SocketController = {
    addMessage(socket, data) {
        socket.emit('hello', data);
    }
};
exports.default = SocketController;
//# sourceMappingURL=socket.controller.js.map