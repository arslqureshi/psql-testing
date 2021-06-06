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
        });
    },
    getConversations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const query = yield db_1.default.query('select * from conversations where user1 = $1 OR user2 = $2', [userId, userId]);
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