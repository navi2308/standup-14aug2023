import { CanActivate, ExecutionContext } from '@nestjs/common';

// This guard is used to protect routes that require authentication. (IE: User should be logged in to access)

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.session.userId;
  }
}
