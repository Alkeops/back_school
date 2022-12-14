import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Students')
    .setDescription('API to manage students and friendships')
    .setVersion('1.0')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document);

  app.enableCors();
  
  await app.listen(3005);
}
bootstrap();
