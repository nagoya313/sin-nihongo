import { Heading, Text } from '@chakra-ui/react';
import ClipboardCopyButton from '~/components/ClipboardCopyButton';

type DataItemProps = {
  term: string;
  definition: React.ReactNode;
  isCopyable?: boolean;
} & (
  | {
      isCopyable: true;
      copyText?: string | null;
    }
  | {
      isCopyable?: false;
      copyText?: never;
    }
);

const DataItem = ({
  term,
  definition,
  isCopyable,
  copyText = typeof definition === 'string' ? definition : undefined,
}: DataItemProps) => (
  <>
    <Heading as="dt" size="sm" w="30%">
      {term} {isCopyable && copyText != null && <ClipboardCopyButton text={copyText} />}
    </Heading>
    <Text as="dd" w="70%" whiteSpace="pre">
      {definition}
    </Text>
  </>
);

export default DataItem;
