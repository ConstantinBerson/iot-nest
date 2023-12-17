import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { HttpModule } from '@nestjs/axios';
import { DevicesGateway } from './devices.gateway';
import { DeviceSocketService } from './device.socket.service';
import { AggregateErrorHandler } from 'src/error-handler.service';

@Module({
  imports: [HttpModule],
  controllers: [DevicesController],
  providers: [
    DevicesService,
    DevicesGateway,
    DeviceSocketService,
    AggregateErrorHandler,
  ],
})
export class DevicesModule {}
