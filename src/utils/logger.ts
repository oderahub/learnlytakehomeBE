import { createLogger, format, transports } from 'winston';

// Create a logger instance
const logger = createLogger({
  level: 'info', 
  format: format.combine(
    format.timestamp(), 
    format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`) // Format log message
  ),
  transports: [new transports.Console()], 
});

export default logger;
