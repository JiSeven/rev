import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

import { DomainException } from '@/catalog/domain/exceptions/domain.exception';
import { ProductNotFoundException } from '@/catalog/domain/exceptions/product-not-found.exception';
import { ProductAlreadyExistsException } from '@/catalog/domain/exceptions/product-already-exists.exception';

const EXCEPTION_STATUS_MAP = {
  [ProductNotFoundException.toString()]: HttpStatus.NOT_FOUND,
  [ProductAlreadyExistsException.toString()]: HttpStatus.CONFLICT,
} as const;

/**
 * Catches DomainExceptions and maps them to HTTP responses using the
 * httpStatus each exception declares. NestJS HttpExceptions are re-thrown
 * so NestJS's built-in handler processes them normally. Unknown errors
 * are logged and returned as 500.
 */
@Catch()
export class DomainExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(DomainExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();

    if (exception instanceof DomainException) {
      const status =
        EXCEPTION_STATUS_MAP[exception.name] ??
        HttpStatus.INTERNAL_SERVER_ERROR;

      response.status(status).json({
        statusCode: status,
        error: exception.name,
        message: exception.message,
      });
      return;
    }

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json(exception.getResponse());
      return;
    }

    this.logger.error('Unhandled exception', exception);

    response.status(500).json({
      statusCode: 500,
      error: 'InternalServerError',
      message: 'An unexpected error occurred',
    });
  }
}
