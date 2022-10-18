import {
  Radio,
  RadioGroup as CUIRadioGroup,
  Wrap,
  WrapItem,
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
