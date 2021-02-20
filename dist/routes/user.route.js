"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controller/user.controller"));
let UserRouter = express_1.default.Router();
UserRouter.post('/', user_controller_1.default.register);
UserRouter.get('/', user_controller_1.default.get);
exports.default = UserRouter;
//# sourceMappingURL=user.route.js.map