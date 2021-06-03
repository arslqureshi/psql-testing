import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from '../routes/main.route';
import http from 'http';


class App {
    public app : any;
    public PORT: any;
    public http: any;
    public io: any;
    constructor() {
        this.app = express();
        this.http = new http.Server(this.app);
        this.io = require('socket.io')(this.http);
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
        this.io.on('connection', (Socket)=> {
            console.log('user connected');
            Socket.on('test',() => {
                console.log('test');
            })
        })
    }
    public createServer() {
        this.http.listen(this.PORT, () => {
            console.log("Server started at port 3000");
        })
    }
}

export default App;