import { Box } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import { $path } from 'remix-routes';

type GlyphRefProps = {
  name: string;
  html: string;
};

const GlyphRef = ({ name, html }: GlyphRefProps) => (
  <Link to={$path('/glyphs/:name', { name })}>
    <Box bg="white" dangerouslySetInnerHTML={{ __html: html }} sx={{ svg: { width: '32px', height: '32px' } }} />
  </Link>
);

export default GlyphRef;
