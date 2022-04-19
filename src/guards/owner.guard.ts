import { CanActivate, ExecutionContext } from '@nestjs/common';

export class OwnerGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    return +request.params.userId === request.currentUser.id;
  }
}
