export type UserStatus = 'verified' | 'blocked' | 'pending';

export class UserUniqueAttributeFilters {
  emailAddress?: string;
  userId?: string;
  firebaseId?: string;
  username?: string;
  idNumber?: string;
}
