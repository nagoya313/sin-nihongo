import { IconButton } from '@chakra-ui/react';
import { useEffect } from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { useControlField, useFormContext } from 'remix-validated-form';

type OrderButtonProps = {
  name: string;
};

const OrderButton = ({ name }: OrderButtonProps) => {
  const [direction, setDirection] = useControlField<string>(name);
  const { isValid, isSubmitting, submit } = useFormContext();

  useEffect(() => {
    if (direction != null) {
      submit();
    }
  }, [direction, submit]);

  return (
    <>
      <IconButton
        aria-label="order"
        onClick={() => setDirection(direction === 'desc' ? 'asc' : 'desc')}
        icon={direction === 'desc' ? <MdExpandMore /> : <MdExpandLess />}
        isDisabled={!isValid || isSubmitting}
      />
      <input type="hidden" name={name} value={direction ?? 'asc'} />
    </>
  );
};

export default OrderButton;
