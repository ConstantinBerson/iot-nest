import { Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class AggregateErrorHandler {
    handleError(error: any, errorMessage: string, logger: Logger): Observable<never>;
}
