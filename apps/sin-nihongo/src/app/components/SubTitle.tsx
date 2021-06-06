import React from 'react';
import Typography from '@material-ui/core/Typography';

export const SubTitle: React.FC = ({ children }) => {
  return (
    <Typography variant="h5" gutterBottom>
      {children}
    </Typography>
  );
};
