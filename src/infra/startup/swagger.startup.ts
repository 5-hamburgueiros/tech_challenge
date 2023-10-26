import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const { npm_package_version: VERSION = '0.1.0' } = process.env;
export class SwaggerStartup {
  static init(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Tech Challenge - Backend')
      .setExternalDoc('Exportar documentação', '/swagger-json')
      .setDescription('Sistema de gestão de pedidos')
      .addServer('http://localhost:3000', 'Local')
      .setVersion(VERSION)
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
  }
}
