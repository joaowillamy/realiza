import { NestFactory } from '@nestjs/core';
import { winstonConfig } from '@realiza/api/infrastructure';
import { WinstonModule } from 'nest-winston';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const logger = WinstonModule.createLogger(winstonConfig);

  const app = await NestFactory.create(AppModule, { logger });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  await app.listen(port);
  logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
