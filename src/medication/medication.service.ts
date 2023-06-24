import { Injectable } from '@nestjs/common';
import { CreateMedicationDTO } from './dto/create-medication.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class MedicationService {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    unitType,
    frequency,
    observation,
    stock,
    doses,
    until,
  }: CreateMedicationDTO) {
    return await this.prisma.medication.create({
      data: {
        id: uuidv4(),
        unitType,
        frequency: frequency.toLocaleString(),
        observation,
        stock,
        doses: {
          create: [
            ...doses.map((dose) => {
              return {
                quantity: dose.quantity,
                time: new Date(dose.time),
                id: uuidv4(),
              };
            }),
          ],
        },
        until: new Date(until),
      },
    });
  }

  async getAll() {
    return await this.prisma.medication.findMany();
  }
}
