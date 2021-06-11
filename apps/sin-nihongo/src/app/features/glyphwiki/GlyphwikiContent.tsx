import React, { useContext, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import BuildIcon from '@material-ui/icons/Build';
import ListItemText from '@material-ui/core/ListItemText';
import { apiRoutes } from '@sin-nihongo/api-interfaces';
import { ClipBoard } from '../../components/ClipBoard';
import { GlyphCanvas } from '../../components/GlyphCanvas';
import { IconButton } from '../../components/IconButton';
import { ListItemIcon } from '../../components/ListItemIcon';
import { NewTabLinkListItem } from '../../components/NewTabLinkListItem';
import { NoticeDispatchContext } from '../../providers/Notice';
import { errorMessage, errorHandler, useFetch } from '../../utils/axios';
import { splitData } from '../../utils/kageData';
import { Glyph } from '../../model/Glyph';
import { useAccessToken } from '../../utils/auth0';
import { useEditable } from '../../utils/useEditable';

type Props = {
  glyph: Glyph;
};

export const GlyphwikiContent: React.FC<Props> = ({ glyph }) => {
  const getAccessToken = useAccessToken();
  const [{ data, error }, execute] = useFetch(apiRoutes.postGlyph);
  const noticeDispatch = useContext(NoticeDispatchContext);
  const isEditable = useEditable();

  const onBuild = async () => {
    execute({ headers: await getAccessToken(), data: { glyph: glyph } }).catch(errorHandler);
  };

  useEffect(() => {
    error && noticeDispatch({ type: 'open', message: errorMessage(error), severity: 'error' });
  }, [error, noticeDispatch]);

  useEffect(() => {
    data && noticeDispatch({ type: 'open', message: data.message, severity: 'success' });
  }, [data, noticeDispatch]);

  return (
    <Box display="flex" p={1}>
      <GlyphCanvas name={glyph.name} />
      <Box flexGrow={1}>
        <List>
          <NewTabLinkListItem url={glyph.glyphwikiLink}>
            <ListItemText>{glyph.name}</ListItemText>
            {isEditable && (
              <ListItemSecondaryAction>
                <ListItemIcon icon={<IconButton onClick={onBuild} icon={<BuildIcon />} />} />
                <ListItemIcon icon={<ClipBoard data={glyph.name} title="複製了" />} />
              </ListItemSecondaryAction>
            )}
          </NewTabLinkListItem>
          <Divider />
          <ListItem alignItems="flex-start">
            <ListItemText>{splitData(glyph.data)}</ListItemText>
            {isEditable && <ListItemIcon icon={<ClipBoard data={glyph.data} title="複製了" />} />}
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};
