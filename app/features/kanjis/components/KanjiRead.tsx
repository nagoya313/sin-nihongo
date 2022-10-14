import partition from 'lodash/partition';
import { HIRAGANA_MATCHER } from '~/utils/schemas/regex';
import KanjiReadStack from './KanjiReadStack';

const kanjiReadIsHiragana = (read: string) => read[0]?.match(HIRAGANA_MATCHER);

type KanjiReadProps = {
  reads: ReadonlyArray<string>;
};

const KanjiRead = ({ reads }: KanjiReadProps) => {
  const [kunYomi, onYomi] = partition(reads, kanjiReadIsHiragana);

  return (
    <>
      <KanjiReadStack label="音読み：" reads={onYomi} />
      <KanjiReadStack label="訓読み：" reads={kunYomi} />
    </>
  );
};

export default KanjiRead;
