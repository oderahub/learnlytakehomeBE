import { Request, Response, NextFunction } from 'express';
import { createLogger, transports, format } from 'winston';

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message, ...meta }) => {
      return `${timestamp} ${level}: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''}`;
    })
  ),
  transports: [
    new transports.Console(),
  ],
});

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  res.on('finish', () => {
    const { method, url } = req;
    const { statusCode } = res;
    const logLevel = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info';

    let action = '';
    switch (method) {
      case 'POST':
        action = statusCode >= 400 ? 'Failed to create' : 'Created';
        break;
      case 'PUT':
        action = statusCode >= 400 ? 'Failed to update' : 'Updated';
        break;
      case 'DELETE':
        action = statusCode >= 400 ? 'Failed to delete' : 'Deleted';
        break;
      case 'GET':
        action = statusCode >= 400 ? 'Failed to retrieve' : 'Retrieved';
        break;
      default:
        action = 'Performed';
    }

    const message = `${action} ${method} ${url} with status ${statusCode}`;
    logger.log(logLevel, message, { method, url, statusCode });
  });

  next();
};

export default requestLogger;
