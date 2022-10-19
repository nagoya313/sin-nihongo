import { Link } from '@chakra-ui/react';
import { useLinkColor } from '~/hooks/useColor';

type ExternalLinkProps = React.PropsWithChildren<{ href: string }>;

const ExternalLink = ({ href, children }: ExternalLinkProps) => (
  <Link ml={1} mr={1} href={href} isExternal color={useLinkColor()}>
    {children}
  </Link>
);

export default ExternalLink;
