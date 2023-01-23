import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {UserService} from '@realiza/api/user'
import { User } from '@realiza/shared/types';
@Injectable()
export class AuthenticationService {
  constructor(private usersService: UserService) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}
