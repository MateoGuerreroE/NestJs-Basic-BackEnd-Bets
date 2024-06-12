import { UserInput } from 'src/api/user';

export class AuthRegisterRequest extends UserInput {
  password: string;
}
