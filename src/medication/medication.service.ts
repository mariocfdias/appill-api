import { Injectable } from '@nestjs/common';
import { CreateMedicationDTO } from './dto/create-medication.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class MedicationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(medication: CreateMedicationDTO) {
    //await this.prisma.medication.create({});
  }
}
