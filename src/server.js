require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/database');


const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    console.log('Checking database connection...');
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    await sequelize.sync({ alter: true });
    console.log('Database synchronized.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
};

startServer();
