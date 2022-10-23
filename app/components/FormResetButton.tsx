import { Button } from '@chakra-ui/react';
import { useFormContext } from 'remix-validated-form';

const FormResetButton = () => {
  const { reset, isSubmitting } = useFormContext();

  return (
    <Button type="reset" disabled={isSubmitting} onClick={() => reset}>
      元にもどす
    </Button>
  );
};

export default FormResetButton;
