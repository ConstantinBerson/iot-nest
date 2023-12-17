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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedException = exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const error_handler_service_1 = require("../../error-handler.service");
const rxjs_1 = require("rxjs");
let AuthService = AuthService_1 = class AuthService {
    constructor(http, configService, jwtService, errorHandler) {
        this.http = http;
        this.configService = configService;
        this.jwtService = jwtService;
        this.errorHandler = errorHandler;
        this.url = '';
        this.logger = new common_1.Logger(AuthService_1.name);
        this.url = this.configService.getOrThrow('URL');
    }
    async login(createAuthDto) {
        const { email, developerId } = createAuthDto;
        const path = `${this.url}/boulou_check_developerCredentials?email=${email}&developerId=${developerId}`;
        return this.http.get(path).pipe((0, rxjs_1.map)((resp) => resp.data));
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService,
        jwt_1.JwtService,
        error_handler_service_1.AggregateErrorHandler])
], AuthService);
class UnauthorizedException extends common_1.HttpException {
    constructor(message) {
        super(message, common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.UnauthorizedException = UnauthorizedException;
//# sourceMappingURL=auth.service.js.map