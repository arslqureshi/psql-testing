import pool from '../src/db'; 

const TodoController =  {
    async get (req,res) {
        try{
            const data = await pool.query(
                "SELECT * FROM todo"
            )
            res.json(data.rows);
        } catch(e) {
            console.log(e.message)
        }
    },
    async getById (req,res) {
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
    }
}
export default TodoController;