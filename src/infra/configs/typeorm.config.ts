import { typeOrmEntities } from '@/common/typeorm.models';
import { KeepProvidedNamingStrategy } from '@/common/utils/keep-provided-naming-strategy-typeorm.utils';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { IConfig } from './config';
import { environment } from './environment';

@Injectable()
export class TypeORMConfig implements IConfig<TypeOrmModuleOptions> {
  public readonly name: string = 'typeorm';
  get(): TypeOrmModuleOptions {
    const config: TypeOrmModuleOptions = {
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME,
      ssl: environment.isDevelopment()
        ? false
        : {
            rejectUnauthorized: false,
          },
      synchronize: true,
      entities: typeOrmEntities,
      maxQueryExecutionTime: 60000,
      extra: {
        trustedConnection: environment.isDevelopment() ? false : true,
        trustServerCertificate: true,
      },
      namingStrategy: new KeepProvidedNamingStrategy(),
    };
    return config;
  }
}
