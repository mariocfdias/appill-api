import { IsEmail, IsString } from 'class-validator';

export class AuthForgetDTO {
  @IsEmail()
  @IsString()
  email: string;
}
