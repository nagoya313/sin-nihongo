import { IconButton } from '@chakra-ui/react';
import { Form, useTransition } from '@remix-run/react';
import { MdOutlineDelete } from 'react-icons/md';
import { type GlyphItemData } from '../types';

type GlyphDeleteFormProps = {
  glyph: GlyphItemData;
};

const GlyphDeleteForm = ({ glyph }: GlyphDeleteFormProps) => {
  const transition = useTransition();

  return (
    <Form method="delete">
      <input type="hidden" name="name" value={glyph.name} />
      <IconButton
        type="submit"
        aria-label="glyph-delete"
        icon={<MdOutlineDelete />}
        isDisabled={!glyph.deletable || transition.state === 'submitting'}
        colorScheme="red"
      />
    </Form>
  );
};

export default GlyphDeleteForm;
