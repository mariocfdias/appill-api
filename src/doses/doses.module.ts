import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { DoseService } from './doses.service';
import { DosesController } from './doses.controller';
import { MedicationModule } from 'src/medication/medication.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, MedicationModule],
  controllers: [DosesController],
  providers: [DoseService],
  exports: [],
})
export class DoseModule {}
