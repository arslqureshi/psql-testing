"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const main_route_1 = __importDefault(require("../routes/main.route"));
class App {
    constructor() {
        this.app = express_1.default();
        this.PORT = process.env.PORT || 3000;
        this.initMiddleware();
        this.initRoutes();
    }
    initMiddleware() {
        this.app.use(cors_1.default({
            "origin": "*",
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        }));
        this.app.use(express_1.default.json());
        dotenv_1.default.config();
    }
    initRoutes() {
        this.app.use('/', main_route_1.default);
    }
    createServer() {
        this.app.listen(this.PORT, () => {
            console.log("Server started at port 3000");
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map