import { Expose } from 'class-transformer';

export class RegisterUserResponseDto {
  @Expose()
  id: number;

  @Expose()
  mobile: string;
}
