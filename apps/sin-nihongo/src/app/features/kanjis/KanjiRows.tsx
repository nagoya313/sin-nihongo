import Check from '@material-ui/icons/Check';
import { KanjiResponse } from '@sin-nihongo/api-interfaces';
import { NewTabLink } from '../../components/NewTabLink';
import { ClickableGlyphCanvas } from './ClickableGlyphCanvas';

export type Fields =
  | 'ucs'
  | 'character'
  | 'kage'
  | 'radical'
  | 'numberOfStrokes'
  | 'regular'
  | 'forName'
  | 'kunyomi'
  | 'onyomi'
  | 'jisLevel'
  | 'action';

export const columns: { field: Fields; headerName: string }[] = [
  { field: 'ucs', headerName: 'ID' },
  { field: 'character', headerName: '漢字' },
  { field: 'kage', headerName: '新日本語字形' },
  { field: 'radical', headerName: '部首' },
  { field: 'numberOfStrokes', headerName: '画数' },
  { field: 'regular', headerName: '常用漢字' },
  { field: 'forName', headerName: '人名用漢字' },
  { field: 'kunyomi', headerName: '訓読み' },
  { field: 'onyomi', headerName: '音読み' },
  { field: 'jisLevel', headerName: 'JIS水準' },
  { field: 'action', headerName: '' },
];
export const KanjiRows = (kanjis?: KanjiResponse[]) => {
  return kanjis?.map((kanji): { [key in Fields | 'key']: unknown } => ({
    key: `kanji_${kanji.id}`,
    ucs: `u${kanji.id.toString(16)}`,
    character: <NewTabLink url={`https://glyphwiki.org/wiki/${kanji.ucs}`} text={String.fromCodePoint(kanji.id)} />,
    kage: <ClickableGlyphCanvas />,
    radical: String.fromCodePoint(kanji.radicalId + 0x2eff),
    numberOfStrokes: kanji.numberOfStrokes,
    regular: kanji.regular && <Check />,
    forName: kanji.forName && <Check />,
    kunyomi: kanji.kunyomi.join('、'),
    onyomi: kanji.onyomi.join('、'),
    jisLevel: kanji.jisLevel,
    action: null,
  }));
};
