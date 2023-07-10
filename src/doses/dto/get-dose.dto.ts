import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsOptional } from 'class-validator';

export class GetDoseDTO {
  @ApiProperty({
    required: false,
    type: Date,
    default: new Date(), // or something else...
  })
  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  date: Date;

  @ApiProperty({ required: false, type: Boolean })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  taken: string;
}
