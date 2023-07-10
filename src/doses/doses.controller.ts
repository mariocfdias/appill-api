import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotImplementedException,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DoseService } from './doses.service';
import { GetDoseDTO } from './dto/get-dose.dto';
import { UpdatePatchDoseDTO } from './dto/update-patch-dose.dto';

@ApiTags('Doses')
@ApiBearerAuth()
@Controller('doses')
export class DosesController {
  constructor(private readonly dosesService: DoseService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getByUser(@User() user, @Query() params: GetDoseDTO) {
    Logger.log(params);
    return this.dosesService.getByDateAndUserId(user.id, params);
  }

  @Get('alarm')
  async getById(@Query('id') id: string) {
    return this.dosesService.getDoseById(id);
  }

  @Delete()
  async delete(@Query('id') id: string) {
    return this.dosesService.deleteByMedicationId(id);
  }

  @Patch()
  async update(@Body() data: UpdatePatchDoseDTO, @Query('id') id: string) {
    return this.dosesService.update(id, data);
  }
}
