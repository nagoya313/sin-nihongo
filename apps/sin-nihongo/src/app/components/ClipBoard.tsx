import React, { useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AssignmentIcon from '@material-ui/icons/Assignment';

type Props = {
  data?: string;
  title: string;
};

export const ClipBoard: React.FC<Props> = ({ data, title }) => {
  const [_, copyToClipboard] = useCopyToClipboard();
  const [openTip, setOpenTip] = useState(false);
  const copyText = data || '';
  const handleClickButton = () => {
    copyToClipboard(copyText);
    setOpenTip(true);
  };
  const handleCloseTip = () => setOpenTip(false);

  // TODO.CopyToClipBoardの警吿が鬱陶しいので要審議
  return (
    <Tooltip arrow open={openTip} onClose={handleCloseTip} disableHoverListener placement="top" title={title}>
      <IconButton disabled={!copyText} onClick={handleClickButton}>
        <AssignmentIcon />
      </IconButton>
    </Tooltip>
  );
};
