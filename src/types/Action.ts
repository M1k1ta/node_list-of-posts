// eslint-disable-next-line no-shadow
import { NextFunction, Response, Request } from 'express';

export type Action = (req: Request, res: Response, next: NextFunction) => void;
