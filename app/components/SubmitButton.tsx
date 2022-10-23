import { Button, type ButtonProps } from '@chakra-ui/react';
import { useFormContext } from 'remix-validated-form';

type SubmitButtonProps = React.PropsWithChildren<{
  size?: ButtonProps['size'];
  isDisabled?: boolean;
}>;

const SubmitButton = ({ isDisabled, children, ...props }: SubmitButtonProps) => {
  const { isValid, isSubmitting, fieldErrors } = useFormContext();

  console.log(fieldErrors);

  return (
    <Button {...props} type="submit" isDisabled={!!isDisabled || !isValid || isSubmitting} colorScheme="purple">
      {children}
    </Button>
  );
};

export default SubmitButton;
