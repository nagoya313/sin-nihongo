import { Link as CUILink } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import { useLinkColor } from '~/hooks/useColor';

type TextLinkProps = {
  to: string;
  text: string;
};

const TextLink = ({ to, text }: TextLinkProps) => {
  const color = useLinkColor();

  return (
    <CUILink as={Link} to={to} color={color}>
      {text}
    </CUILink>
  );
};

export default TextLink;
