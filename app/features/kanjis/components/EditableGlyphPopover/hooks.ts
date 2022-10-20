import { useDisclosure } from '@chakra-ui/react';
import { useActionData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { type action } from '~/routes/kanjis/index';
import { type QueryResultData } from '~/utils/types';
import { type getDrawableKanjis } from '../../repositories.server';

export const useEditableGlyphPopover = (kanji: QueryResultData<typeof getDrawableKanjis>[number]) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [preview, setPreview] = useState<typeof kanji['glyph']>();
  const openHandle = () => {
    setPreview(kanji.glyph);
    onOpen();
  };
  const updated = useActionData<typeof action>();

  useEffect(() => {
    if (updated != null && 'kanji' in updated) {
      onClose();
    }
  }, [updated, onClose]);

  return { preview, setPreview, isOpen, onOpen: openHandle, onClose };
};
