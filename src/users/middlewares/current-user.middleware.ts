import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { IUser } from '../users.entity';
import { AuthService } from '../auth.service';

declare global {
  namespace Express {
    interface Request {
      currentUser?: IUser;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    private usersService: UsersService,
    private authSerivce: AuthService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return next();
    const [bearer, token] = req.headers['authorization'].split(' ');
    if (bearer !== 'Bearer') return next();
    try {
      const userId = await this.authSerivce.verifyJwtToken(token);
      req.currentUser = await this.usersService.findOne(userId);
      next();
    } catch (error) {
      req.currentUser = null;
      next();
    }
  }
}
