import {
  RadioGroup as CUIRadioGroup,
  type RadioGroupProps as CUIRadioGroupProps,
  Radio,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { useControlField, useField } from 'remix-validated-form';

type RadioGroupProps = {
  name: string;
  radioLabels: ReadonlyArray<{ key: string; label: string }>;
  disabled?: boolean;
};

const RadioGroup = ({ name, radioLabels, disabled }: RadioGroupProps) => {
  const { getInputProps } = useField(name);
  const [value, setValue] = useControlField<string>(name);

  return (
    <CUIRadioGroup
      isDisabled={disabled}
      defaultValue={radioLabels[0]!.key}
      value={value ?? radioLabels[0]!.key}
      {...getInputProps<Omit<CUIRadioGroupProps, 'children'>>({ onChange: setValue })}
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
    </CUIRadioGroup>
  );
};

export default RadioGroup;
