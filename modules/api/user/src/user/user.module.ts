import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@realiza/api/infrastructure';
import { UserService } from './user.service';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UserRepository]),
  ],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
