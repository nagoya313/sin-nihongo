import { IconButton, type IconButtonProps } from '@chakra-ui/react';
import { Link } from '@remix-run/react';

type LinkButtonProps = {
  to: string;
} & Omit<IconButtonProps, 'onClick'>;

const LinkButton = (props: LinkButtonProps) => <IconButton as={Link} {...props} />;

export default LinkButton;
