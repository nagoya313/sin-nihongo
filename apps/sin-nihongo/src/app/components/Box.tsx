import React from 'react';
import Box, { BoxProps } from '@material-ui/core/Box';
export { Box } from '@material-ui/core';

export const FlexBox: React.FC<BoxProps> = ({ children, ...others }) => (
  <Box {...others} display="flex">
    {children}
  </Box>
);
