const { Sequelize } = require('sequelize');
require('dotenv').config();

// Ensure the .env file has these variables defined
const sequelize = new Sequelize(
  process.env.DB_NAME,      // Database name
  process.env.DB_USER,      // Database user
  process.env.DB_PASSWORD,  // Database password
  {
    host: process.env.DB_HOST,  // Database host
    dialect: 'mysql',             // MySQL dialect
    port: process.env.DB_PORT,    // Database port
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL database');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit the process if connection fails
  }
};

// Exporting sequelize and connectDB for use in other parts of the application
module.exports = { sequelize, connectDB };
