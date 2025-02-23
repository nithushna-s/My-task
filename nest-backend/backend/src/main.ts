import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000',  // Allow requests from your frontend
    methods: 'GET, POST, PUT, DELETE',  // Allow necessary HTTP methods
    allowedHeaders: 'Content-Type, Authorization',  // Allow necessary headers
  });

  await app.listen(3001); // Or whatever port your backend is running on

  console.log('Backend is running on http://localhost:3001');
}
bootstrap();
