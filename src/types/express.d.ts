import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        // Add other properties of the user object if necessary
      };
    }
  }
}
