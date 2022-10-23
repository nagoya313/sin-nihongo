import { useDisclosure } from '@chakra-ui/react';
import { useActionData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { type DrawableGlyph } from '~/features/kage/models/kageData';
import { type action } from '~/routes/kanjis/index';
import { type QueryResultData } from '~/utils/types';
import { type getDrawableKanjis } from '../../repositories.server';

export const useEditableGlyphPopover = (kanji: QueryResultData<typeof getDrawableKanjis>[number]) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [preview, setPreview] = useState<DrawableGlyph | null>();
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

  return {
    preview,
    setPreview,
    isOpen,
    onOpen: openHandle,
    onClose,
    formId: `kanji-glyph-editable-form-${kanji.code_point}`,
  };
};
