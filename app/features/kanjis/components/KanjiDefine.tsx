import DataItem from '~/components/DataItem';
import DataList from '~/components/Datalist';
import RadicalLink from '~/features/radicals/components/RadicalLink';
import { HIRAGANA_MATCHER } from '~/utils/schemas/regex';
import { type getKanjiByCodePoint } from '../models/kanji.server';

type KanjiDefineProps = {
  kanji: NonNullable<Awaited<ReturnType<typeof getKanjiByCodePoint>>>;
  sames: ReadonlyArray<string>;
};

const KanjiDefine = ({ kanji, sames }: KanjiDefineProps) => (
  <DataList>
    <DataItem term="画数" definition={kanji.stroke_count} />
    <DataItem term="音読み" definition={kanji.reads.filter((read) => read.match(HIRAGANA_MATCHER)).join('　')} />
    <DataItem term="訓読み" definition={kanji.reads.filter((read) => !read.match(HIRAGANA_MATCHER)).join('　')} />
    <DataItem term="部首" definition={<RadicalLink codePoint={kanji.radical_code_point} />} />
    <DataItem term="統合" definition={sames.join('　')} />
  </DataList>
);

export default KanjiDefine;
