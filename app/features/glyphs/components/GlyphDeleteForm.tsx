import { IconButton } from '@chakra-ui/react';
import { Form, useTransition } from '@remix-run/react';
import { MdOutlineDelete } from 'react-icons/md';

type GlyphDeleteFormProps = {
  name: string;
};

const GlyphDeleteForm = ({ name }: GlyphDeleteFormProps) => {
  const transition = useTransition();

  return (
    <Form method="delete">
      <input type="hidden" name="name" value={name} />
      <IconButton
        type="submit"
        aria-label="glyph-delete"
        icon={<MdOutlineDelete />}
        isDisabled={transition.state === 'submitting'}
        colorScheme="red"
      />
    </Form>
  );
};

export default GlyphDeleteForm;
