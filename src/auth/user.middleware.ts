import { NextFunction, Request, Response } from 'express';

export function user(_req: Request, _res: Response, next: NextFunction) {
  console.log(`Logger User`);
  next();
};