import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from '../routes/main.route';

class App {
    public app : any;
    public PORT: any;
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT || 3000;
        this.initMiddleware();
        this.initRoutes();
    }
    private initMiddleware() {
        this.app.use(cors({
            "origin": "*",
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        }));
        this.app.use(express.json());
        dotenv.config();
    }
    private initRoutes() {
        this.app.use('/', router);
    }
    public createServer() {
        this.app.listen(this.PORT, () => {
            console.log("Server started at port 3000");
        })
    }
}

export default App;