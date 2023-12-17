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
var DeviceSocketService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceSocketService = void 0;
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const websockets_1 = require("@nestjs/websockets");
let DeviceSocketService = DeviceSocketService_1 = class DeviceSocketService {
    constructor() {
        this.logger = new common_1.Logger(DeviceSocketService_1.name);
        this.connectedClients = new Map();
        this.getConnectedClients = () => {
            const users = Object.fromEntries(this.connectedClients);
            return users;
        };
        this.getConnectedClientID = (client) => {
            for (const [key, value] of this.connectedClients.entries()) {
                const isEqual = isObjectEqual(value, client);
                if (isEqual) {
                    return key;
                }
            }
        };
        this.addClient = (id, client) => {
            this.connectedClients.set(id, client);
        };
        this.removeClient = (id) => {
            this.connectedClients.delete(id);
        };
        this.emitToClient = async (clientId, event, data) => {
            try {
                this.logger.log('Emit to client begin ...');
                const client = this.connectedClients.get(clientId);
                if (client) {
                    this.logger.log(client);
                    this.logger.log(`Client Socket ID: ${client?.id}`);
                    client.emit(event, data);
                }
            }
            catch (error) {
                this.logger.warn(error);
                throw new common_1.BadRequestException('An error occured', error);
            }
        };
        this.logger.log('-----------------------');
        this.logger.log('⚡ Socket service initialized ⚡');
        this.logger.log('-----------------------');
    }
    emitMessage(clientId, data) {
        this.emitToClient(clientId, 'findMessage', data);
    }
    emitConversationList(clientId, data) {
        this.emitToClient(clientId, 'findConversationList', data);
    }
};
exports.DeviceSocketService = DeviceSocketService;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Namespace)
], DeviceSocketService.prototype, "io", void 0);
exports.DeviceSocketService = DeviceSocketService = DeviceSocketService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DeviceSocketService);
function isObjectEqual(objA, objB) {
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
//# sourceMappingURL=device.socket.service.js.map