import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, User } from '@realiza/shared/types';


@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(username: string): User {
    return {
      password: 'asdf1234',
      username: 'joao'
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
