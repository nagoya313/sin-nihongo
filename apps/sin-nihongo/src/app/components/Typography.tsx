import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export const ErrorTypography = styled(Typography)`
  color: red;
`;

export const Text: React.FC = ({ children }) => (
  <Typography variant="body1" gutterBottom>
    {children}
  </Typography>
);

export const Title: React.FC = ({ children }) => (
  <Typography variant="h2" gutterBottom>
    {children}
  </Typography>
);

export const SubTitle: React.FC = ({ children }) => (
  <Typography variant="h5" gutterBottom>
    {children}
  </Typography>
);

export const SubSubTitle: React.FC = ({ children }) => (
  <Typography variant="h6" gutterBottom>
    {children}
  </Typography>
);

export const SubText: React.FC = ({ children }) => (
  <Typography variant="body2" gutterBottom>
    {children}
  </Typography>
);
