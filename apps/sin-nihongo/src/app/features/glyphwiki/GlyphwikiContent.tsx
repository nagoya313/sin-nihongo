import React from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
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

const splitData = (data: string | undefined) => {
  return data?.split('$')?.map((t, i) => {
    return (
      <span key={i}>
        {t}
        <br />
      </span>
    );
  });
};

interface Props {
  readonly name?: string;
  readonly data?: string;
  readonly buhin: Buhin;
}

export const GlyphwikiContent: React.FC<Props> = ({ name, data, buhin }) => {
  return (
    <Box display="flex" p={1}>
      <GlyphCanvas buhin={buhin} name={name} />
      <Box flexGrow={1}>
        <List>
          <ListItem alignItems="flex-start" button>
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
