import DataItem from '~/components/DataItem';
import DataList from '~/components/Datalist';
import RadicalLink from '~/features/radicals/components/RadicalLink';
import { HIRAGANA_MATCHER } from '~/utils/schemas/regex';
import { type QueryResultData } from '~/utils/types';
import { type getKanjiByCodePoint } from '../repositories.server';
import KanjiBadges from './KanjiBadges';

type KanjiDefineProps = {
  kanji: QueryResultData<typeof getKanjiByCodePoint>;
  sames: ReadonlyArray<string>;
};

const KanjiDefine = ({ kanji, sames }: KanjiDefineProps) => (
  <DataList>
    <DataItem term="" definition={<KanjiBadges kanji={kanji} />} />
    <DataItem term="画数" definition={kanji.stroke_count} />
    <DataItem term="音読み" definition={kanji.reads.filter((read) => !read.match(HIRAGANA_MATCHER)).join('　')} />
    <DataItem term="訓読み" definition={kanji.reads.filter((read) => read.match(HIRAGANA_MATCHER)).join('　')} />
    <DataItem term="部首" definition={<RadicalLink codePoint={kanji.radical_code_point} />} />
    <DataItem term="統合" definition={sames.join('　')} />
  </DataList>
);

export default KanjiDefine;
