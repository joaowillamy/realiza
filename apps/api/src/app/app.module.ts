import { Module } from '@nestjs/common';
import {AuthenticationModule} from '@realiza/api/authentication'
import { UserModule } from '@realiza/api/user';
import {typeOrmConfig} from '@realiza/api/infrastructure';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [AuthenticationModule, UserModule, TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}
