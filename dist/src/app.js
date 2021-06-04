"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const main_route_1 = __importDefault(require("../routes/main.route"));
const http_1 = __importDefault(require("http"));
const socket_1 = __importDefault(require("../routes/socket"));
class App {
    constructor() {
        this.app = express_1.default();
        this.http = new http_1.default.Server(this.app);
        this.io = require('socket.io')(this.http, {
            withCredentials: true,
            transports: ['websocket', 'polling'],
            cors: {
                origin: "*",
            }
        });
        this.PORT = process.env.PORT || 3000;
        this.initMiddleware();
        this.initRoutes();
    }
    initMiddleware() {
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        dotenv_1.default.config();
    }
    initRoutes() {
        this.app.use('/', main_route_1.default);
        socket_1.default(this.io);
    }
    createServer() {
        this.http.listen(this.PORT, () => {
            console.log("Server started at port 3000");
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map