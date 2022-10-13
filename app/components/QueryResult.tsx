import { Flex } from '@chakra-ui/react';

type QueryResultProps = React.PropsWithChildren;

const QueryResult = ({ children }: QueryResultProps) => <Flex mt={2}>{children}</Flex>;

export default QueryResult;
