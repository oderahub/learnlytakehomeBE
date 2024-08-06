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

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  const { method, url } = req;
  const message = `${method} ${url} - ${err.message}`;

  logger.error(message, { method, url, statusCode, stack: err.stack });

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

export default errorMiddleware;
