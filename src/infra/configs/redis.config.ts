import { CacheModuleOptions } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { IConfig } from './config';

export class RedisConfig implements IConfig<CacheModuleOptions> {
  public readonly name: string = 'redis';

  public get(): CacheModuleOptions {
    const redisConnectionString = process.env.REDIS_CONNECTION_STRING;
    const [host, port] = redisConnectionString.split(':');
    return {
      store: redisStore,
      host: host,
      port: Number(port),
    };
  }
}
