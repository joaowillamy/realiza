import { Module } from '@nestjs/common';
import {AuthenticationModule} from '@realiza/api/authentication'
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AuthenticationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
