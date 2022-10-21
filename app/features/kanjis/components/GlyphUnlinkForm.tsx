import { IconButton } from '@chakra-ui/react';
import { useTransition } from '@remix-run/react';
import { MdLinkOff } from 'react-icons/md';
import { ValidatedForm } from 'remix-validated-form';
import HiddenInput from '~/components/HiddenInput';
import { kanjiGlyphUnlinkParams } from '~/features/kanjis/validators';
import { type QueryResultData } from '~/utils/types';
import { type getDrawableKanjis } from '../repositories.server';

type GlyphUnlinkFormProps = {
  kanji: QueryResultData<typeof getDrawableKanjis>[number];
};

const GlyphUnlinkForm = ({ kanji }: GlyphUnlinkFormProps) => {
  const transition = useTransition();

  return (
    <ValidatedForm method="delete" validator={kanjiGlyphUnlinkParams} defaultValues={{ code_point: kanji.code_point }}>
      <HiddenInput name="code_point" />
      <IconButton
        type="submit"
        aria-label="unlink-glyph"
        icon={<MdLinkOff />}
        colorScheme="red"
        isDisabled={kanji.glyph_name == null || transition.state === 'submitting'}
      />
    </ValidatedForm>
  );
};

export default GlyphUnlinkForm;
