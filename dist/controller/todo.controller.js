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
const TodoController = {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield db_1.default.query("SELECT * FROM todo");
                res.json(data.rows);
            }
            catch (e) {
                console.log(e.message);
            }
        });
    },
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todo_id = req.params.id;
                console.log(todo_id);
                const data = yield db_1.default.query(`SELECT * FROM todo WHERE id = $1;`, [todo_id]);
                res.json(data.rows);
            }
            catch (e) {
                console.log(e.message);
            }
        });
    }
};
exports.default = TodoController;
//# sourceMappingURL=todo.controller.js.map