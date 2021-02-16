"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_route_1 = __importDefault(require("./todo.route"));
const user_route_1 = __importDefault(require("./user.route"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.send('hello from Server');
});
router.use('/todo', todo_route_1.default);
router.use('/user', user_route_1.default);
exports.default = router;
//# sourceMappingURL=main.route.js.map