"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_controller_1 = __importDefault(require("../controller/todo.controller"));
const todoRouter = express_1.default.Router();
todoRouter.get('/', todo_controller_1.default.get);
todoRouter.get('/:id', todo_controller_1.default.getById);
exports.default = todoRouter;
//# sourceMappingURL=todo.route.js.map