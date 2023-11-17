import { Module } from '@nestjs/common';
import { RxnormService } from './rxnorm.service';
import { HttpModule } from '@nestjs/axios';
import { RxNormController } from './rxnorm.controller';

@Module({
  imports: [HttpModule],
  providers: [RxnormService],
  controllers: [RxNormController],
  exports: [RxnormService]
})
export class RxnormModule {}
