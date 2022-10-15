import { Button } from '@chakra-ui/react';
import { useFormContext } from 'remix-validated-form';

type SubmitButtonProps = React.PropsWithChildren;

const SubmitButton = ({ children }: SubmitButtonProps) => {
  const { isValid, isSubmitting } = useFormContext();

  return (
    <Button type="submit" isDisabled={!isValid || isSubmitting} colorScheme="purple">
      {children}
    </Button>
  );
};

export default SubmitButton;
