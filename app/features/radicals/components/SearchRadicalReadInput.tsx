import FormControl from '~/components/FormControl';
import SearchTextInput from '~/components/SearchTextInput';

const SearchRadicalReadInput = () => (
  <FormControl
    name="read"
    label="よみかた"
    help="部首のよみかたわ新日本語表音式によるひらがなでの前方一致で絞り込みができます。"
  >
    <SearchTextInput name="read" placeholder="いち、しょー、つずみ" />
  </FormControl>
);

export default SearchRadicalReadInput;
