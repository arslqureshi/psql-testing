import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from '../routes/main.route';

class App {
    public app : any;
    public PORT: String;
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
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
    }
    public createServer() {
        this.app.listen(process.env.PORT || 3000, () => {
            console.log("Server started at port 3000");
        })
    }
}

export default App;