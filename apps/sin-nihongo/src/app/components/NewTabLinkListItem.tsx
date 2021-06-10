import React from 'react';
import ListItem from '@material-ui/core/ListItem';

type Props = {
  url: string;
};

export const NewTabLinkListItem: React.FC<Props> = ({ url, children }) => {
  return (
    <ListItem alignItems="flex-start" button component="a" href={url} target="_blank" rel="noopener">
      {children}
    </ListItem>
  );
};
