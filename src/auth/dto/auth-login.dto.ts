import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthLoginDTO {
  @ApiProperty({
    description: 'Email do usuario',
    example: 'mail@emailprovider.com',
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Senha de login do usuario',
    example: '123GMm&123',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
