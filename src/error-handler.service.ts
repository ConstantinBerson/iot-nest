import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class AggregateErrorHandler {
  handleError(
    error: any,
    errorMessage: string,
    logger: Logger,
  ): Observable<never> {
    if (error instanceof AggregateError && Array.isArray(error.errors)) {
      // Extract the underlying AxiosError
      const axiosError = error.errors.find((err) => err instanceof AxiosError);
      if (axiosError) {
        logger.error(errorMessage, axiosError.message);
        return throwError(() => {
          new BadRequestException(errorMessage);
        });
      }
    }

    // Handle other error scenarios
    logger.error('Unknown error:', error.message);
    return throwError(() => {
      new BadRequestException('Unknown error occurred');
    });
  }
}
