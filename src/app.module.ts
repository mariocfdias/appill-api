import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicationModule } from './medication/medication.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { DoseModule } from './doses/doses.module';
@Module({
  imports: [MedicationModule, AuthModule, UserModule, DoseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
