import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Dose } from '@prisma/client';

enum Frequency {
  'SEG' = 'SEG',
  'TER' = 'TER',
  'QUA' = 'QUA',
  'QUI' = 'QUI',
  'SEX' = 'SEX',
  'SAB' = 'SAB',
  'DOM' = 'DOM',
  'ALL' = 'ALL',
}

class DoseDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  time: Date;
}

enum UnitDTO {
  PILL = 'PILL',
  LIQUID = 'LIQUID',
}

export class CreateMedicationDTO {
  @ApiProperty({
    description: 'Tipo de unidade do medicamento',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Tipo de unidade do medicamento',
  })
  @IsEnum(UnitDTO)
  @IsNotEmpty()
  unitType: UnitDTO;

  @ApiProperty({ type: [DoseDTO] })
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => DoseDTO)
  doses: DoseDTO[];

  @ApiProperty({})
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(Frequency, { each: true })
  frequency: Frequency[];

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  until: Date;

  @ApiProperty()
  @IsNotEmpty()
  stock: number;

  @ApiProperty()
  observation: string;
}
