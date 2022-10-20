import { Box, Wrap } from '@chakra-ui/react';
import groupBy from 'lodash/groupBy';
import { Fragment, useRef } from 'react';
import { GroupedVirtuoso, type GroupedVirtuosoHandle } from 'react-virtuoso';
import GroupLabel from './GroupLabel';
import JumpList from './JumpList';
import QueryResult from './QueryResult';
import ReadBadge from './ReadBadge';
import WordItem from './WordItem';

type ReadOrderProps = {
  data: ReadonlyArray<{ read_front: string; results: ReadonlyArray<{ code_point: number; read: string }> }>;
  to: React.ComponentProps<typeof WordItem>['to'];
};

const ReadOrder = ({ data, to }: ReadOrderProps) => {
  const virtuoso = useRef<GroupedVirtuosoHandle>(null);

  return (
    <QueryResult>
      <Box w="full">
        <GroupedVirtuoso
          ref={virtuoso}
          groupCounts={data.map(() => 1)}
          groupContent={(index) => (
            <GroupLabel label={`${data[index]!.read_front}（${data[index]!.results.length}件）`} />
          )}
          itemContent={(index) => (
            <Wrap p={4}>
              {Object.entries(groupBy(data[index]?.results, 'read')).map(([name, codePoints]) => (
                <Fragment key={name}>
                  {codePoints.map(({ code_point }, index) => (
                    <Fragment key={`${name}-${code_point}`}>
                      {index === 0 && <ReadBadge name={name} />}
                      <WordItem codePoint={code_point} to={to} />
                    </Fragment>
                  ))}
                </Fragment>
              ))}
            </Wrap>
          )}
          useWindowScroll
        />
      </Box>
      {data.length > 1 && (
        <JumpList label="よみかたジャンプ" virtuoso={virtuoso} headings={data.map(({ read_front }) => read_front)} />
      )}
    </QueryResult>
  );
};

export default ReadOrder;
