import { HStack, IconButton } from '@chakra-ui/react';
import { MdAdd, MdClear } from 'react-icons/md';
import { useControlField } from 'remix-validated-form';
import FormControl from './FormControl';
import TextInput from './TextInput';

type ReadsInputProps = {
  name: string;
  label: string;
};

const ReadsInput = ({ name, label }: ReadsInputProps) => {
  const [reads, setReads] = useControlField<string[]>(name);
  const addReads = () => {
    const next = [...reads];
    next.push('');
    setReads(next);
  };

  return (
    <>
      {reads?.map((_, index) => (
        <FormControl
          key={index}
          name={`${name}[${index}]`}
          label={index === 0 ? label : undefined}
          isRequired={index === 0}
        >
          <HStack>
            <TextInput name={`${name}[${index}]`} />
            <IconButton
              aria-label="read-clear"
              icon={<MdClear />}
              onClick={() => {
                const next = [...reads];
                next.splice(index, 1);
                setReads(next);
              }}
              isDisabled={reads.length === 1}
            />
          </HStack>
        </FormControl>
      ))}
      <IconButton aria-label="read-add" icon={<MdAdd />} onClick={addReads} />
    </>
  );
};

export default ReadsInput;
