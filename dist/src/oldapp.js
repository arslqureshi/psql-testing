// const express = require('express');
// const app = express();
// const cors = require('cors');
// const pool = require('./db');
// //middleware
// app.use(cors());
// app.use(express.json());
// //add data
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
// app.listen(3000, () => {
//     console.log("Server started at port 3000");
// })
//# sourceMappingURL=oldapp.js.map