import { makeKanjiCsvFromUnihan } from './app/kanji';

(async () => {
  try {
    await makeKanjiCsvFromUnihan();
  } catch (error) {
    console.error(error);
  }
})();
