import React from 'react';
import Typography from '@material-ui/core/Typography';

export const SubSubTitle: React.FC = ({ children }) => {
  return (
    <Typography variant="h6" gutterBottom>
      {children}
    </Typography>
  );
};
