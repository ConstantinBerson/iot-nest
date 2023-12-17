import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom, map } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { DataService } from 'src/data.service';
import { AggregateErrorHandler } from 'src/error-handler.service';

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
    const auth = await firstValueFrom(
      this.http
        .get(
          `${this.url}/boulou_check_developerCredentials?email=${email}&developerId=${developerId}`,
        )
        .pipe(
          map((response) => response.data),
          catchError((error: any) =>
            this.errorHandler.handleError(
              error,
              'Authetication error:',
              this.logger,
            ),
          ),
        ),
    );
    if (auth['error']) {
      throw new UnauthorizedException('Invalid email or developerId');
    }
    // this.dataService.createUser(developerId);
    const payload = { email: email, developerId: developerId };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
