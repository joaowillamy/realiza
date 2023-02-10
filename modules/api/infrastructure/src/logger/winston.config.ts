import { backendEnvs } from '@realiza/shared/utils';
import { utilities as nestWinstonModuleUtilities, WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';

export const winstonConfig: WinstonModuleOptions = {
  levels: winston.config.npm.levels,
  level: 'verbose',
  transports: [
    ...(backendEnvs.isDevelopment
      ? [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.ms(),
              nestWinstonModuleUtilities.format.nestLike('Realiza', {
                colors: true,
                prettyPrint: true,
              })
            ),
          }),
        ]
      : []),
    new winston.transports.File({
      level: 'verbose',
      filename: 'application.log',
      dirname: 'logs',
    }),
  ],
};
