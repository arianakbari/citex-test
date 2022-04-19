import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { UsersService } from './users.service';
import { IUser } from './users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private config: ConfigService,
  ) {}

  async register(mobile: string, password: string, age: number, name: string) {
    // See if email is in use
    const users = await this.usersService.find(mobile);
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    // Generate Password hash
    const hashedPassword = await this.usersService.generatePasswordHash(
      password,
    );

    // Create a new user and save it
    const user = await this.usersService.create(
      mobile,
      hashedPassword,
      age,
      name,
    );

    // return the user
    return user;
  }

  async login(mobile: string, password: string) {
    const [user] = await this.usersService.find(mobile);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const compareResult = await this.usersService.comparePasswordHash(
      password,
      user.password,
    );

    if (!compareResult) {
      throw new BadRequestException('bad password');
    }

    return this.generateJwtToken(user);
  }

  async generateJwtToken(user: IUser) {
    const secret = this.config.get<string>('JWT_SECRET_KEY');
    return new Promise<string>((resolve, reject) => {
      jwt.sign(
        { userId: user.id },
        secret,
        {
          expiresIn: '2h',
          issuer: 'example.com',
        },
        (err, token) => {
          if (err) return reject(err);
          resolve(token);
        },
      );
    });
  }

  async verifyJwtToken(token: string) {
    const secret = this.config.get<string>('JWT_SECRET_KEY');
    return new Promise<number>((resolve, reject) => {
      jwt.verify(token, secret, (err, payload: { userId: number }) => {
        if (err) return reject(err);
        resolve(payload.userId);
      });
    });
  }
}
