import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SeedService } from './database/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('HeroForce API')
    .setDescription('API do sistema de gestão e vendas de projetos heroicos')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Autenticação de usuários')
    .addTag('users', 'Gestão de heróis/usuários')
    .addTag('projects', 'Gestão de projetos heroicos')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const seedService = app.get(SeedService);
  await seedService.seedDatabase();

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 HeroForce API rodando na porta ${port}`);
  console.log(`📚 Documentação disponível em http://localhost:${port}/api`);
}

bootstrap();
