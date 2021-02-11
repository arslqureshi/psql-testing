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
        this.PORT = process.env.PORT;
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
    }
    createServer() {
        this.app.listen(3000, () => {
            console.log("Server started at port 3000");
        });
    }
}
exports.default = App;
// app.post('/todos', async (req, res) => {
//     try{
//         const {description} = req.body;
//         const newTodo = await pool.query(
//             "INSERT INTO todo (description) VALUES($1) RETURNING * ", 
//             [description]
//         )
//         res.json(newTodo.rows[0]);
//     } catch(e) {
//         console.log(e.message);
//     }
// })
// // get data
// app.get('/todos', async (req, res) => {
//     try{
//         const data = await pool.query(
//             "SELECT * FROM todo"
//         )
//         res.json(data.rows);
//     } catch(e) {
//         console.log(e.message)
//     }
// })
// // get single todo
// app.get('/todos/:id', async (req, res) => {
//     try{
//         const todo_id = req.params.id;
//         console.log(todo_id);
//         const data = await pool.query(
//             `SELECT * FROM todo WHERE id = $1;`,
//             [todo_id]
//         )
//         res.json(data.rows);
//     } catch(e) {
//         console.log(e.message)
//     }
// })
//# sourceMappingURL=app.js.map