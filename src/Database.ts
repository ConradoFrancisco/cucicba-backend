import * as dotenv from "dotenv";
import path = require("path");
import { DataSource } from "typeorm";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const DevConnection: DataSource = new DataSource ({
  type: "postgres",
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  synchronize: true,
  logging: false,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"]
});

export const getConnection = () => {
  switch (process.env.NODE_ENV) {
    case "development":
      return DevConnection;
    default:
      return DevConnection;
  }
};
