import React from 'react';
import { Card, CardActions, CardHeader } from '../../components/Card';
import { FadePopper } from '../../components/FadePopper';
import { CancelButton } from '../../components/FormButton';

type Props = {
  open: boolean;
  onClose: () => void;
  kanji: string;
  anchorEl?: HTMLButtonElement;
};

export const GlyphEditForm: React.FC<Props> = ({ open, onClose, kanji, anchorEl }) => {
  return (
    <FadePopper open={open} anchorEl={anchorEl} placement="right" transition>
      <Card>
        <CardHeader avatarText={kanji} title="新日本語字形実装" />
        <CardActions>
          <CancelButton onClick={onClose} text="閉じる" />
        </CardActions>
      </Card>
    </FadePopper>
  );
};
