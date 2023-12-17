"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DevicesGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevicesGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const device_socket_service_1 = require("./device.socket.service");
let DevicesGateway = DevicesGateway_1 = class DevicesGateway {
    constructor(deviceSocket) {
        this.deviceSocket = deviceSocket;
        this.logger = new common_1.Logger(DevicesGateway_1.name);
        this.participant_typing = {};
    }
    afterInit() {
        this.logger.log('-----------------------');
        this.logger.log('⚡ Devices Websocket Gateway initialized ⚡');
        this.logger.log('-----------------------');
    }
    async handleConnection(client, ..._args) {
        this.logger.log(`${client} connected`);
        try {
            this.deviceSocket.addClient(client.handshake.query.developerId, client);
        }
        catch (error) {
            this.logger.warn(error);
        }
    }
    handleDisconnect(client) {
        const userId = this.deviceSocket.getConnectedClientID(client);
        this.deviceSocket.removeClient(userId);
    }
};
exports.DevicesGateway = DevicesGateway;
exports.DevicesGateway = DevicesGateway = DevicesGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [device_socket_service_1.DeviceSocketService])
], DevicesGateway);
//# sourceMappingURL=devices.gateway.js.map