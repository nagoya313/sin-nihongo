import { useSearchDebouncedInput } from '~/hooks/useSearch';
import TextInput from './TextInput';

type SearchTextInputProps = Omit<React.ComponentProps<typeof TextInput>, 'onChange'>;

const SearchTextInput = (props: SearchTextInputProps) => <TextInput {...props} onChange={useSearchDebouncedInput()} />;

export default SearchTextInput;
