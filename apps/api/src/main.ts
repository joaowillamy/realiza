import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { winstonConfig } from '@realiza/api/infrastructure';
import { backendEnvs } from '@realiza/shared/utils';
import * as fs from 'fs';
import { WinstonModule } from 'nest-winston';
import * as path from 'path';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const logger = WinstonModule.createLogger(winstonConfig);

  const httpsOptions: HttpsOptions = {
    key: fs.readFileSync(path.join(process.cwd(), 'configs', 'ssl', 'key.pem')),
    cert: fs.readFileSync(
      path.join(process.cwd(), 'configs', 'ssl', 'cert.pem')
    ),
  };

  const documentConfig = new DocumentBuilder()
    .setTitle('Realiza')
    .setDescription('The realiza API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth'
    )
    .build();

  const app = await NestFactory.create(AppModule, {
    logger,
    httpsOptions,
    cors: {
      origin: '*',
      allowedHeaders: '*',
    },
  });

  const port = process.env.PORT || 3333;
  const globalPrefix = 'api';
  const docPrefix = 'doc';

  app.setGlobalPrefix(globalPrefix);
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup(docPrefix, app, document);
  await app.listen(port);

  logger.log(`🎲 SGBD DataBase is running on: http://localhost:8080/`);
  logger.log(
    `📚 Documentation is running on: https://localhost:${port}/${docPrefix}`
  );
  logger.log(
    `🚀 Application is running on: https://localhost:${port}/${globalPrefix}`
  );
  logger.log(`isDevelopment: ${backendEnvs.isDevelopment}`);
}

bootstrap();
