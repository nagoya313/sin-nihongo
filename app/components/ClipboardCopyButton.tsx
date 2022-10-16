import { Button, useClipboard } from '@chakra-ui/react';

type ClipboardCopyButtonProps = {
  text: string;
};

const ClipboardCopyButton = ({ text }: ClipboardCopyButtonProps) => {
  const { hasCopied, onCopy } = useClipboard(text);

  return (
    <Button size="xs" onClick={onCopy}>
      {hasCopied ? '複製了' : '複製'}
    </Button>
  );
};

export default ClipboardCopyButton;
