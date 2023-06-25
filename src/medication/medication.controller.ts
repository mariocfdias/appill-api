import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateMedicationDTO } from './dto/create-medication.dto';
import { MedicationService } from './medication.service';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Medication')
@ApiBearerAuth()
@Controller('medication')
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {}
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() medication: CreateMedicationDTO, @User() user) {
    return this.medicationService.create({ ...medication }, user.id);
  }

  @Get('all')
  async getAll() {
    return this.medicationService.getAll();
  }

  @UseGuards(AuthGuard)
  @Get()
  async getByUser(@User() user) {
    return this.medicationService.getByUserId(user.id);
  }
}
