import User from '../interface/user.interface';
import pool from '../src/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserController = {
    async register (req, res) {
        let userData = {} as User;
        userData = req.body;
        const check = await pool.query(
            "SELECT * FROM person WHERE email=$1;",
            [req.body.email]
        );
        if(check.rows.length) {
            res.status(400).send('Email Already Exists');
        } else {
            const salt = await bcrypt.genSalt(10);
            userData.password = await bcrypt.hash(userData.password, salt);
            const result = await pool.query(
                'INSERT INTO person (email, password, role, date, active, userName, phoneNumber) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [userData.email, userData.password, userData.role, new Date(), userData.active, userData.userName, userData.phoneNumber]
            )
            const token = jwt.sign({_id: result.rows[0].id}, process.env.TOKEN_SECRET);
            res.header('auth-token', token);
            res.send(result.rows[0]);
        }
    },
    async get (req, res) {
        const data = await pool.query(
            "SELECT * FROM person;"
        )
        res.send(data.rows);
    }
}
export default UserController;