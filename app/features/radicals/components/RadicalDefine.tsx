import DataItem from '~/components/DataItem';
import DataList from '~/components/Datalist';
import { QueryResultData } from '~/utils/types';
import { type getRadicalByCodePoint } from '../repositories.server';

type RadicalDefineProps = {
  radical: QueryResultData<typeof getRadicalByCodePoint>;
};

const RadicalDefine = ({ radical }: RadicalDefineProps) => (
  <DataList>
    <DataItem term="画数" definition={radical.stroke_count} />
    <DataItem term="よみかた" definition={radical.reads.join('　')} />
    <DataItem term="この部首お持つ漢字の数" definition={radical.kanji_count} />
  </DataList>
);

export default RadicalDefine;
