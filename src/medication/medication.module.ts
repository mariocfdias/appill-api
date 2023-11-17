import { Module } from '@nestjs/common';
import { MedicationController } from './medication.controller';
import { MedicationService } from './medication.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { RxnormService } from 'src/rxnorm/rxnorm.service';
import { RxnormModule } from 'src/rxnorm/rxnorm.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, RxnormModule],
  controllers: [MedicationController],
  providers: [MedicationService],
  exports: [MedicationService],
})
export class MedicationModule {}
