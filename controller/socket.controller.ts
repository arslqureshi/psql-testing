import { Request } from 'aws-sdk';
import pool from '../src/db';
const SocketController = {
    async addMessage(io, data, to) {
       const query = await pool.query(
           'insert into message(content, seen,delivered,date) values($1,$2,$3,$4) returning *',
           [data.content, data.seen, data.delivered, new Date()]
       );
       const query1 = await pool.query(
           'insert into messages(conversationId, messageFrom,message) values($1,$2,$3) returning *',
           [data.conversationId, data.messageFrom, query.rows[0].id]
       );
       const query2 = await pool.query(
           'update conversations SET lastMessageDate = $1 where id = $2',
           [new Date(), data.conversationId]
       );
       console.log(query.rows[0]);
       if(to != -1) {
           io.to(to).emit('newMessage', query.rows[0]);
       }
    },
    async notifyDrivers(io, drivers, request) {
        console.log(request);
        const locations = request.locations;
        const buyerAddress = request.buyerAddress;
        const query = await pool.query(
            `insert into driver_request(address, city, lat, lng, status) 
            values($1,$2,$3,$4,$5) RETURNING *`,
            [buyerAddress.address, buyerAddress.city, buyerAddress.lat, buyerAddress.lng, 'pending']
        );
        locations.forEach(async location => {
          const query1 = await pool.query(
              `insert into request_locations(lat, lng, requestId)
              values($1, $2, $3)`,
              [location.lat, location.lng, query.rows[0].id]
          );
        })
        await drivers.forEach(driver => {
            var ky = 40000 / 360;
            var kx = Math.cos(Math.PI * buyerAddress.lat / 180.0) * ky;
            var dx = Math.abs(buyerAddress.lng - parseFloat(driver.lng)) * kx;
            var dy = Math.abs(buyerAddress.lat - parseFloat(driver.lat)) * ky;
            if(Math.sqrt(dx * dx + dy * dy) <= 5) {
                io.to(driver.socketId).emit('requestDriver', query.rows[0]);    
            }
        });
    }
}

export default SocketController;