import { IconButton } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import { MdEdit } from 'react-icons/md';
import { useOptionalUser } from '~/hooks/useUser';

type EditButtonProps = {
  to: string;
};

const RadicalEditButton = ({ to }: EditButtonProps) => {
  const user = useOptionalUser();

  if (user == null) return null;

  return (
    <Link to={to}>
      <IconButton aria-label="edit" icon={<MdEdit />} />
    </Link>
  );
};

export default RadicalEditButton;
