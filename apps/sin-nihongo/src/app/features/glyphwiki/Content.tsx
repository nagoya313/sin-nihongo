import React from 'react';
import { useMutation } from 'react-fetching-library';
import { useAuth0 } from '@auth0/auth0-react';
import { Buhin } from '@kurgm/kage-engine';
import { Glyph } from '@sin-nihongo/api-interfaces';
import { Box, FlexBox } from '../../components/Box';
import { IconButton } from '../../components/Button';
import { ClipBoard } from '../../components/ClipBoard';
import { Divider } from '../../components/Divider';
import { useEditable } from '../../components/Editable';
import { GlyphCanvas } from '../../components/GlyphCanvas';
import { BuildIcon } from '../../components/Icons';
import {
  List,
  ListItem,
  ListItemLink,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from '../../components/List';
import { useDisplayNotice } from '../../components/Notice';
import { getAccessTokenOptions } from '../../utils/auth0';
import { splitData } from '../../utils/kageData';
import { fetchAddGlyph } from '../../routes';
import { isErrorResponse } from '../../apiClient';

type Props = { glyph: Glyph; buhin: Buhin };

export const Content: React.VFC<Props> = ({ glyph, buhin }) => {
  const { name, data } = glyph;
  const { mutate } = useMutation(fetchAddGlyph);
  const { getAccessTokenSilently } = useAuth0();
  const { displayError, displaySuccess } = useDisplayNotice();
  const isEditable = useEditable();

  const onBuild = async () => {
    const token = await getAccessTokenSilently(getAccessTokenOptions);
    const { payload } = await mutate({ body: { glyph }, token });

    if (isErrorResponse(payload)) {
      displayError(payload.message);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      displaySuccess(payload!.message);
    }
  };

  return (
    <FlexBox p={1}>
      <GlyphCanvas name={name} buhin={buhin} />
      <Box flexGrow={1}>
        <List>
          <ListItemLink href={`https://glyphwiki.org/wiki/${name}`}>
            <ListItemText primary={name} />
            {isEditable && (
              <ListItemSecondaryAction>
                <ListItemIcon icon={<IconButton onClick={onBuild} icon={<BuildIcon />} />} />
                <ListItemIcon icon={<ClipBoard data={name} title="複製了" />} />
              </ListItemSecondaryAction>
            )}
          </ListItemLink>
          <Divider />
          <ListItem>
            <ListItemText primary={splitData(data)} />
            {isEditable && <ListItemIcon icon={<ClipBoard data={data} title="複製了" />} />}
          </ListItem>
        </List>
      </Box>
    </FlexBox>
  );
};
