import { useFormContext } from 'remix-validated-form';
import RadicalSelectInput from './RadicalSelectInput';

const SearchRadicalSelectInput = () => {
  const { submit } = useFormContext();

  return <RadicalSelectInput onChange={submit} />;
};

export default SearchRadicalSelectInput;
