import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Observable, catchError, firstValueFrom, map, throwError } from 'rxjs';
import { SwitchStatus } from './dto/switch-status.dto';
import { AggregateErrorHandler } from 'src/error-handler.service';
import { AxiosError } from 'axios';
import { Statistics } from './dto/statistic.dto';

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
    return this.http
      .post(`${this.url}/boulou_switch_device`, {
        developerId: developerId,
        email: email,
        deviceId: deviceId,
        switch_status: s,
      })
      .pipe(
        map((response) => response.data),
        catchError((error: any) => this.handleError(error)),
      );
  }

  async getDeviceStatus(email, developerId, deviceId) {
    this.logger.log('switch device init');
    const path = `${this.url}/boulou_check_deviceStatus?developerId=${developerId}&email=${email}&deviceId=${deviceId}`;
    return this.http.get(path).pipe(
      map((response) => response.data),
      catchError((error: any) => this.handleError(error)),
    );
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

  public getStatistique(statisticDto: Statistics) {
    const { developerId, email, deviceId, period_type, period_value, state } =
      statisticDto;
    const path = `${this.url}/boulou_get_deviceStatistics?developerId=${developerId}&email=${email}&deviceId=${deviceId}&period_type=${period_type}&period_value=${period_value}`;
    return this.http.get(path).pipe(
      map((response) => response.data),
      catchError((error: any) => this.handleError(error)),
    );
  }
}
