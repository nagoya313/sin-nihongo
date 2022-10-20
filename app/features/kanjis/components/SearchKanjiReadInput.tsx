import FormControl from '~/components/FormControl';
import SearchTextInput from '~/components/SearchTextInput';

const SearchKanjiReadInput = () => (
  <FormControl
    name="read"
    label="よみかた"
    help="漢字のよみかたわ新日本語表音式によるひらがな（訓読み）、カタカナ（音読み）での前方一致で絞り込みができます。"
  >
    <SearchTextInput name="read" placeholder="いち、しょー、つずみ" />
  </FormControl>
);

export default SearchKanjiReadInput;
