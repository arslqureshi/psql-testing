"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chat_controller_1 = __importDefault(require("../controller/chat.controller"));
let chatRouter = express_1.default.Router();
chatRouter.get('/conversations/:userId', chat_controller_1.default.getConversations);
chatRouter.get('/getChat/:conversationId', chat_controller_1.default.getChat);
exports.default = chatRouter;
//# sourceMappingURL=chat.route.js.map