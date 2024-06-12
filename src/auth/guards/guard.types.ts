import { Request } from 'express';
import { AdminPermissions } from 'src/database';

export interface RequestUser {
  entityId: string;
  email: string;
  role: string;
  permissions?: AdminPermissions;
}

export interface ApiRequest extends Request {
  user: RequestUser;
}

export interface PermissionOpts {
  create?: string;
  update?: string;
  delete?: string;
  get?: string;
}
