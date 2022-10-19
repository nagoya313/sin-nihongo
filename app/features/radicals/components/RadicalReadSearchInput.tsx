import FormControl from '~/components/FormControl';
import TextInput from '~/components/TextInput';

const RadicalReadSearchInput = () => (
  <FormControl
    name="read"
    label="よみかた"
    help="部首のよみかたわ新日本語表音式によるひらがなでの前方一致で絞り込みができます。"
  >
    <TextInput name="read" placeholder="いち、しょー、つずみ" />
  </FormControl>
);

export default RadicalReadSearchInput;
