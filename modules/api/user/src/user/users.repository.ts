import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { baseQueryBuilder, CustomRepository } from '@realiza/api/infrastructure';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { FindUsersQueryDto } from './dto/find-users-query.dto';
import { User } from './entities/user.entity';
import { UserRole } from './user-roles.enum';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async findUsers({
    sort,
    limit = 100,
    page = 1,
    status = true,
    email,
    name,
    role,
  }: FindUsersQueryDto): Promise<{ users: User[]; total: number }> {
    const query = this.createQueryBuilder('user');
    query.where('user.status = :status', { status });

    if (email) {
      query.andWhere('user.email ILIKE :email', { email: `%${email}%` });
    }

    if (name) {
      query.andWhere('user.name ILIKE :name', { name: `%${name}%` });
    }

    if (role) {
      query.andWhere('user.role = :role', { role });
    }

    query.select(['user.id', 'user.name', 'user.email', 'user.role', 'user.status']);

    baseQueryBuilder<User>(query, sort, page, limit);

    const [users, total] = await query.getManyAndCount();

    return { users, total };
  }

  async createUser(createUserDto: CreateUserDto, role: UserRole): Promise<User> {
    const { email, name, password } = createUserDto;

    const user = this.create();
    user.email = email;
    user.name = name;
    user.role = role;
    user.status = true;
    user.confirmationToken = crypto.randomBytes(32).toString('hex');
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    try {
      await user.save();
      delete user.password;
      delete user.salt;
      return user;
    } catch (error) {
      // PostgreSQL Error Codes
      // 23505	unique_violation
      // For more information: https://www.postgresql.org/docs/10/errcodes-appendix.html
      const postgreErrorCodeUniqueViolation = '23505';
      if ((error as Error).code.toString() === postgreErrorCodeUniqueViolation) {
        throw new ConflictException('Endereço de email já está em uso');
      } else {
        throw new InternalServerErrorException('Erro ao salvar o usuário no banco de dados');
      }
    }
  }

  async checkCredentials(credentialsDto: CredentialsDto): Promise<User> {
    const { email, password } = credentialsDto;
    const user = await this.findOne({ where: { email, status: true } });

    if (user && (await user.checkPassword(password))) {
      return user;
    } else {
      return null;
    }
  }

  async changePassword(id: string, password: string) {
    const user = await this.findOne({ where: { id } });
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.recoverToken = null;
    await user.save();
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
