import { IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateUserRequestDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsInt()
  @IsOptional()
  age: number;
}
