import { Response, Request, NextFunction } from 'express';
import { injectable } from 'tsyringe';
import { BaseError } from '../errors/BaseError';

@injectable()
export class ErrorHandler {
  public instance = async (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    this.handleError(err, res);
  };
  public async handleError(err: Error, res: Response): Promise<void> {
    if (this.isTrustedError(err)) {
      const baseError = err as BaseError;
      res.status(baseError.httpCode).json({
        name: baseError.name,
        message: baseError.message,
      });
      return;
    } else {
      res.status(500).json({
        name: 'INTERNAL_SERVER_ERROR',
        message: err.message,
      });
      return;
    }
  }

  public isTrustedError(error: Error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}
