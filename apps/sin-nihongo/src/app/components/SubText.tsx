import React from 'react';
import Typography from '@material-ui/core/Typography';

export const SubText: React.FC = ({ children }) => {
  return (
    <Typography variant="body2" gutterBottom>
      {children}
    </Typography>
  );
};
