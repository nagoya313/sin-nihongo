import styled from 'styled-components';
import Typography, { TypographyProps } from '@material-ui/core/Typography';

export const ErrorTypography = styled(Typography)`
  color: red;
`;

export const Text: React.FC<TypographyProps> = ({ children, ...others }) => (
  <Typography {...others} variant="body1" gutterBottom>
    {children}
  </Typography>
);

export const Title: React.FC<TypographyProps> = ({ children, ...others }) => (
  <Typography {...others} variant="h2" gutterBottom>
    {children}
  </Typography>
);

export const SubTitle: React.FC<TypographyProps> = ({ children, ...others }) => (
  <Typography {...others} variant="h5" gutterBottom>
    {children}
  </Typography>
);

export const SubSubTitle: React.FC<TypographyProps> = ({ children, ...others }) => (
  <Typography {...others} variant="h6" gutterBottom>
    {children}
  </Typography>
);

export const SubText: React.FC<TypographyProps> = ({ children, ...others }) => (
  <Typography {...others} variant="body2" gutterBottom>
    {children}
  </Typography>
);
