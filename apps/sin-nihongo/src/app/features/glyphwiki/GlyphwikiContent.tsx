import React, { useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { apiRoutes, GlyphResponse } from '@sin-nihongo/api-interfaces';
import { Box, FlexBox } from '../../components/Box';
import { IconButton } from '../../components/Button';
import { ClipBoard } from '../../components/ClipBoard';
import { Divider } from '../../components/Divider';
import { GlyphCanvas } from '../../components/GlyphCanvas';
import { BuildIcon } from '../../components/Icons';
import { List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from '../../components/List';
import { useDisplayNotice } from '../../components/Notice';
import { EditableContext } from '../../providers/Editable';
import { getAccessTokenOptions } from '../../utils/auth0';
import { errorMessage, useFetch } from '../../utils/axios';
import { splitData } from '../../utils/kageData';

type Props = {
  glyph: GlyphResponse;
};

export const GlyphwikiContent: React.FC<Props> = ({ glyph }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [{ data: postData, error }, execute] = useFetch(apiRoutes.postGlyph);
  const { displayError, displaySuccess } = useDisplayNotice();
  const isEditable = useContext(EditableContext);

  const onBuild = async () => {
    const token = await getAccessTokenSilently(getAccessTokenOptions);
    execute({
      headers: { Authorization: `Bearer ${token}` },
      data: { glyph: { name: name, data: data } },
    }).catch(() => {});
  };

  useEffect(() => {
    error && displayError(errorMessage(error));
  }, [error, displayError]);

  useEffect(() => {
    postData && displaySuccess(postData.message);
  }, [postData, displaySuccess]);

  return (
    <FlexBox p={1}>
      <GlyphCanvas name={name} />
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
            <ListItemText primary={name} />
            {isEditable && (
              <ListItemSecondaryAction>
                <ListItemIcon icon={<IconButton onClick={onBuild} icon={<BuildIcon />} />} />
                <ListItemIcon icon={<ClipBoard data={name} title="複製了" />} />
              </ListItemSecondaryAction>
            )}
          </ListItem>
          <Divider />
          <ListItem alignItems="flex-start">
            <ListItemText primary={splitData(data)} />
            {isEditable && <ListItemIcon icon={<ClipBoard data={data} title="複製了" />} />}
          </ListItem>
        </List>
      </Box>
    </FlexBox>
  );
};
