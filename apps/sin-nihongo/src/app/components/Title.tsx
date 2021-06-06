import React from 'react';
import Typography from '@material-ui/core/Typography';

export const Title: React.FC = ({ children }) => {
  return (
    <Typography variant="h2" gutterBottom>
      {children}
    </Typography>
  );
};
