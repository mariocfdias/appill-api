import { Module } from '@nestjs/common';
import { MedicationController } from './medication.controller';
import { MedicationService } from './medication.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MedicationController],
  providers: [MedicationService],
  exports: [],
})
export class MedicationModule {}
