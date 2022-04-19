import { IsString, IsInt, Max, IsPhoneNumber, Matches } from 'class-validator';
import { Match } from 'src/validators/match.validator';

export class RegisterUserRequestDto {
  @IsString()
  name: string;

  @IsInt()
  @Max(80)
  age: number;

  @IsPhoneNumber('IR', {
    message:
      'Invalid phone number! The number should be in "+98XXXXXXXXXX" format.',
  })
  mobile: string;

  @IsString()
  @Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/, {
    message:
      'password must be longer than 8 characters and should contain at least a number, an Uppercase alphabet and a lowercase alphabet',
  })
  password: string;

  @Match('password', { message: "Two password fields doesn't match!" })
  @IsString()
  rePassword: string;
}
