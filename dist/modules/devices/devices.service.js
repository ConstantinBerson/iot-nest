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
var DevicesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevicesService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const error_handler_service_1 = require("../../error-handler.service");
const axios_2 = require("axios");
let DevicesService = DevicesService_1 = class DevicesService {
    constructor(http, configService, errorHandler) {
        this.http = http;
        this.configService = configService;
        this.errorHandler = errorHandler;
        this.url = '';
        this.logger = new common_1.Logger(DevicesService_1.name);
        this.url = this.configService.getOrThrow('URL');
    }
    async switchStatus(switchDeviceDto) {
        const { developerId, email, deviceId, status } = switchDeviceDto;
        const s = status ? 'ON' : 'OFF';
        this.logger.log('switch device init');
        return this.http
            .post(`${this.url}/boulou_switch_device`, {
            developerId: developerId,
            email: email,
            deviceId: deviceId,
            switch_status: s,
        })
            .pipe((0, rxjs_1.map)((response) => response.data), (0, rxjs_1.catchError)((error) => this.handleError(error)));
    }
    handleError(error) {
        if (error instanceof axios_2.AxiosError) {
            this.logger.error('HTTP request error:', error.message);
            return (0, rxjs_1.throwError)(() => new common_1.BadRequestException(error.message));
        }
        this.logger.error('Unknown error details:', error);
        return (0, rxjs_1.throwError)(() => new common_1.BadRequestException('Unknown error occurred'));
    }
};
exports.DevicesService = DevicesService;
exports.DevicesService = DevicesService = DevicesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService,
        error_handler_service_1.AggregateErrorHandler])
], DevicesService);
//# sourceMappingURL=devices.service.js.map