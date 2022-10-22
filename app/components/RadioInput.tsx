import { Radio, RadioGroup, type RadioGroupProps, Wrap, WrapItem } from '@chakra-ui/react';
import { useField } from 'remix-validated-form';
import FormControl from '~/components/FormControl';

type RadioInputProps = {
  name: string;
  label: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  value?: RadioGroupProps['value'];
  onChange?: RadioGroupProps['onChange'];
};

const RadioInput = ({ name, label, options, value, ...inputProps }: RadioInputProps) => {
  const { getInputProps, defaultValue } = useField(name);

  return (
    <FormControl as="fieldset" name={name} label={label}>
      <RadioGroup
        {...getInputProps<Omit<RadioGroupProps, 'children'>>({ ...inputProps })}
        value={value}
        defaultValue={defaultValue?.toString()}
      >
        <Wrap whiteSpace="nowrap">
          {options.map(({ value, label }) => (
            <WrapItem key={value}>
              <Radio colorScheme="purple" orientation="horizontal" value={value}>
                {label}
              </Radio>
            </WrapItem>
          ))}
        </Wrap>
      </RadioGroup>
    </FormControl>
  );
};

export default RadioInput;
