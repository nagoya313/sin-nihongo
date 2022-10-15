import { useOptionalUser } from '~/hooks/useUser';
import LinkButton from './LinkButton';

type AdminLinkButtonProps = React.ComponentProps<typeof LinkButton>;

const AdminLinkButton = ({ to, ...props }: AdminLinkButtonProps) => {
  const user = useOptionalUser();

  if (user == null) return null;

  return <LinkButton to={to} {...props} />;
};

export default AdminLinkButton;
