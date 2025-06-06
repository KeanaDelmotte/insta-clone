import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import express from 'express';

import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/public', express.static(join(__dirname, '..', 'files')));
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
