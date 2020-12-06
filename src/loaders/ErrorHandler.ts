import { Response, Request, NextFunction } from 'express';
import { ValidationError } from 'express-validation';
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
  public async handleError(err: Error, res: Response): Promise<any> {
    if (this.isTrustedError(err)) {
      const baseError = err as BaseError;
      return res.status(baseError.httpCode).json({
        name: baseError.name,
        message: baseError.message,
      });
    }

    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err);
    }

    res.status(500).json({
      name: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    });
  }

  public isTrustedError(error: Error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}
