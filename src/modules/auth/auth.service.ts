import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
// import { catchError, firstValueFrom, map } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { AggregateErrorHandler } from 'src/error-handler.service';
import { map } from 'rxjs';

@Injectable()
export class AuthService {
  url: string = '';
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    // private readonly dataService: DataService,
    private readonly errorHandler: AggregateErrorHandler,
  ) {
    this.url = this.configService.getOrThrow('URL');
  }
  async login(createAuthDto: CreateAuthDto) {
    const { email, developerId } = createAuthDto;
    const path = `${this.url}/boulou_check_developerCredentials?email=${email}&developerId=${developerId}`;
    return this.http.get(path).pipe(map((resp) => resp.data));
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
