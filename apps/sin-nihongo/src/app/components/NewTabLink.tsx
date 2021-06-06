import React from 'react';
import Link from '@material-ui/core/Link';

type Props = {
  url: string;
  text: string;
};

export const NewTabLink: React.FC<Props> = ({ url, text }) => (
  <Link href={url} target="_blank" rel="noopener">
    {text}
  </Link>
);
