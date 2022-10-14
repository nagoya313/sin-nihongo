import { IconButton, type IconButtonProps } from '@chakra-ui/react';
import { useNavigate } from '@remix-run/react';

type EditButtonProps = {
  to: string;
  icon: IconButtonProps['icon'];
};

const LinkButton = ({ to, icon }: EditButtonProps) => {
  const navigate = useNavigate();

  return <IconButton aria-label="edit" icon={icon} onClick={() => navigate(to)} />;
};

export default LinkButton;
