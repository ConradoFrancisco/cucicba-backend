import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
import path = require("path");

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const DevConnection: Sequelize = new Sequelize(
  process.env.DB_NAME || "",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "root",
  {
    host: process.env.DB_HOST || "localhost",
    port: Number.parseInt(process.env.DB_PORT as string) || 5432,
    dialect: "postgres",
  }
);

const TestConnection: Sequelize = new Sequelize("sqlite::memory:");

export const getConnection = () => {
  switch (process.env.NODE_ENV) {
    case "development":
      return DevConnection;
    case "test":
      return TestConnection;
    default:
      return DevConnection;
  }
};
