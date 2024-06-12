import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsUppercase,
  Matches,
  ValidateIf,
} from 'class-validator';

export class UserInput {
  @IsNotEmpty()
  firstName!: string;

  @IsNotEmpty()
  lastName!: string;

  @ValidateIf(() => false)
  firebaseId!: string;

  @IsEmail()
  emailAddress!: string;

  @IsNotEmpty()
  username!: string;

  // Optional fields on creation
  gender?: string;

  birthDate?: Date;

  @IsNotEmpty()
  @IsUppercase()
  @Matches(/^[A-Z]{2}$/, {
    message:
      'Country Identifier must be 2 digit uppercase country code, f.e. US',
  })
  countryIdentifier!: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  idNumber!: string;
}
