require('dotenv').config();
const sequelize = require('../config/database');

const dropAllTables = async () => {
  try {
    console.log('Dropping all tables...');
    await sequelize.drop({ cascade: true });
    console.log('All tables dropped successfully!');
    console.log('Now run yarn dev or npm start to recreate the tables with UUIDs!');
    process.exit(0);
  } catch (error) {
    console.error('Error dropping tables:', error);
    process.exit(1);
  }
};

dropAllTables();