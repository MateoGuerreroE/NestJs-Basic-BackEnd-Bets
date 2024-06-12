import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const document = yaml.load(
    fs.readFileSync('./src/openapi.yaml', 'utf-8'),
  ) as any;
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
