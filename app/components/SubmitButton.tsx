import { Button, ButtonProps } from '@chakra-ui/react';
import { useFormContext } from 'remix-validated-form';

type SubmitButtonProps = React.PropsWithChildren<{
  size?: ButtonProps['size'];
}>;

const SubmitButton = ({ children, ...props }: SubmitButtonProps) => {
  const { isValid, isSubmitting } = useFormContext();

  return (
    <Button {...props} type="submit" isDisabled={!isValid || isSubmitting} colorScheme="purple">
      {children}
    </Button>
  );
};

export default SubmitButton;
