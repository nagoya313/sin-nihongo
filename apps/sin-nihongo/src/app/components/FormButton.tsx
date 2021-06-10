import styled from 'styled-components';
import Button, { ButtonProps } from '@material-ui/core/Button';

const FormButton = styled(Button)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

type Props = {
  text: string;
} & ButtonProps;

export const SubmitButton: React.FC<Props> = ({ text, ...others }) => (
  <FormButton {...others} variant="contained" color="secondary" type="submit">
    {text}
  </FormButton>
);

export const CancelButton: React.FC<Props> = ({ text, ...others }) => (
  <FormButton {...others} variant="outlined" color="primary">
    {text}
  </FormButton>
);
