import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicationModule } from './medication/medication.module';
@Module({
  imports: [MedicationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
