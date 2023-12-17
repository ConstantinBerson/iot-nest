import { Logger } from '@nestjs/common';
import { WebSocketGateway } from '@nestjs/websockets';
import { DeviceSocketService } from './device.socket.service';

@WebSocketGateway()
export class DevicesGateway {
  private logger = new Logger(DevicesGateway.name);
  private participant_typing = {};
  constructor(private readonly deviceSocket: DeviceSocketService) {}

  /**
   * @Session_handling
   */
  afterInit() {
    this.logger.log('-----------------------');
    this.logger.log('⚡ Devices Websocket Gateway initialized ⚡');
    this.logger.log('-----------------------');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handleConnection(client: any, ..._args: any[]) {
    this.logger.log(`${client} connected`);
    try {
      this.deviceSocket.addClient(
        client.handshake.query.developerId as string,
        client,
      );
    } catch (error) {
      this.logger.warn(error);
    }
  }
  handleDisconnect(client: any) {
    const userId = this.deviceSocket.getConnectedClientID(client);
    this.deviceSocket.removeClient(userId);
  }
}