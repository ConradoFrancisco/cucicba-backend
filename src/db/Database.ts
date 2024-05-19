import mysql, { Pool, PoolOptions, PoolConnection } from "mysql2/promise";

const poolOptions: PoolOptions = {
  user: "root",
  database: "cucicbadb",
  password: "",
  host: "localhost",
  port: 3306,
  connectionLimit: 10, 
};

export class Database {
  private pool: Pool;

  constructor() {
    this.pool = mysql.createPool(poolOptions);
  }

  async getConnection(): Promise<PoolConnection> {
    return await this.pool.getConnection();
  }
}

export const db = new Database();
