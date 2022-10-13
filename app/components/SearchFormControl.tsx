import { FormControl, FormErrorMessage, FormLabel, Icon, Tooltip } from '@chakra-ui/react';
import { MdHelpOutline } from 'react-icons/md';
import { useField } from 'remix-validated-form';

type SearchFormControlProps = React.PropsWithChildren<{
  isRequired?: boolean;
  name: string;
  label?: string;
  help?: string;
}>;

const SearchFormControl = ({ isRequired, name, label, help, children }: SearchFormControlProps) => {
  const { error } = useField(name);

  return (
    <FormControl isRequired={isRequired} isInvalid={!!error}>
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
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default SearchFormControl;
