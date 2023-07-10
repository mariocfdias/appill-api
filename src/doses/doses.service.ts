import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetDoseDTO } from './dto/get-dose.dto';
import { MedicationService } from 'src/medication/medication.service';
import { UpdatePatchDoseDTO } from './dto/update-patch-dose.dto';

@Injectable()
export class DoseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly medicationService: MedicationService,
  ) {}

  async getByDateAndUserId(userId: string, params: GetDoseDTO) {
    const { taken, date } = params;

    const dateStart = date ? new Date(date) : new Date();
    const dateEnd = date ? new Date(date) : new Date();

    dateStart.setUTCHours(0, 0, 0, 0);
    dateEnd.setUTCHours(23, 59, 59, 999);

    return await this.prisma.dose.findMany({
      where: {
        taken: taken == undefined ? undefined : taken === 'true',
        medication: {
          pacientId: userId,
        },
        AND: {
          time: {
            gte: dateStart,
            lte: dateEnd,
          },
        },
      },
      orderBy: {
        time: 'asc',
      },
    });
  }

  async update(id: string, data: UpdatePatchDoseDTO) {
    const { time, sent, taken } = data;

    return await this.prisma.dose.update({
      data: { time, sent, taken },
      where: { id },
    });
  }

  async deleteByMedicationId(id: string) {
    const exists = await this.medicationService.exists(id);
    if (!exists)
      throw new BadRequestException(`Medicação ${id} não encontrada`);

    return await this.prisma.dose.deleteMany({
      where: {
        medicationId: id,
      },
    });
  }

  async getDoseById(id: string) {
    return this.prisma.dose.findUnique({
      where: {
        id,
      },
      include: {
        medication: true,
      },
    });
  }
}
