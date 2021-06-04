import pool from '../src/db';
const SocketController = {
    addMessage(socket, data) {
        socket.emit('hello', data);
    }
}

export default SocketController;