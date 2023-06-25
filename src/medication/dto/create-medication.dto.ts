import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DoseDTO } from './dose.dto';
import { UnitDTO } from './unit.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

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

export class CreateMedicationDTO {
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
