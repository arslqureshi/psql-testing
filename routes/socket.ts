import SocketController from '../controller/socket.controller';

let sockets = [];

export default function initSocket(io) {

    io.on("connection", (socket) => {

      socket.emit('function Name')

      console.log('socket connected... id: ' + socket.id);
      // 2 way handshake Start
      io.to(socket.id).emit('sendSocketIdAndRequestUserId', socket.id);   //get user id and send socket.id to store on both ends
      
      socket.on('setUserId', (data) => {
        const check = sockets.findIndex(sock => sock.userId === data.userId);
        if(check === -1) {
          sockets.push({
            socketId: socket.id,
            userId: data.userId,
            role: data.role,
            lat: data.lat,
            lng: data.lng
          })
          console.log(sockets)
        } else {
          sockets[check] = {
            socketId: socket.id,
            userId: data.userId,
            role: data.role,
            lat: data.lat,
            lng: data.lng
          }
          console.log(sockets)
        }
      })
      // 2 way handshake End

      //Chat Start
      socket.on('newMessage', (data, to) => {
        const index = sockets.findIndex(soc => soc.userId == to);
        if(index == -1) {
          SocketController.addMessage(io,data, -1)
        } else {
          const toId = sockets[index].socketId;
          SocketController.addMessage(io,data, toId)
        }
      })
      //Chat End

      //Order Start
      socket.on('newDriverRequest',async (data) => {
        const drivers = sockets.filter(soc => soc.role == "driver");
        console.log(drivers);
        // SocketController.notifyDrivers(io, drivers);
        drivers.forEach(driver => {
          console.log(driver.socketId)
          io.to(driver.socketId).emit('requestDriver', {data: "New Request"});
        })
      })

      socket.on('disconnect', () => {
        console.log(socket.id);
        const index = sockets.findIndex(soc => soc.socketId == socket.id);
        sockets.splice(index, 1);
      })
    })

  }