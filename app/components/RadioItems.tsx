import { Radio, Wrap, WrapItem } from '@chakra-ui/react';

type RadioItemsProps = {
  options: ReadonlyArray<{ value: string; label: string }>;
};

const RadioItems = ({ options }: RadioItemsProps) => (
  <Wrap whiteSpace="nowrap">
    {options.map(({ value, label }) => (
      <WrapItem key={value}>
        <Radio colorScheme="purple" orientation="horizontal" value={value}>
          {label}
        </Radio>
      </WrapItem>
    ))}
  </Wrap>
);

export default RadioItems;
