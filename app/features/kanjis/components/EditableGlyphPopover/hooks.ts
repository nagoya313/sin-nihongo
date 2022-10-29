import { useDisclosure } from '@chakra-ui/react';
import { useActionData } from '@remix-run/react';
import { type SingleValue } from 'chakra-react-select';
import { useEffect, useState } from 'react';
import { useControlField } from 'remix-validated-form';
import { type DrawableGlyph } from '~/features/kage/models/kageData';
import { type Glyph } from '~/features/kage/types';
import { type action } from '~/routes/kanjis/index';
import { type QueryResultData } from '~/utils/types';
import { type getDrawableKanjis } from '../../repositories.server';

export const useEditableGlyphPopover = (kanji: QueryResultData<typeof getDrawableKanjis>[number]) => {
  const formId = `kanji-glyph-editable-form-${kanji.code_point}`;
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [preview, setPreview] = useState<DrawableGlyph | null>();
  useControlField('glyph_name', formId); // これを置いとくとpopoverを閉ぢてもselectが維持される
  const [data, setData] = useControlField<string>('data', formId);
  const [isReadonlyData, setIsReadonlyData] = useState(false);
  const openHandle = () => {
    setPreview(kanji.glyph);
    onOpen();
  };
  const updated = useActionData<typeof action>();

  useEffect(() => {
    if (updated != null && 'kanji' in updated) {
      onClose();
      setData(updated.kanji.glyph?.data ?? '');
    }
  }, [updated, onClose, setData]);

  return {
    preview,
    setPreview,
    isOpen,
    onOpen: openHandle,
    onClose,
    data,
    selectGlyph: (option: SingleValue<Glyph>) => {
      setData(option?.data || '');
      setIsReadonlyData(true);
    },
    isReadonlyData,
    mode: isReadonlyData ? 'link' : 'create',
    toCreateMode: () => setIsReadonlyData(false),
    formId,
  } as const;
};
