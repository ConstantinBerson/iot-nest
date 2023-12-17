"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateErrorHandler = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const rxjs_1 = require("rxjs");
let AggregateErrorHandler = class AggregateErrorHandler {
    handleError(error, errorMessage, logger) {
        if (error instanceof AggregateError && Array.isArray(error.errors)) {
            const axiosError = error.errors.find((err) => err instanceof axios_1.AxiosError);
            if (axiosError) {
                logger.error(errorMessage, axiosError.message);
                return (0, rxjs_1.throwError)(() => {
                    new common_1.BadRequestException(errorMessage);
                });
            }
        }
        logger.error('Unknown error:', error.message);
        return (0, rxjs_1.throwError)(() => {
            new common_1.BadRequestException('Unknown error occurred');
        });
    }
};
exports.AggregateErrorHandler = AggregateErrorHandler;
exports.AggregateErrorHandler = AggregateErrorHandler = __decorate([
    (0, common_1.Injectable)()
], AggregateErrorHandler);
//# sourceMappingURL=error-handler.service.js.map