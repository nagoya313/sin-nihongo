import { Link, useColorModeValue } from '@chakra-ui/react';

type ExternalLinkProps = React.PropsWithChildren<{
  href: string;
}>;

const ExternalLink = ({ href, children }: ExternalLinkProps) => (
  <Link ml={1} mr={1} href={href} isExternal color={useColorModeValue('purple.600', 'purple.300')}>
    {children}
  </Link>
);

export default ExternalLink;
