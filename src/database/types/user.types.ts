export type UserStatus = 'verified' | 'blocked' | 'pending';

export type UserUniqueAttributeFilters = {
  emailAddress?: string;
  userId?: string;
  firebaseId?: string;
  username?: string;
  idNumber?: string;
};
