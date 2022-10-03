import { extendTheme } from '@chakra-ui/react';

const inputTheme = {
  sizes: {
    md: { field: { h: '32px' } },
    sm: { field: { h: '28px', borderRadius: 'md' } },
  },
  variants: {
    outline: { field: { bg: 'white' } },
  },
};

export const theme = extendTheme({
  fonts: {
    body: "'Open Sans', sans-serif",
    heading: "'Open Sans', sans-serif",
    mono: "'Open Sans', monospace",
  },
  components: {
    Checkbox: {
      baseStyle: { control: { bg: 'white' } },
    },
    Radio: {
      baseStyle: { control: { bg: 'white' } },
    },
    Input: inputTheme,
    NumberInput: inputTheme,
    Select: inputTheme,
  },
});
