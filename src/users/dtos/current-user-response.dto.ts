import { Expose } from 'class-transformer';

export class CurrentUserResponseDto {
  @Expose()
  age: number;

  @Expose()
  mobile: string;

  @Expose()
  name: string;
}
