import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerService } from './common/modules/swagger/swagger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerService.setup(app);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  await app.listen(3000);
}

bootstrap();
