import { createLogger, format, transports } from 'winston';

// Create a logger instance
const logger = createLogger({
  level: 'info', // Log level
  format: format.combine(
    format.timestamp(), // Add timestamp to log messages
    format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`) // Format log message
  ),
  transports: [new transports.Console()], // Output logs to console
});

export default logger;
