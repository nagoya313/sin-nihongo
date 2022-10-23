import { $path } from 'remix-routes';
import TextLink from '~/components/TextLink';

type RadicalLinkProps = {
  codePoint: number;
};

const RadicalLink = ({ codePoint }: RadicalLinkProps) => (
  <TextLink to={$path('/radicals/:code_point', { code_point: codePoint })} text={String.fromCodePoint(codePoint)} />
);

export default RadicalLink;
