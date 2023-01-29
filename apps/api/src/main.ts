import { NestFactory } from '@nestjs/core';
import { winstonConfig } from '@realiza/api/infrastructure';
import { WinstonModule } from 'nest-winston';
import * as fs from'fs';
import * as path from 'path';

import { AppModule } from './app/app.module';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';

async function bootstrap() {
  const logger = WinstonModule.createLogger(winstonConfig);

  const httpsOptions: HttpsOptions = {
    key: fs.readFileSync(path.join(process.cwd(), 'configs', 'ssl', 'key.pem')),
    cert: fs.readFileSync(path.join(process.cwd(), 'configs', 'ssl', 'cert.pem')),

  }

  const app = await NestFactory.create(AppModule, {
    logger,
    httpsOptions,
    cors: {
      origin: '*',
      allowedHeaders: "*"
    }
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;

  await app.listen(port);

  logger.log(
    `🚀 Application is running on: https://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
