import { HStack, IconButton } from '@chakra-ui/react';
import { MdClear } from 'react-icons/md';
import { useControlField } from 'remix-validated-form';
import FormControl from './FormControl';
import TextInput from './TextInput';

const ReadsInput = () => {
  const [reads, setReads] = useControlField<string[]>('reads');

  return (
    <>
      {reads?.map((_, index) => (
        <FormControl
          key={index}
          name={`reads[${index}]`}
          label={index === 0 ? 'よみかた' : undefined}
          isRequired={index === 0}
        >
          <HStack>
            <TextInput name={`reads[${index}]`} />
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
    </>
  );
};

export default ReadsInput;
