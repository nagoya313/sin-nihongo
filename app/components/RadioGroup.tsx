import {
  HStack,
  Radio,
  RadioGroup as CUIRadioGroup,
  type RadioGroupProps as CUIRadioGroupProps,
} from '@chakra-ui/react';
import { useField } from 'remix-validated-form';

type RadioGroupProps = {
  name: string;
  radioLabels: ReadonlyArray<{ key: string; label: string }>;
  disabled?: boolean;
};

const RadioGroup = ({ name, radioLabels, disabled }: RadioGroupProps) => {
  const { getInputProps } = useField(name);

  return (
    <CUIRadioGroup
      isDisabled={disabled}
      defaultValue={radioLabels[0]!.key}
      {...getInputProps<Omit<CUIRadioGroupProps, 'children'>>()}
    >
      <HStack whiteSpace="nowrap">
        {radioLabels.map(({ key, label }) => (
          <Radio colorScheme="purple" orientation="horizontal" key={key} value={key}>
            {label}
          </Radio>
        ))}
      </HStack>
    </CUIRadioGroup>
  );
};

export default RadioGroup;
