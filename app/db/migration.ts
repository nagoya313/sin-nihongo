import { promises as fs } from 'fs';
import { FileMigrationProvider, Migrator } from 'kysely';
import * as path from 'path';
import { connectDatabase } from './connection.server';

(async () => {
  console.log(process.argv);
  const db = connectDatabase();
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({ fs, path, migrationFolder: 'app/db/migrations' }),
  });

  const { error, results } = process.argv.includes('rollback')
    ? await migrator.migrateDown()
    : await migrator.migrateToLatest();

  results?.forEach(({ status, migrationName }) => {
    switch (status) {
      case 'Success':
        console.log(`migration "${migrationName}" was executed successfully`);
        break;
      case 'Error':
        console.error(`failed to execute migration "${migrationName}"`);
        break;
    }
  });

  if (error) {
    console.error('failed to migrate');
    console.error(error);
    process.exit(1);
  }
})();
