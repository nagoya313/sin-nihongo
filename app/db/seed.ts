import { connectDatabase } from './connection.server';
import { kanjiSeed } from './seeds/kanji';
import { radicalSeed } from './seeds/radical';

(async () => {
  const db = connectDatabase();

  try {
    await radicalSeed(db);
    await kanjiSeed(db);
  } catch (error) {
    console.error(error);
  }

  await db.destroy();
})();
