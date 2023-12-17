import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DataService {
  private path: string;
  private readonly logger = new Logger(DataService.name);
  constructor(private readonly configService: ConfigService) {
    this.path = this.configService.getOrThrow('DATABASE');
    this.logger.log(this.path);
  }

  private getDataFromFile(): any {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return { users: [] };
    }
  }

  private saveData(data: any): void {
    try {
      // fs.writeFileSync(this.path, JSON.stringify(data, null, 2), 'utf-8');
      fs.writeFile(this.path, JSON.stringify(data), null, (res) => {
        this.logger.log(res);
      });
    } catch (error) {
      console.error(`Error writing to ${this.path}`, error);
      throw new Error('Unable to save data to file');
    }
  }

  public createUser(developerId: string) {
    //, token: string
    const { users } = this.getDataFromFile();
    this.logger.log('users data :', users);
    let user = users.filter((user) => {
      user.developerId == developerId;
    });
    if (user) {
      return 'Login success';
    } else {
      user = {
        id: developerId,
        devices: [],
        config: {},
        // refreshToken: token,
      };
      users.push(user);
      this.logger.log(user);
      this.saveData({ users });
      return 'User created';
    }
  }
}
