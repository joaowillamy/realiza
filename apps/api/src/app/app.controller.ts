import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@realiza/api/authentication';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getData() {
    return this.appService.getData();
  }
}
