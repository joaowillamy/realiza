import { Module } from '@nestjs/common';
import {AuthenticationModule} from '@realiza/api/authentication'
import { UserModule } from '@realiza/api/user';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AuthenticationModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
