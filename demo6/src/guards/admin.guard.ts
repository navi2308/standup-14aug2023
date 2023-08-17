import { CanActivate, ExecutionContext } from '@nestjs/common';

// This Guard is used to restrict access to admin only.

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (!request.currentUser) {
      return false;
    }
    return request.currentUser.admin;
  }
}
