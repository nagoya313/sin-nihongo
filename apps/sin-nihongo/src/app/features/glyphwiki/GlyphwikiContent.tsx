import React from 'react';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { Buhin } from '@kurgm/kage-engine';
import { ClipBoard } from '../../components/ClipBoard';
import { GlyphCanvas } from '../../components/GlyphCanvas';
import { splitData } from '../../utils/kageData';

type Props = {
  name?: string;
  data?: string;
  buhin: Buhin;
};

export const GlyphwikiContent: React.FC<Props> = ({ name, data, buhin }) => {
  return (
    <Box display="flex" p={1}>
      <GlyphCanvas buhin={buhin} name={name} />
      <Box flexGrow={1}>
        <List>
          <ListItem
            alignItems="flex-start"
            button
            component="a"
            href={`https://glyphwiki.org/wiki/${name}`}
            target="_blank"
            rel="noopener"
          >
            <ListItemText>{name}</ListItemText>
            <ListItemSecondaryAction>
              <ListItemIcon>
                <ClipBoard data={name} title="複製了" />
              </ListItemIcon>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem alignItems="flex-start">
            <ListItemText>{splitData(data)}</ListItemText>
            <ListItemIcon>
              <ClipBoard data={data} title="複製了" />
            </ListItemIcon>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};
