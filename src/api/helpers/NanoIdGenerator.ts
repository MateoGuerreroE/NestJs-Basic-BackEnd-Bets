import { customAlphabet } from 'nanoid';

export const generateNanoId = (size: number): string => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const nanoId = customAlphabet(alphabet, size);
  return nanoId();
};
