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
const SocketController = {
    addMessage(io, data, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield db_1.default.query('insert into message(content, seen,delivered,date) values($1,$2,$3,$4) returning *', [data.content, data.seen, data.delivered, new Date()]);
            const query1 = yield db_1.default.query('insert into messages(conversationId, messageFrom,message) values($1,$2,$3) returning *', [data.conversationId, data.messageFrom, query.rows[0].id]);
            console.log(query.rows[0]);
            if (to != -1) {
                io.to(to).emit('newMessage', query.rows[0]);
            }
        });
    }
};
exports.default = SocketController;
//# sourceMappingURL=socket.controller.js.map