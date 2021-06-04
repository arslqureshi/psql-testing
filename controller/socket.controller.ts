const SocketController = {
    test(socket, data) {
        socket.emit('hello', data);
    }
}

export default SocketController;