import pool from '../src/db';

const ChatController = {
    async createChatRoom(req, res) {
        const data = req.body;
        const query = await pool.query(
            `select * from warehouses join person on person.id=warehouses.ownerid where warehouses.id=$1`,
            [data.warehouseId]
        );
        const ownerData = query.rows[0];
        console.log(ownerData);
        if(ownerData.ownerid !== data.user1) {
            const query1 = await pool.query(
                `select * from conversations where (user1=$1 and user2=$2) or (user1=$3 and user2=$4)`,
                [data.user1, ownerData.ownerid, ownerData.ownerid,data.user1]
            )
            if(query1.rows.length === 0) {
                const query2 = await pool.query(
                    `insert into conversations(user1,user2,username1,username2) values($1,$2,$3,$4) returning *`,
                    [data.user1, ownerData.ownerid, data.username1, ownerData.username]
                );
                console.log(query2.rows, '2');
                res.send(query2.rows[0]);
            } else {
                console.log(query1.rows, '1');
                res.send(query1.rows[0]);
            }
            
        } else {
            res.status(400).send('cannot chat with yourself')
        }
    },
    async getConversations(req,res) {
        try {
            const userId = req.params.userId;
            const query = await pool.query(
                'select * from conversations where user1 = $1 OR user2 = $2 ORDER BY lastMessageDate ASC',
                [userId, userId]
            )
            res.send(query.rows);
        } catch(e) {
            console.log(e.message);
        }
    },
    async getChat(req, res) {
        try {
            const conversationId = req.params.conversationId;
            console.log(conversationId)
            const query = await pool.query(
                'select messages.id as id, messagefrom, message.content,message.seen,message.delivered, message.date,message.filepath from messages join message on message.id=messages.message where conversationid = $1 ',
                [conversationId]
            )
            res.send(query.rows);
        } catch (e) {
            console.log(e.message)
        }
    },
}

export default ChatController;