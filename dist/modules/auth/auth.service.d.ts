import { HttpException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AggregateErrorHandler } from 'src/error-handler.service';
export declare class AuthService {
    private readonly http;
    private readonly configService;
    private readonly jwtService;
    private readonly errorHandler;
    url: string;
    private readonly logger;
    constructor(http: HttpService, configService: ConfigService, jwtService: JwtService, errorHandler: AggregateErrorHandler);
    login(createAuthDto: CreateAuthDto): Promise<import("rxjs").Observable<any>>;
}
export declare class UnauthorizedException extends HttpException {
    constructor(message: string);
}
