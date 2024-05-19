"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.Database = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const poolOptions = {
    user: "root",
    database: "cucicbadb",
    password: "",
    host: "localhost",
    port: 3306,
    connectionLimit: 10,
};
class Database {
    constructor() {
        this.pool = promise_1.default.createPool(poolOptions);
    }
    async getConnection() {
        return await this.pool.getConnection();
    }
}
exports.Database = Database;
exports.db = new Database();
