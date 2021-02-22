"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const pool = new pg_1.default.Pool({
    user: "postgres",
    password: "fypdatabase",
    host: "fyp.crek3zbhhhff.us-east-2.rds.amazonaws.com",
    port: "5432",
    database: "fyp",
    insecureAuth: true,
});
exports.default = pool;
/*
     psql -U postgres = select postgres user in psql
     \l = list all databased
     \c [database name] = select database
     \dt = display all tables in db
*/ 
//# sourceMappingURL=db.js.map