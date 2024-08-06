import app from './app';
import sequelize from './data-source';
import logger from './utils/logger';

const startServer = async () => {
  try {
    await sequelize.authenticate(); 
    await sequelize.sync(); 
    logger.info('Database connected and synchronized.');

    const PORT = process.env.PORT || 3000; // Port from environment or default to 3000
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
};

startServer();
