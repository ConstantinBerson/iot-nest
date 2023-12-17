"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevicesModule = void 0;
const common_1 = require("@nestjs/common");
const devices_service_1 = require("./devices.service");
const devices_controller_1 = require("./devices.controller");
const axios_1 = require("@nestjs/axios");
const devices_gateway_1 = require("./devices.gateway");
const device_socket_service_1 = require("./device.socket.service");
const error_handler_service_1 = require("../../error-handler.service");
let DevicesModule = class DevicesModule {
};
exports.DevicesModule = DevicesModule;
exports.DevicesModule = DevicesModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [devices_controller_1.DevicesController],
        providers: [
            devices_service_1.DevicesService,
            devices_gateway_1.DevicesGateway,
            device_socket_service_1.DeviceSocketService,
            error_handler_service_1.AggregateErrorHandler,
        ],
    })
], DevicesModule);
//# sourceMappingURL=devices.module.js.map