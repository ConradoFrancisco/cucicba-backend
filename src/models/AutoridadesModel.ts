import { Request, Response } from "express";
import mysql, { ConnectionOptions } from "mysql2/promise";

const access: ConnectionOptions = {
  user: "root",
  database: "cucicbadb",
  password: "",
  host: "localhost",
  port: 3306,
};

export const getCon = async (req:Request,res:Response) => {
  const conn = await mysql.createConnection(access);
  const [data,inf] = await conn.query('SELECT p.id AS publicacion_id, p.descripcion AS descripcion_publicacion, p.fecha AS fecha_publicacion, p.archivo AS archivo_publicacion, c.nombre AS nombre_categoria FROM posts p JOIN categorias c ON p.categoria_id = c.id')
  console.log(data)
  res.send(data)
};
