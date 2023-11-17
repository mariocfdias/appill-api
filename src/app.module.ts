import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicationModule } from './medication/medication.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import * as redisStore from 'cache-manager-redis-store';

import { DoseModule } from './doses/doses.module';
import { RxnormModule } from './rxnorm/rxnorm.module';
import { CacheModule } from '@nestjs/cache-manager';
import { env } from 'process';

@Module({
  imports: [
    MedicationModule,
    AuthModule, 
    UserModule, 
    DoseModule, 
    RxnormModule,
    CacheModule.register({
      isGlobal: true,
      ttl: parseInt(env.CACHE_TTL),
      store: redisStore,
      max: 1000,
      host: env.REDIS_URL,
      port: 6379,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
