import { IsPhoneNumber, IsString } from 'class-validator';

export class LoginUserRequestDto {
  @IsPhoneNumber('IR', {
    message:
      'Invalid phone number! The number should be in "+98XXXXXXXXXX" format.',
  })
  mobile: string;

  @IsString()
  password: string;
}
