import { FormControl, FormControlProps, FormErrorMessage, FormLabel, Icon, Tooltip } from '@chakra-ui/react';
import { MdHelpOutline } from 'react-icons/md';
import { useField } from 'remix-validated-form';

type SearchFormControlProps = React.PropsWithChildren<{
  isRequired?: boolean;
  name: string;
  label?: string;
  help?: string;
  as?: FormControlProps['as'];
}>;

const SearchFormControl = ({ isRequired, name, label, help, as, children }: SearchFormControlProps) => {
  const { error } = useField(name);

  return (
    <FormControl as={as} isRequired={isRequired} isInvalid={!!error}>
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
      {children}
      {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default SearchFormControl;
