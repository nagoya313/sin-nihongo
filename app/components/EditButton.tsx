import { MdEdit } from 'react-icons/md';
import { useOptionalUser } from '~/hooks/useUser';
import LinkButton from './LinkButton';

type EditButtonProps = {
  to: string;
};

const EditButton = ({ to }: EditButtonProps) => {
  const user = useOptionalUser();

  if (user == null) return null;

  return <LinkButton aria-label="edit" icon={<MdEdit />} to={to} />;
};

export default EditButton;
