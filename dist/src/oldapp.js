var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
//middleware
app.use(cors());
app.use(express.json());
//add data
app.post('/todos', (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { description } = req.body;
        const newTodo = yield pool.query("INSERT INTO todo (description) VALUES($1) RETURNING * ", [description]);
        res.json(newTodo.rows[0]);
    }
    catch (e) {
        console.log(e.message);
    }
}));
// get data
app.get('/todos', (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const data = yield pool.query("SELECT * FROM todo");
        res.json(data.rows);
    }
    catch (e) {
        console.log(e.message);
    }
}));
// get single todo
app.get('/todos/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const todo_id = req.params.id;
        console.log(todo_id);
        const data = yield pool.query(`SELECT * FROM todo WHERE id = $1;`, [todo_id]);
        res.json(data.rows);
    }
    catch (e) {
        console.log(e.message);
    }
}));
app.listen(3000, () => {
    console.log("Server started at port 3000");
});
//# sourceMappingURL=oldapp.js.map