import DataItem from '~/components/DataItem';
import DataList from '~/components/Datalist';
import RadicalLink from '~/features/radicals/components/RadicalLink';
import { type QueryResultData } from '~/utils/types';
import { toKunyomi, toOnyomi } from '../decorators';
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
    <DataItem term="音読み" definition={toOnyomi(kanji.reads).join('　')} />
    <DataItem term="訓読み" definition={toKunyomi(kanji.reads).join('　')} />
    <DataItem term="部首" definition={<RadicalLink codePoint={kanji.radical_code_point} />} />
    <DataItem term="統合" definition={sames.join('　')} />
  </DataList>
);

export default KanjiDefine;
