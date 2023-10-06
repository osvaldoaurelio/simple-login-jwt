import { INestApplication, Injectable } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

@Injectable()
export class SwaggerService {
  static setup(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Swagger')
      .setDescription('Swagger documentation')
      .addTag('Auth', 'Auth endpoints')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api-doc', app, document);
  }
}
