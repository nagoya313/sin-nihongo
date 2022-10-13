import { IconButton } from '@chakra-ui/react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { useControlField, useField, useIsSubmitting, useIsValid } from 'remix-validated-form';

type OrderButtonProps = {
  name: string;
  formId?: string;
};

const OrderButton = ({ name, formId }: OrderButtonProps) => {
  const { getInputProps } = useField(name, { formId });
  const [direction, setDirection] = useControlField(name, formId);
  const isValid = useIsValid(formId);
  const isSubmitting = useIsSubmitting(formId);
  const { onChange } = getInputProps({ onChange: () => setDirection(direction === 'asc' ? 'desc' : 'asc') });

  return (
    <IconButton
      aria-label="order"
      name={name}
      onClick={onChange}
      icon={direction === 'asc' ? <MdExpandLess /> : <MdExpandMore />}
      isDisabled={!isValid || isSubmitting}
    />
  );
};

export default OrderButton;
