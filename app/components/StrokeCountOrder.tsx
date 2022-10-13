import { Box, Wrap } from '@chakra-ui/react';
import { useRef } from 'react';
import { GroupedVirtuoso, type GroupedVirtuosoHandle } from 'react-virtuoso';
import GroupLabel from '~/components/GroupLabel';
import JumpList from '~/components/JumpList';
import WordItem from '~/components/WordItem';
import QueryResult from './QueryResult';

const strokeCount = (data: any) => ('stroke_count' in data ? data.stroke_count : data.in_radical_stroke_count);

type StrokeCountOrderProps = {
  data: ReadonlyArray<{ stroke_count?: number; in_radical_stroke_count?: string; code_points: ReadonlyArray<number> }>;
};

const StrokeCountOrder = ({ data }: StrokeCountOrderProps) => {
  const virtuoso = useRef<GroupedVirtuosoHandle>(null);

  return (
    <QueryResult>
      <Box w="full">
        <GroupedVirtuoso
          ref={virtuoso}
          groupCounts={data.map(() => 1)}
          groupContent={(index) => (
            <GroupLabel label={`${strokeCount(data[index]!)}画（${data[index]!.code_points.length}件）`} />
          )}
          itemContent={(index) => (
            <Wrap p={4}>
              {data[index]!.code_points.map((codePoint) => (
                <WordItem key={codePoint} codePoint={codePoint} />
              ))}
            </Wrap>
          )}
          useWindowScroll
        />
      </Box>
      {data.length > 1 && (
        <JumpList label="画数ジャンプ" virtuoso={virtuoso} headings={data.map((data) => strokeCount(data))} />
      )}
    </QueryResult>
  );
};

export default StrokeCountOrder;
