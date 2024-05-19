"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCon = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const access = {
    user: "root",
    database: "cucicbadb",
    password: "",
    host: "localhost",
    port: 3306,
};
const getCon = async (req, res) => {
    const conn = await promise_1.default.createConnection(access);
    const [data, inf] = await conn.query('SELECT p.id AS publicacion_id, p.descripcion AS descripcion_publicacion, p.fecha AS fecha_publicacion, p.archivo AS archivo_publicacion, c.nombre AS nombre_categoria FROM posts p JOIN categorias c ON p.categoria_id = c.id');
    console.log(data);
    res.send(data);
};
exports.getCon = getCon;
