import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateDoseDTO {
  @ApiProperty()
  @IsDateString()
  time: Date;

  @ApiProperty()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  stock: number;
}
