import SocketController from '../controller/socket.controller';

let sockets = [];

export default function initSocket(io) {

    io.on("connection", (socket) => {

      console.log('socket connected... id: ' + socket.id);

      io.to(socket.id).emit('sendSocketIdAndRequestUserId', socket.id);   //get user id and send socket.id to store on both ends
      
      socket.on('setUserId', (userId) => {
        const check = sockets.findIndex(sock => sock.userId === userId);
        
        if(check === -1) {
          sockets.push({
            socketId: socket.id,
            userId: userId
          })
          console.log(sockets);
        } else {
          sockets[check] = {
            socketId: socket.id,
            userId: userId
          }
          console.log(sockets);
        }
      })

      socket.on('test', (data) => {SocketController.test(socket, data);})


      socket.on('disconnect', (socket) => {
        console.log(socket);
        const check = sockets.findIndex(sock => sock.socketId === socket.id)
        console.log(check);
        if(check != -1) {
          sockets.splice(check, 1);
          console.log(sockets);
        }
      })
    })

  }