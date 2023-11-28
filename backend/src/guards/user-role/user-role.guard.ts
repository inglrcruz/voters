import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/decorators/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles: string = this.reflector.get(META_ROLES, context.getHandler()),
      req = context.switchToHttp().getRequest(),
      user = req.user

    if (!validRoles || validRoles.length === 0) return true;

    if (!user) throw new BadRequestException('User not found')
    if (validRoles.includes(user.role)) return true
    throw new ForbiddenException(`User ${user.username} need a valid role: [${validRoles}]`)
  }

}
