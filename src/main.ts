import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get(ConfigService);
  const port = configService.get<number>("PORT", 3000)
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
