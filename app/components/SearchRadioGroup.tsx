import { Radio, RadioGroup, type RadioGroupProps, Wrap, WrapItem } from '@chakra-ui/react';
import { useControlField, useField, useFormContext } from 'remix-validated-form';

type SearchRadioGroupProps = {
  name: string;
  radioLabels: ReadonlyArray<{ key: string; label: string }>;
  disabled?: boolean;
};

const SearchRadioGroup = ({ name, radioLabels, disabled }: SearchRadioGroupProps) => {
  const { getInputProps } = useField(name);
  const [value, setValue] = useControlField<string>(name);
  const { submit } = useFormContext();
  const handleChange = (value: string) => {
    setValue(value);
    submit();
  };

  return (
    <RadioGroup
      isDisabled={disabled}
      defaultValue={radioLabels[0]!.key}
      value={value ?? radioLabels[0]!.key}
      {...getInputProps<Omit<RadioGroupProps, 'children'>>({ onChange: handleChange })}
    >
      <Wrap whiteSpace="nowrap">
        {radioLabels.map(({ key, label }) => (
          <WrapItem key={key}>
            <Radio colorScheme="purple" orientation="horizontal" value={key}>
              {label}
            </Radio>
          </WrapItem>
        ))}
      </Wrap>
    </RadioGroup>
  );
};

export default SearchRadioGroup;
