import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateDoseDTO {
  @ApiProperty()
  @IsDateString()
  time: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  sent: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  taken: boolean;
}
