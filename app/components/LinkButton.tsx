import { IconButton, type IconButtonProps } from '@chakra-ui/react';
import { useNavigate } from '@remix-run/react';

type LinkButtonProps = {
  to: string;
} & Omit<IconButtonProps, 'onClick'>;

const LinkButton = ({ to, ...props }: LinkButtonProps) => {
  const navigate = useNavigate();

  return <IconButton {...props} onClick={() => navigate(to)} />;
};

export default LinkButton;
