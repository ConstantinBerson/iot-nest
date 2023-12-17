import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Namespace, Socket } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';

@Injectable()
export class DeviceSocketService {
  private readonly logger = new Logger(DeviceSocketService.name);
  constructor() {
    this.logger.log('-----------------------');
    this.logger.log('⚡ Socket service initialized ⚡');
    this.logger.log('-----------------------');
  }
  private connectedClients = new Map<string, Socket>();
  @WebSocketServer() io: Namespace;
  emitMessage(clientId: string, data: any) {
    this.emitToClient(clientId, 'findMessage', data);
  }

  emitConversationList(clientId: string, data: any) {
    this.emitToClient(clientId, 'findConversationList', data);
  }

  getConnectedClients = () => {
    const users = Object.fromEntries(this.connectedClients);
    return users;
  };

  getConnectedClientID = (client: Socket) => {
    for (const [key, value] of this.connectedClients.entries()) {
      const isEqual = isObjectEqual(value, client);
      if (isEqual) {
        return key;
      }
    }
  };

  addClient = (id: string, client: Socket) => {
    this.connectedClients.set(id, client);
  };

  removeClient = (id: string) => {
    this.connectedClients.delete(id);
  };

  private emitToClient = async (clientId: string, event: string, data: any) => {
    try {
      this.logger.log('Emit to client begin ...');
      const client = this.connectedClients.get(clientId);
      if (client) {
        this.logger.log(client);
        this.logger.log(`Client Socket ID: ${client?.id}`);
        client.emit(event, data);
      }
    } catch (error) {
      this.logger.warn(error);
      throw new BadRequestException('An error occured', error);
    }
  };
}
function isObjectEqual(objA: Object, objB: Object) {
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }
  for (const key of keysA) {
    if (objA[key] !== objB[key]) {
      return false;
    }
  }
  return true;
}
