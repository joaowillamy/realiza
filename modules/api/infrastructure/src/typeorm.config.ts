import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { envs } from '@realiza/shared/utils';
import {User} from '@realiza/api/user'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: envs.pgHost,
  port: envs.pgPort,
  username: envs.pgUsername,
  password: envs.pgPassword,
  database: envs.pgDatabase,
  entities: [User],
  logger: 'file',
  synchronize: !envs.isProduction, // never use TRUE in production!
  autoLoadEntities: true,
};
