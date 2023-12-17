import { Controller, Post, Body } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { SwitchStatus } from './dto/switch-status.dto';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post('switch-status')
  switchDevice(@Body() switchDeviceDto: SwitchStatus) {
    return this.devicesService.switchStatus(switchDeviceDto);
  }
}
