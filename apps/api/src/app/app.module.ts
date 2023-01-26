import { Module } from '@nestjs/common';
import {AuthenticationModule} from '@realiza/api/authentication'
import { UserModule } from '@realiza/api/user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';
@Module({
  imports: [
    AuthenticationModule,
    UserModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
