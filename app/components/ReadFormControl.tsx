import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import { useField } from 'remix-validated-form';

type ReadFormControlProps = React.PropsWithChildren<{
  name: string;
  isRequired: boolean;
}>;

const ReadFormControl = ({ name, isRequired, children }: ReadFormControlProps) => {
  const { error } = useField(name);

  return (
    <FormControl isRequired={isRequired} isInvalid={!!error}>
      {children}
      {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default ReadFormControl;
