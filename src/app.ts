import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from '../routes/main.route';
import http from 'http';
import initSocket from "../routes/socket";


class App {
    public app : any;
    public PORT: any;
    public http: any;
    public io: any;
    constructor() {
        this.app = express();
        this.http = new http.Server(this.app);
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

    private initMiddleware() {
        this.app.use(cors());
        this.app.use(express.json());
        dotenv.config();
    }

    private initRoutes() {
        this.app.use('/', router);
        initSocket(this.io)
    }

    public createServer() {
        this.http.listen(this.PORT, () => {
            console.log("Server started at port 3000");
        })
    }

}

export default App;