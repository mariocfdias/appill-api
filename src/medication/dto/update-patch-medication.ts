import { IsBoolean, isBoolean } from 'class-validator';
import { UpdatePutMedicationDTO } from './update-put-medication.dto';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
export class UpdatePatchMedicationDTO extends PartialType(
  OmitType(UpdatePutMedicationDTO, ['doses'] as const),
) {
  @ApiProperty()
  active: boolean;
}
