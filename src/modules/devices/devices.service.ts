import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Observable, catchError, firstValueFrom, map, throwError } from 'rxjs';
import { SwitchStatus } from './dto/switch-status.dto';
import { AggregateErrorHandler } from 'src/error-handler.service';
import { AxiosError } from 'axios';

@Injectable()
export class DevicesService {
  url: string = '';
  private readonly logger = new Logger(DevicesService.name);
  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
    private readonly errorHandler: AggregateErrorHandler,
  ) {
    this.url = this.configService.getOrThrow('URL');
  }

  // create(createDeviceDto: CreateDeviceDto) {
  //   return 'This action adds a new device';
  // }

  // getDevices(developerId: string){

  // }

  async switchStatus(switchDeviceDto: SwitchStatus) {
    const { developerId, email, deviceId, status } = switchDeviceDto;
    const s = status ? 'ON' : 'OFF';
    this.logger.log('switch device init');
    this.http
      .post(`${this.url}/boulou_switch_device`, {
        developerId: developerId,
        email: email,
        deviceId: deviceId,
        switch_status: 'ON',
      })
      .pipe(
        map((response) => response.data),
        catchError((error: any) => this.handleError(error)),
      )
      .subscribe({
        next: (res) => {
          // Handle the successful response
          this.logger.log('Response', res);
          return res;
        },
        error: (err) => {
          // Handle errors, including AggregateError
          if (err instanceof AggregateError && Array.isArray(err.errors)) {
            const axiosError = err.errors.find((e) => e instanceof AxiosError);
            if (axiosError) {
              this.logger.error('HTTP request error:', axiosError.message);
              throw new BadRequestException(axiosError.message);
            }
          } else {
            // Log additional details about the unknown error
            this.logger.error('Unknown error details:', err);
            throw new BadRequestException('Unknown error occurred');
          }
        },
      });
  }
  private handleError(error: any): Observable<never> {
    if (error instanceof AxiosError) {
      this.logger.error('HTTP request error:', error.message);
      return throwError(() => new BadRequestException(error.message));
    }

    // Log additional details about the unknown error
    this.logger.error('Unknown error details:', error);
    return throwError(() => new BadRequestException('Unknown error occurred'));
  }
}