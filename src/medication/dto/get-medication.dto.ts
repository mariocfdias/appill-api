import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class GetMedicationDTO {
  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  date: Date;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  isActive: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name: string;
}
