import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { backendEnvs } from '@realiza/shared/utils';
import { User } from '@realiza/api/user'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: backendEnvs.pgHost,
  port: backendEnvs.pgPort,
  username: backendEnvs.pgUsername,
  password: backendEnvs.pgPassword,
  database: backendEnvs.pgDatabase,
  entities: [User],
  logger: 'file',
  synchronize: !backendEnvs.isProduction, // never use TRUE in production!
  autoLoadEntities: true,
};
