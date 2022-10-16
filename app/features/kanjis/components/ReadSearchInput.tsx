import FormControl from '~/components/FormControl';
import TextInput from '~/components/TextInput';

const ReadSearchInput = () => (
  <FormControl
    name="read"
    label="よみかた"
    help="漢字のよみかたは新日本語表音式によるひらがな（訓読み）、カタカナ（音読み）での前方一致で絞り込みができます。"
  >
    <TextInput name="read" placeholder="いち、しょー、つずみ" />
  </FormControl>
);

export default ReadSearchInput;
