import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateMedicationDTO } from './dto/create-medication.dto';
import { MedicationService } from './medication.service';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdatePatchMedicationDTO } from './dto/update-patch-medication';
import { GetMedicationDTO } from './dto/get-medication.dto';

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
  async getByUser(@User() user, @Query() params: GetMedicationDTO) {
    Logger.log(params);
    return this.medicationService.getByUserId(user.id, params);
  }

  @UseGuards(AuthGuard)
  @Get("interactions")
  async getInteractionsByUser(@User() user) {
    return this.medicationService.getInteractions(user.id);
  }

  @Delete()
  async delete(@Query('id') id: string) {
    return this.medicationService.deleteById(id);
  }

  @Patch()
  async update(
    @Body() data: UpdatePatchMedicationDTO,
    @Query('id') id: string,
  ) {
    this.medicationService.update(id, data);
  }
}
