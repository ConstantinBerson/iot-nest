import { Namespace, Socket } from 'socket.io';
import { Statistics } from './dto/statistic.dto';
import { DevicesService } from './devices.service';
export declare class DeviceSocketService {
    private readonly devicesService;
    private readonly logger;
    constructor(devicesService: DevicesService);
    private connectedClients;
    io: Namespace;
    emitStatistics(statisticsDto: Statistics): void;
    emitDeviceStatus(statisticsDto: Statistics): void;
    getConnectedClients: () => {
        [k: string]: Socket<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>;
    };
    getConnectedClientID: (client: Socket) => string;
    addClient: (id: string, client: Socket) => void;
    removeClient: (id: string) => void;
    private emitToClient;
}
