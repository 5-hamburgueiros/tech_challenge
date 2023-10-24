import { typeOrmEntities } from '@/common/typeorm.models';
import { KeepProvidedNamingStrategy } from '@/common/utils/keep-provided-naming-strategy-typeorm.utils';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

const options = {
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: +configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASS'),
  database: configService.get('DATABASE_NAME'),
  entities: typeOrmEntities,
  migrations: [process.cwd() + '/sql/migrations/**/*.ts'],
  namingStrategy: new KeepProvidedNamingStrategy(),
};
console.log(options);
// export default new DataSource(options);
