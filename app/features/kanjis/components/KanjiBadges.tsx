import { HStack } from '@chakra-ui/react';
import { type QueryResultData } from '~/utils/types';
import { type getKanjiByCodePoint } from '../repositories.server';
import ForNameBadge from './ForNameBadge';
import JisLevelBadge from './JisLevelBadge';
import RegularBadge from './RegularBadge';

type KanjiBadgesProps = {
  kanji: Pick<QueryResultData<typeof getKanjiByCodePoint>, 'regular' | 'for_name' | 'jis_level'>;
};

const KanjiBadges = ({ kanji }: KanjiBadgesProps) => (
  <HStack>
    <RegularBadge regular={kanji.regular} />
    {kanji.for_name && <ForNameBadge />}
    <JisLevelBadge jisLevel={kanji.jis_level} />
  </HStack>
);

export default KanjiBadges;
