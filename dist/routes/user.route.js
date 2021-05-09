"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const authGuard_route_1 = __importDefault(require("./authGuard.route"));
let UserRouter = express_1.default.Router();
UserRouter.post('/signup', user_controller_1.default.register);
UserRouter.get('/', authGuard_route_1.default, user_controller_1.default.get);
UserRouter.post('/login', user_controller_1.default.login);
UserRouter.post('/resetPasswordRequest', user_controller_1.default.resetPasswordRequest);
UserRouter.post('/resetPassword', user_controller_1.default.resetPassword);
UserRouter.post('/username', user_controller_1.default.checkUsername);
UserRouter.post('/createCard', user_controller_1.default.createCard);
UserRouter.get('/getCards/:personId', user_controller_1.default.getCards);
exports.default = UserRouter;
//# sourceMappingURL=user.route.js.map