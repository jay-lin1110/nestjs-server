import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const ADMIN_PORT = process.env.ADMIN_PORT || 3001;
  await app.listen(ADMIN_PORT);
  console.log(`admin is running on http://localhost:${ADMIN_PORT}`);
}
bootstrap();
