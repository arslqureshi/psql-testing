import pool from '../src/db';

const ChatController = {
    async getConversations(req,res) {
        try {
            const userId = req.params.userId;
            const query = await pool.query(
                'select * from conversations where user1 = $1 OR user2 = $2',
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
    async addMessage(req,res) {
        
    }
}

export default ChatController;