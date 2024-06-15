import "reflect-metadata"
import * as dotenv from "dotenv";
import * as path from "path";
import { DataSource } from "typeorm"

dotenv.config({
    path: path.resolve(__dirname, "../.env"),
});
  
export const AppDataSource: DataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USER || "postgresql",
    password: process.env.DB_PASS || "root",
    database: process.env.DB_NAME || "test",
    synchronize: true,
    logging: false,
    entities:["src/entity/**/*.ts"]
})

const getDataSource = () => {
    return process.env.NODE_ENV === "test" 
    ? AppDataSource 
    : AppDataSource;
  };
  
export { getDataSource };