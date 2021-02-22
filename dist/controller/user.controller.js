"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../src/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserController = {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let userData = {};
            userData = req.body;
            const check = yield db_1.default.query("SELECT * FROM person WHERE email=$1;", [req.body.email]);
            if (check.rows.length) {
                res.status(400).send('Email Already Exists');
            }
            else {
                const salt = yield bcryptjs_1.default.genSalt(10);
                userData.password = yield bcryptjs_1.default.hash(userData.password, salt);
                const result = yield db_1.default.query('INSERT INTO person (email, password, role, date, active, userName, phoneNumber) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *', [userData.email, userData.password, userData.role, new Date(), userData.active, userData.userName, userData.phoneNumber]);
                const token = jsonwebtoken_1.default.sign({ _id: result.rows[0].id }, process.env.TOKEN_SECRET);
                res.header('auth-token', token);
                res.json().send(result.rows[0]);
            }
        });
    },
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield db_1.default.query("SELECT * FROM person;");
            res.send(data.rows);
        });
    }
};
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map