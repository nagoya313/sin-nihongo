import React from 'react';
import Typography from '@material-ui/core/Typography';

export const Text: React.FC = ({ children }) => {
  return (
    <Typography variant="body1" gutterBottom>
      {children}
    </Typography>
  );
};
