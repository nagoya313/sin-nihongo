import { IconButton, PopoverTrigger, VStack } from '@chakra-ui/react';
import { MdOutlineEdit } from 'react-icons/md';
import { useOptionalUser } from '~/hooks/useUser';
import { type QueryResultData } from '~/utils/types';
import { type getDrawableKanjis } from '../../repositories.server';
import KanjiLink from '../KanjiLink';

type EditableGlyphPopoverTriggerProps = {
  kanji: QueryResultData<typeof getDrawableKanjis>[number];
};

const EditableGlyphPopoverTrigger = ({ kanji }: EditableGlyphPopoverTriggerProps) => {
  const user = useOptionalUser();

  return (
    <VStack p={2}>
      <KanjiLink codePoint={kanji.code_point} />
      {user != null && (
        <PopoverTrigger>
          <IconButton aria-label="edit-kanji-glyph" icon={<MdOutlineEdit />} />
        </PopoverTrigger>
      )}
    </VStack>
  );
};

export default EditableGlyphPopoverTrigger;
