export type Entities = 'admin' | 'user' | 'bet' | 'transaction';

export interface AdminPermissions {
  update: Entities[];
  create: Entities[];
  delete: Entities[];
  get: Entities[];
}
