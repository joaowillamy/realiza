import { Module } from '@nestjs/common';
import {AuthenticationModule} from '@realiza/api/authentication'
import { UserModule } from '@realiza/api/user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';
import { LoggerInterceptor, winstonConfig } from '@realiza/api/infrastructure';
import { WinstonModule } from 'nest-winston';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    AuthenticationModule,
    UserModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    WinstonModule.forRoot(winstonConfig),
  ],
  controllers: [],
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: LoggerInterceptor,
  }],
})
export class AppModule {}
