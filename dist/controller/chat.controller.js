"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../src/db"));
const ChatController = {
    createChatRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const query = yield db_1.default.query(`select * from warehouses join person on person.id=warehouses.ownerid where warehouses.id=$1`, [data.warehouseId]);
            const ownerData = query.rows[0];
            console.log(ownerData);
            if (ownerData.ownerid !== data.user1) {
                const query1 = yield db_1.default.query(`select * from conversations where (user1=$1 and user2=$2) or (user1=$3 and user2=$4)`, [data.user1, ownerData.ownerid, ownerData.ownerid, data.user1]);
                if (query1.rows.length === 0) {
                    const query2 = yield db_1.default.query(`insert into conversations(user1,user2,username1,username2) values($1,$2,$3,$4) returning *`, [data.user1, ownerData.ownerid, data.username1, ownerData.username]);
                    console.log(query2.rows, '2');
                    res.send(query2.rows[0]);
                }
                else {
                    console.log(query1.rows, '1');
                    res.send(query1.rows[0]);
                }
            }
            else {
                res.status(400).send('cannot chat with yourself');
            }
        });
    },
    getConversations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const query = yield db_1.default.query('select * from conversations where user1 = $1 OR user2 = $2 ORDER BY lastMessageDate ASC', [userId, userId]);
                res.send(query.rows);
            }
            catch (e) {
                console.log(e.message);
            }
        });
    },
    getChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversationId = req.params.conversationId;
                console.log(conversationId);
                const query = yield db_1.default.query('select messages.id as id, messagefrom, message.content,message.seen,message.delivered, message.date,message.filepath from messages join message on message.id=messages.message where conversationid = $1 ', [conversationId]);
                res.send(query.rows);
            }
            catch (e) {
                console.log(e.message);
            }
        });
    },
};
exports.default = ChatController;
//# sourceMappingURL=chat.controller.js.map