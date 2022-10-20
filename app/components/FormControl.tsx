import {
  FormControl as CUIFormControl,
  type FormControlProps as CUIFormControlProps,
  FormErrorMessage,
  FormLabel,
  Icon,
  Tooltip,
} from '@chakra-ui/react';
import { MdHelpOutline } from 'react-icons/md';
import { useField } from 'remix-validated-form';

type FormControlProps = React.PropsWithChildren<{
  isRequired?: boolean;
  name: string;
  label?: string;
  help?: string;
  as?: CUIFormControlProps['as'];
}>;

const FormControl = ({ isRequired, name, label, help, as, children }: FormControlProps) => {
  const { error } = useField(name);

  return (
    <CUIFormControl as={as} isRequired={isRequired} isInvalid={!!error}>
      {(label != null || help != null) && (
        <FormLabel htmlFor={name}>
          {label}
          {help && (
            <Tooltip label={help}>
              <span>
                <Icon as={MdHelpOutline} />
              </span>
            </Tooltip>
          )}
        </FormLabel>
      )}
      {children}
      {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
    </CUIFormControl>
  );
};

export default FormControl;
