import { ValidatorPipe } from '@bankly/exceptions-nestjs';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { CorrelationIdMiddleware } from './infra/middlewares/correlation/correlation.middleware';
import { SwaggerStartup } from './infra/startup';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.use(app.get(CorrelationIdMiddleware).use);
  app.useGlobalPipes(new ValidatorPipe());

  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('APP_PORT');

  SwaggerStartup.init(app);
  await app.listen(Number(port));
}
bootstrap();
