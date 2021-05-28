import React, { useState } from 'react';
import CopyToClipBoard from 'react-copy-to-clipboard';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AssignmentIcon from '@material-ui/icons/Assignment';

interface Props {
  readonly data?: string;
  readonly title: string;
}

export const ClipBoard: React.FC<Props> = ({ data, title }) => {
  const [openTip, setOpenTip] = useState(false);
  const handleClickButton = () => setOpenTip(true);
  const handleCloseTip = () => setOpenTip(false);
  const copyText = data || '';

  // TODO.CopyToClipBoardの警吿が鬱陶しいので要審議
  return (
    <Tooltip arrow open={openTip} onClose={handleCloseTip} disableHoverListener placement="top" title={title}>
      <CopyToClipBoard text={copyText}>
        <IconButton disabled={!copyText} onClick={handleClickButton}>
          <AssignmentIcon />
        </IconButton>
      </CopyToClipBoard>
    </Tooltip>
  );
};
