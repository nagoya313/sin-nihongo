import axios from 'axios';
import * as admZip from 'adm-zip';
import * as csvWriter from 'csv-writer';
import * as fs from 'fs';
import * as readline from 'readline';
const combinedStream = require('combined-stream'); // eslint-disable-line
import * as stream from 'stream';
import * as util from 'util';
import * as MojiJS from 'mojijs';

const unihanLatestZipUrl = 'https://www.unicode.org/Public/UCD/latest/ucd/Unihan.zip';

interface Kanji {
  ucs: number;
  radicalId: number;
  numberOfStrokesInRadical: number;
  numberOfStrokes: number;
  onyomi: string[];
  kunyomi: string[];
  jisLevel: number;
  regular: boolean;
  forName: boolean;
}

const ucsToId = (ucs: string) => parseInt(ucs.replace('U+', ''), 16);
const makeKanji = (ucs: string) =>
  ({
    ucs: ucsToId(ucs),
    onyomi: [],
    kunyomi: [],
  } as Kanji);

const isRecruitment = (ucs: string) => {
  const data = MojiJS.getMojiData(ucsToId(ucs));
  return data.type.kanji_suijun == 1 || data.type.kanji_suijun == 2;
};

const downloadUnihanZip = async () => {
  console.log('Unihan Zipダウンロード開始');
  const zipResponse = await axios.get(unihanLatestZipUrl, {
    responseType: 'arraybuffer',
    headers: { Accept: 'application/zip' },
  });
  await fs.promises.writeFile('tmp/Unihan.zip', zipResponse.data);
  console.log('Unihan Zipダウンロード終了');

  const zip = new admZip('tmp/Unihan.zip');
  await zip.extractAllToAsync('tmp/Unihan', true);
  console.log('Unihan Zip解凍完了');
};

const setRadicalAndStrokes = async (kanjis: Map<string, Kanji>) => {
  const combined = combinedStream.create();
  combined.append(fs.createReadStream('tmp/Unihan/Unihan_IRGSources.txt'));
  combined.append(fs.createReadStream('tmp/Unihan/Unihan_DictionaryLikeData.txt'));
  const rl = readline.createInterface({ input: combined });

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const findOrSetKanji = (ucs: string) => kanjis.get(ucs) || kanjis.set(ucs, makeKanji(ucs)).get(ucs)!;

  const setKanjiRadical = (columns: string[]) => {
    const kanji = findOrSetKanji(columns[0]);
    const radical_info = columns[2].split('.');
    kanji.radicalId = parseInt(radical_info[0]);
    kanji.numberOfStrokesInRadical = parseInt(radical_info[1]);
  };

  const setKanjiStorkes = (columns: string[]) => {
    const kanji = findOrSetKanji(columns[0]);
    kanji.numberOfStrokes = parseInt(columns[2]);
  };

  rl.on('line', (line: string) => {
    if (line[0] === '#') {
      return;
    }
    const columns = line.split('	');
    switch (columns[1]) {
      case 'kRSUnicode':
        isRecruitment(columns[0]) && setKanjiRadical(columns);
        break;
      case 'kTotalStrokes':
        isRecruitment(columns[0]) && setKanjiStorkes(columns);
        break;
    }
  });

  const finished = util.promisify(stream.finished);
  await finished(combined);
};

const setRead = async (kanjis: Map<string, Kanji>) => {
  const rs = fs.createReadStream('tmp/Unihan/Unihan_Readings.txt');
  const rl = readline.createInterface({ input: rs });

  rl.on('line', (line: string) => {
    if (line[0] === '#') {
      return;
    }
    const columns = line.replace(/	/g, ' ').split(' '); // eslint-disable-line no-control-regex
    switch (columns[1]) {
      case 'kJapaneseKun':
        isRecruitment(columns[0]) &&
          columns.slice(2).forEach((read) => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            kanjis.get(columns[0])!.kunyomi.push(read);
          });
        break;
      case 'kJapaneseOn': {
        isRecruitment(columns[0]) &&
          columns.slice(2).forEach((read) => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            kanjis.get(columns[0])!.onyomi.push(read);
          });
        break;
      }
    }
  });

  const finished = util.promisify(stream.finished);

  await finished(rs);
};

export const makeKanjiCsvFromUnihan = async () => {
  downloadUnihanZip();

  const kanjis = new Map<string, Kanji>();

  await setRadicalAndStrokes(kanjis);
  await setRead(kanjis);

  kanjis.forEach((kanji) => {
    const data = MojiJS.getMojiData(kanji.ucs);
    kanji.jisLevel = data.type.kanji_suijun;
    kanji.regular = data.type.is_joyo_kanji;
    kanji.forName = data.type.is_jinmeiyo_kanji;
  });

  const writer = csvWriter.createObjectCsvWriter({
    path: 'db/seeds/kanjis.csv',
    header: [
      { id: 'ucs', title: 'ucs' },
      { id: 'radicalId', title: 'radicalId' },
      { id: 'numberOfStrokesInRadical', title: 'numberOfStrokesInRadical' },
      { id: 'numberOfStrokes', title: 'numberOfStrokes' },
      { id: 'onyomi', title: 'onyomi' },
      { id: 'kunyomi', title: 'kunyomi' },
      { id: 'jisLevel', title: 'jisLevel' },
      { id: 'regular', title: 'regular' },
      { id: 'forName', title: 'forName' },
    ],
  });

  await writer.writeRecords(kanjis.values());
};
