import { Namespace, Socket } from 'socket.io';
export declare class DeviceSocketService {
    private readonly logger;
    constructor();
    private connectedClients;
    io: Namespace;
    emitMessage(clientId: string, data: any): void;
    emitConversationList(clientId: string, data: any): void;
    getConnectedClients: () => {
        [k: string]: Socket<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>;
    };
    getConnectedClientID: (client: Socket) => string;
    addClient: (id: string, client: Socket) => void;
    removeClient: (id: string) => void;
    private emitToClient;
}
