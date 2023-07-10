import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DoseService {
  constructor(private readonly prisma: PrismaService) {}

  async getByDate(date: Date) {
    return await this.prisma.dose.findMany({
      where: { time: date },
    });
  }

  async getByDateAndUserId(date: Date, userId: string) {
    return await this.prisma.dose.findMany({
      where: {
        medication: {
          pacientId: userId,
        },
      },
    });
  }
}
