import User from '../interface/user.interface';
import pool from '../src/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import emailController from './email.controller';

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
                [userData.email, userData.password, 'unset', new Date(), true, userData.userName, userData.phoneNumber]
            )
            const token = jwt.sign({_id: result.rows[0].id}, process.env.TOKEN_SECRET);
            let data = result.rows[0];
            data.token = token;
            console.log(data);
            res.send(data);
        }
    },
    async login(req, res) {
        let {email, password} = req.body;
        const userCheck = await pool.query(
            "SELECT * FROM person WHERE email=$1;",
            [req.body.email]
        );
        if(userCheck.rows.length){
            const passwordCheck = await bcrypt.compare(password, userCheck.rows[0].password);
            if(passwordCheck) {
                const token = await jwt.sign({_id: userCheck.rows[0].id}, process.env.TOKEN_SECRET);
                let data = userCheck.rows[0];
                data.token = token;
                console.log(data);
                res.send(data);
            } else {
                res.status(400).send("Incorrect Password");
            }
        } else {    
            res.status(404).send("User not found");
        }
    },
    async get (req, res) {
        const data = await pool.query(
            "SELECT * FROM person;"
        )
        res.send(data.rows);
    },
    async resetPasswordRequest(req, res)  {
        const {email} =await  req.body;
        const result = await pool.query(
            'SELECT * FROM person WHERE email=$1',
            [email]
        );
        if(result.rows.length) {
            const salt = await bcrypt.genSalt(10);
            const token = await bcrypt.hash(result.rows[0].id.toString(), salt)
            const clientUrl = "http://localhost:4200";
            emailController.sendmail("Reset Password", '<h4><b>Reset Password</b></h4>' +
            '<p>To reset your password, complete this form:</p>' +
            '<a href=' + clientUrl + 'reset/' + result.rows[0].id + '/' + token + '">' + clientUrl + 'reset/' + result.rows[0].id  + '/' + token + '</a>' +
            '<br><br>' +
            '<p>--Team</p>', result.rows[0].email);
            res.send("Email sent");
        } else {    
            res.status(404).send("Email not found");
        }
    },
    async resetPassword(req, res) {
        let {id, token, password} = req.body;
        const tokenCompareResult = await bcrypt.compare(id, token);
        if(tokenCompareResult) {
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
            const query = await pool.query(
                'UPDATE person SET password=$1 WHERE id=$2 returning *',
                [password, id]
            );
            res.send("Password Updated");
        } else {
            res.status(403).send("Invalid Token")
        }
    },
    async checkUsername(req, res) {
        let {userName} = req.body;
        const check = await pool.query(
            "SELECT userName FROM person WHERE userName=$1;",
            [userName]
        );
        if(check.rows.length) {
            res.status(400).send("Username not available");
        } else {
            res.send("Username is available");
        }
    }
}
export default UserController;