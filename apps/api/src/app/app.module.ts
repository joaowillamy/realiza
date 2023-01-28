import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MailerModule } from '@nestjs-modules/mailer';

import { UserModule } from '@realiza/api/user';
import {AuthenticationModule} from '@realiza/api/authentication'
import { LoggerInterceptor, mailerConfig, winstonConfig } from '@realiza/api/infrastructure';

import { typeOrmConfig } from './typeorm.config';

@Module({
  imports: [
    AuthenticationModule,
    UserModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    WinstonModule.forRoot(winstonConfig),
    MailerModule.forRoot(mailerConfig),
  ],
  controllers: [],
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: LoggerInterceptor,
  }],
})
export class AppModule {}
