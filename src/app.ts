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
        this.app.listen(3000, () => {
            console.log("Server started at port 3000");
        })
    }
}

export default App;






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