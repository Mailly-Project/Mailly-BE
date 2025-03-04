import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

/**
 * Logger middleware that logs
 * 
 * @class LoggerMiddleware
 * @implements {NestMiddleware}
 * 
 * @author luke
 * @since 2025-03-01
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request & { now: number }, _res: Response, next: NextFunction) {
    req.now = Date.now();
    next();
  }
}