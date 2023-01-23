import { Injectable } from '@nestjs/common';
import { User } from '@realiza/shared/types';

@Injectable()
export class AppService {
  getData(): User {
    return { name: 'João' };
  }
}
