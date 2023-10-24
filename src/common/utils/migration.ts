import 'dotenv/config';
import { readdirSync, readFileSync } from 'fs';
import { DataSource } from 'typeorm';

async function createDataSource() {
  return new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    extra: {
      trustedConnection: true,
      trustServerCertificate: true,
    },
  });
}

async function erase(dataSource: DataSource) {
  const erasePath = 'sql/clean.sql';
  const eraseFileContent = readFileSync(erasePath, 'utf8');
  await dataSource.query(eraseFileContent);
  console.log(`Database was clear`);
}

async function migrate(connection: DataSource) {
  const migrationsPath = 'sql/migrations';
  const migrations = readdirSync(migrationsPath);

  for await (const migration of migrations) {
    const migrationPath = `${migrationsPath}/${migration}`;
    const migrationFiles = readdirSync(migrationPath);

    for await (const migrationFile of migrationFiles) {
      const migrationFilePath = `${migrationPath}/${migrationFile}`;
      const migrationFileContent = readFileSync(migrationFilePath, 'utf8');
      await connection.query(migrationFileContent);
      console.log(`Migration ${migrationFilePath} applied`);
    }
  }
}

async function main() {
  const connection = await createDataSource();
  try {
    await connection.initialize();
    await erase(connection);
    await migrate(connection);

    await connection.destroy();
    console.log('Migration finished');
  } catch (error) {
    console.log(`Unable to migrate: ${error.message}`);
    connection.destroy();
  }
}
main();
