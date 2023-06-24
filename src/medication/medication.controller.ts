import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMedicationDTO } from './dto/create-medication.dto';
import { MedicationService } from './medication.service';

@Controller('medication')
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {}
  @Post()
  async create(@Body() medication: CreateMedicationDTO) {
    return this.medicationService.create({ ...medication });
  }

  @Get()
  async getAll() {
    return this.medicationService.getAll();
  }
}
