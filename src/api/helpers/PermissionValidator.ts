import { UnauthorizedException } from '@nestjs/common';
import { PermissionOpts, RequestUser } from '../../auth/guards/guard.types';
import { AdminPermissions } from 'src/database';

export const permissionsValidator = (
  user: RequestUser,
  ReqPermission: PermissionOpts,
): boolean => {
  if (user.role !== 'admin' || !user.permissions)
    throw new UnauthorizedException('Only admins can perform this operation');
  const { permissions } = user;
  const permKey: string = Object.keys(permissions)[0];
  if (
    permissions[permKey as keyof AdminPermissions].includes(
      Object.values(ReqPermission)[0],
    )
  )
    return true;
  return false;
};
