import { Expose } from 'class-transformer';

export class LoginUserResponseDto {
  @Expose()
  accessToken: number;
}
