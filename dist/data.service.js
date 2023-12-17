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
var DataService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const config_1 = require("@nestjs/config");
let DataService = DataService_1 = class DataService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(DataService_1.name);
        this.path = this.configService.getOrThrow('DATABASE');
        this.logger.log(this.path);
    }
    getDataFromFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            return { users: [] };
        }
    }
    saveData(data) {
        try {
            fs.writeFile(this.path, JSON.stringify(data), null, (res) => {
                this.logger.log(res);
            });
        }
        catch (error) {
            console.error(`Error writing to ${this.path}`, error);
            throw new Error('Unable to save data to file');
        }
    }
    createUser(developerId) {
        const { users } = this.getDataFromFile();
        this.logger.log('users data :', users);
        let user = users.filter((user) => {
            user.developerId == developerId;
        });
        if (user) {
            return 'Login success';
        }
        else {
            user = {
                id: developerId,
                devices: [],
                config: {},
            };
            users.push(user);
            this.logger.log(user);
            this.saveData({ users });
            return 'User created';
        }
    }
};
exports.DataService = DataService;
exports.DataService = DataService = DataService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], DataService);
//# sourceMappingURL=data.service.js.map