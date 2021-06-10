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
    }
}

export default SocketController;