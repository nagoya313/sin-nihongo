import { IconButton } from '@chakra-ui/react';
import { useNavigate } from '@remix-run/react';
import { MdEdit } from 'react-icons/md';
import { useOptionalUser } from '~/hooks/useUser';

type EditButtonProps = {
  to: string;
};

const EditButton = ({ to }: EditButtonProps) => {
  const user = useOptionalUser();
  const navigate = useNavigate();

  if (user == null) return null;

  return <IconButton aria-label="edit" icon={<MdEdit />} onClick={() => navigate(to)} />;
};

export default EditButton;
