import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DoseDTO } from './dose.dto';
import { UnitDTO } from './unit.dto';
import { Transform, Type } from 'class-transformer';

enum Frequency {
  'SEG',
  'TER',
  'QUA',
  'QUI',
  'SEX',
  'SAB',
  'DOM',
  'ALL',
}

export class CreateMedicationDTO {
  @IsEnum(UnitDTO)
  @IsNotEmpty()
  unitType: UnitDTO;

  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => DoseDTO)
  doses: DoseDTO[];

  @IsNotEmpty()
  @IsEnum(Frequency)
  frequency: Frequency;

  @IsNotEmpty()
  @IsDateString()
  until: Date;

  @IsNotEmpty()
  stock: number;

  observation: string;
}
