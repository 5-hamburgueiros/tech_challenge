import { ExampleController } from '@/api/controllers/example.controller';
import { CreateExampleUseCase, FindByIdUseCase } from '@/application/use-cases';
import { typeOrmEntities } from '@/common/typeorm.models';
import { IExampleRepository } from '@/domain/repository';
import { ICreateExample, IFindById } from '@/domain/use-cases';
import { Config } from '@/infra/configs/config';
import { CorrelationService } from '@/infra/correlation/correlation-service';
import { HttpExceptionFilter } from '@/infra/exception-filters/http-exception-filter';
import { CorrelationIdMiddleware } from '@/infra/middlewares/correlation/correlation.middleware';
import { ExampleRepositoryTypeOrm } from '@/infra/repository/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { HealthModule } from '../health/health.module';

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
  ],
  controllers: [ExampleController],
  providers: [
    CorrelationService,
    CorrelationIdMiddleware,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: IExampleRepository,
      useClass: ExampleRepositoryTypeOrm,
    },
    {
      provide: ICreateExample,
      useClass: CreateExampleUseCase,
    },
    {
      provide: IFindById,
      useClass: FindByIdUseCase,
    },
  ],
  exports: [CorrelationService],
})
export class AppModule {}
