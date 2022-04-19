import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from '../users.entity';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext): IUser => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
