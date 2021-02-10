import express from 'express';
import cors from 'cors';
import pool from '../dist/db.js';
import dotenv from 'dotenv';

let app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
app.listen(process.env.PORT, () => {
    console.log("Server started at port 3000");
})

app.post('/todos', async (req, res) => {
    try{
        const {description} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING * ", 
            [description]
        )
        res.json(newTodo.rows[0]);
    } catch(e) {
        console.log(e.message);
    }
})

// get data
app.get('/todos', async (req, res) => {
    try{
        const data = await pool.query(
            "SELECT * FROM todo"
        )
        res.json(data.rows);
    } catch(e) {
        console.log(e.message)
    }
})

// get single todo
app.get('/todos/:id', async (req, res) => {
    try{
        const todo_id = req.params.id;
        console.log(todo_id);
        const data = await pool.query(
            `SELECT * FROM todo WHERE id = $1;`,
            [todo_id]
        )
        res.json(data.rows);
    } catch(e) {
        console.log(e.message)
    }
})