import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMedicationDTO } from './dto/create-medication.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePatchMedicationDTO } from './dto/update-patch-medication';
import { GetMedicationDTO } from './dto/get-medication.dto';
@Injectable()
export class MedicationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    {
      unitType,
      frequency,
      observation,
      stock,
      doses,
      until,
      name,
    }: CreateMedicationDTO,
    userId,
  ) {
    const dosesArrayDTO = [];
    const startDate = new Date();
    const endDate = new Date(until);

    while (startDate <= endDate) {
      doses.forEach((dose) => {
        const doseTime = new Date(dose.time);
        const time = startDate.setUTCHours(
          doseTime.getUTCHours(),
          doseTime.getUTCMinutes(),
          doseTime.getUTCSeconds(),
          doseTime.getUTCMilliseconds(),
        );

        dosesArrayDTO.push({
          quantity: dose.quantity,
          time,
          id: uuidv4(),
        });
      });
      startDate.setDate(startDate.getDate() + 1);
    }

    return await this.prisma.medication.create({
      data: {
        id: uuidv4(),
        unitType,
        frequency: frequency.toLocaleString(),
        observation,
        stock,
        pacientId: userId,
        name,
        doses: {
          create: [
            ...dosesArrayDTO.map((dose) => {
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

  async exists(id: string) {
    const medication = await this.prisma.medication.findUnique({
      where: { id },
    });

    if (medication) return true;

    return false;
  }

  async getAll() {
    return await this.prisma.medication.findMany({
      include: {
        doses: true,
        pacient: true,
      },
    });
  }

  async deleteById(id: string) {
    const exists = await this.exists(id);
    if (!exists)
      throw new BadRequestException(`Medicação ${id} não encontrada`);

    return await this.prisma.medication.delete({
      where: {
        id,
      },
    });
  }

  async getByUserId(userId: string, getMedicationOptions: GetMedicationDTO) {
    const { isActive, date, name } = getMedicationOptions;

    return await this.prisma.medication.findMany({
      include: {
        doses: true,
      },
      where: {
        pacientId: userId,
        name: {
          contains: name,
        },
        active: isActive == undefined ? undefined : isActive === 'true',
        AND: {
          until: {
            gte: date && new Date(date),
          },
          createdAt: {
            lte: date && new Date(date),
          },
        },
      },
    });
  }

  async update(id: string, data: UpdatePatchMedicationDTO) {
    const { name, frequency, observation, stock, unitType, until, active } =
      data;
    return await this.prisma.medication.update({
      data: { name, observation, stock, unitType, until, active },
      where: { id },
    });
  }
}
