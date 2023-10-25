import { typeOrmEntities } from '@/common/typeorm.models';
import { IExampleRepository } from '@/domain/repository';
import { Config } from '@/infra/configs/config';
import { CorrelationService } from '@/infra/correlation/correlation-service';
import { HttpExceptionFilter } from '@/infra/exception-filters/http-exception-filter';
import { ValidatorExceptionFilter } from '@/infra/exception-filters/validator-exception-filter';
import { CorrelationIdMiddleware } from '@/infra/middlewares/correlation/correlation.middleware';
import { ExampleRepositoryTypeOrm } from '@/infra/repository/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from '../cliente/cliente.module';
import { DatabaseModule } from '../database/database.module';
import { HealthModule } from '../health/health.module';
import { IngredienteModule } from '../ingrediente/ingrediente.module';
import { ItemModule } from '../item/item.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: new Config().get(),
    }),
    TypeOrmModule.forFeature(typeOrmEntities),
    HealthModule,

    // BullModule.forRootAsync({
    //   useClass: BullConfig,
    // }),
    {
      module: DatabaseModule,
      global: true,
    },
    ClienteModule,
    IngredienteModule,
    ItemModule,
  ],
  providers: [
    CorrelationService,
    CorrelationIdMiddleware,
    {
      provide: APP_FILTER,
      useClass: ValidatorExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: IExampleRepository,
      useClass: ExampleRepositoryTypeOrm,
    },
  ],
  exports: [CorrelationService],
})
export class AppModule {}
