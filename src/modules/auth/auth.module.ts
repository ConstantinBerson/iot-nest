import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { DataService } from 'src/data.service';
import { AggregateErrorHandler } from 'src/error-handler.service';

@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [AuthService, DataService, AggregateErrorHandler],
})
export class AuthModule {}
