import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    description: 'Nome de usuario',
    example: 'Mario',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email do usuario',
    example: 'mail@emailprovider.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Telefone do usuario',
    example: '+5585912345678',
  })
  @IsString()
  @IsPhoneNumber('BR')
  phoneNumber: string;

  @ApiProperty({
    description: 'Senha de login do usuario',
    example: '123GMm&',
  })
  @IsString()
  @IsStrongPassword()
  password: string;
}
