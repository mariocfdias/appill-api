import { Body, Controller, Post } from '@nestjs/common';
import { CreateMedicationDTO } from './dto/create-medication.dto';

@Controller('medication')
export class MedicationController {
  @Post()
  async create(@Body() medication: CreateMedicationDTO) {
    return medication;
  }
}
