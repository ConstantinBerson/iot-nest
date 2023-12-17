import { ConfigService } from '@nestjs/config';
export declare class DataService {
    private readonly configService;
    private path;
    private readonly logger;
    constructor(configService: ConfigService);
    private getDataFromFile;
    private saveData;
    createUser(developerId: string): "Login success" | "User created";
}
