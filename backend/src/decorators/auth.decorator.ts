import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from 'src/guards/user-role/user-role.guard';
import { RoleProtected } from './role-protected.decorator';
import { Roles } from 'src/entities/enums';

export function Auth(...roles: Roles[]) {
    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(AuthGuard(), UserRoleGuard)
    )
}