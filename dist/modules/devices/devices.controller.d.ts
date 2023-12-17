import { DevicesService } from './devices.service';
import { SwitchStatus } from './dto/switch-status.dto';
export declare class DevicesController {
    private readonly devicesService;
    constructor(devicesService: DevicesService);
    switchDevice(switchDeviceDto: SwitchStatus): Promise<import("rxjs").Observable<any>>;
}
