import { IsString, Max } from 'class-validator';

export class AuthLoginDto {
  @IsString()
  user_name: string;

  @IsString()
  password: string;
}
