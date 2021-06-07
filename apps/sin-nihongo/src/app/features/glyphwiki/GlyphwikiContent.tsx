import React, { useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import BuildIcon from '@material-ui/icons/Build';
import ListItemText from '@material-ui/core/ListItemText';
import { Buhin } from '@kurgm/kage-engine';
import { GlyphForm, GlyphParams, Message } from '@sin-nihongo/api-interfaces';
import { ClipBoard } from '../../components/ClipBoard';
import { GlyphCanvas } from '../../components/GlyphCanvas';
import { IconButton } from '../../components/IconButton';
import { ListItemIcon } from '../../components/ListItemIcon';
import { NoticeDispatchContext } from '../notice/Notice';
import { getAccessTokenOptions } from '../../utils/auth0';
import { errorMessage, fetchWithTokenAndData, useLazyAxiosPost } from '../../utils/axios';
import { splitData } from '../../utils/kageData';

type Props = {
  isEditable?: boolean;
  name?: string;
  data?: string;
  buhin: Buhin;
};

export const GlyphwikiContent: React.FC<Props> = ({ isEditable, name, data, buhin }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [{ data: postData, error }, execute] = useLazyAxiosPost<Message>('api/v1/glyphs');
  const noticeDispatch = useContext(NoticeDispatchContext);

  const onBuild = async () => {
    if (name && data) {
      const token = await getAccessTokenSilently(getAccessTokenOptions);
      fetchWithTokenAndData(execute, token, new GlyphParams({ name: name, data: data }));
    }
  };

  useEffect(() => {
    error && noticeDispatch({ type: 'open', message: errorMessage(error), severity: 'error' });
  }, [error, noticeDispatch]);

  useEffect(() => {
    postData && noticeDispatch({ type: 'open', message: postData.message, severity: 'success' });
  }, [postData, noticeDispatch]);

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
            {isEditable && (
              <ListItemSecondaryAction>
                <ListItemIcon icon={<IconButton onClick={onBuild} icon={<BuildIcon />} />} />
                <ListItemIcon icon={<ClipBoard data={name} title="複製了" />} />
              </ListItemSecondaryAction>
            )}
          </ListItem>
          <Divider />
          <ListItem alignItems="flex-start">
            <ListItemText>{splitData(data)}</ListItemText>
            {isEditable && <ListItemIcon icon={<ClipBoard data={data} title="複製了" />} />}
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};
