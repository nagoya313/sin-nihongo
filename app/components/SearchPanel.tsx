import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Heading,
  HStack,
  Icon,
  useColorModeValue,
  VStack,
  type StackProps,
} from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';
import { useShadow } from '~/hooks/useColor';

type SearchPanelProps = React.PropsWithChildren<{
  align?: StackProps['align'];
}>;

const SearchPanel = ({ align = 'start', children }: SearchPanelProps) => (
  <VStack
    rounded="md"
    mt={4}
    p={4}
    align="start"
    borderWidth={useColorModeValue('1px', undefined)}
    bg={useColorModeValue('white', 'gray.700')}
    shadow={useShadow()}
    role="search"
  >
    <Accordion allowToggle w="full">
      <AccordionItem>
        <AccordionButton>
          <HStack w="full">
            <Icon as={MdSearch} />
            <Heading size="sm">検索</Heading>
          </HStack>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel mt={4}>
          <VStack w="full" align={align}>
            {children}
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  </VStack>
);

export default SearchPanel;
