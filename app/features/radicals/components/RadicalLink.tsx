import { Link as CUILink } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import { $path } from 'remix-routes';
import { useLinkColor } from '../../../hooks/useColor';

type RadicalLinkProps = {
  codePoint: number;
};

const RadicalLink = ({ codePoint }: RadicalLinkProps) => (
  <CUILink as={Link} to={$path('/radicals/:code_point', { code_point: codePoint })} color={useLinkColor()}>
    {String.fromCodePoint(codePoint)}
  </CUILink>
);

export default RadicalLink;
