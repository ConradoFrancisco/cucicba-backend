
import { Sequelize,DataTypes } from "sequelize";
export const sequelize = new Sequelize('cucicbadb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', // Cambia según tu base de datos (mysql, postgres, sqlite, etc.)
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

