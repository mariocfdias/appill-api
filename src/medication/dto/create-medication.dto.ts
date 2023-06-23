import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DoseDTO } from './dose.dto';
import { UnitDTO } from './unit.dto';
import { Type } from 'class-transformer';

export class CreateMedicationDTO {
  @IsEnum(UnitDTO)
  @IsNotEmpty()
  unitType: UnitDTO;

  @ValidateNested({ each: true })
  @Type(() => DoseDTO)
  doses: DoseDTO[];

  @IsNotEmpty()
  @IsDateString()
  frequency: Date;

  @IsNotEmpty()
  @IsDateString()
  until: Date;

  @IsNotEmpty()
  stock: number;

  @IsString()
  observation: string;
}
