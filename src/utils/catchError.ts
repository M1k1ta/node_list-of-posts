import { NextFunction, Response, Request } from 'express';
import { Action } from '../types/Action';

export const catchError = (action: Action) => {
  return async(req: Request, res: Response, next: NextFunction) => {
    try {
      await action(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};