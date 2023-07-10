import { PartialType } from '@nestjs/swagger';
import { UpdatePutDoseDTO } from './update-put-dose.dto';

export class UpdatePatchMedicationDTO extends PartialType(UpdatePutDoseDTO) {}
