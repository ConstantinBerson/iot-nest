import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { SwitchStatus } from './dto/switch-status.dto';
import { AggregateErrorHandler } from 'src/error-handler.service';
export declare class DevicesService {
    private readonly http;
    private readonly configService;
    private readonly errorHandler;
    url: string;
    private readonly logger;
    constructor(http: HttpService, configService: ConfigService, errorHandler: AggregateErrorHandler);
    switchStatus(switchDeviceDto: SwitchStatus): Promise<Observable<any>>;
    private handleError;
}
