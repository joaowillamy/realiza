import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthenticationModule } from '@realiza/api/authentication';
import { LoggerInterceptor, winstonConfig } from '@realiza/api/infrastructure';
import { UserModule } from '@realiza/api/user';
import { WinstonModule } from 'nest-winston';

import { mailerConfig } from './mailer/mailer.config';
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
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
