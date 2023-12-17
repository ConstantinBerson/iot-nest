import { DeviceSocketService } from './device.socket.service';
export declare class DevicesGateway {
    private readonly deviceSocket;
    private logger;
    private participant_typing;
    constructor(deviceSocket: DeviceSocketService);
    afterInit(): void;
    handleConnection(client: any, ..._args: any[]): Promise<void>;
    handleDisconnect(client: any): void;
    typing(data: {
        developerId: string;
        email: string;
        deviceId: string;
        period_type: string;
        period_value: string;
        state: boolean;
    }): void;
}
