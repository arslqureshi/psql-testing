import SocketController from '../controller/socket.controller';

let sockets = [];

export default function initSocket(io) {

    io.on("connection", (socket) => {

      socket.emit('function Name')

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

      socket.on('newMessage', (data, to) => {
        const index = sockets.findIndex(soc => soc.userId == to);
        const toId = sockets[index].socketId;
        SocketController.addMessage(io,data, toId)
      })

      socket.on('disconnect', (socket) => {
        console.log(socket);
      })
    })

  }