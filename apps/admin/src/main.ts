import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('admin')
    .setDescription('the admin system api')
    .addBearerAuth()
    .setVersion('1.0')
    .addTag('admin')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-admin-docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  const ADMIN_PORT = process.env.ADMIN_PORT || 3001;
  await app.listen(ADMIN_PORT);
  console.log(`admin is running on http://localhost:${ADMIN_PORT}/api-admin-docs`);
}
bootstrap();
