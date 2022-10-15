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
} from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';
import { useShadow } from '../hooks/useColor';

type SearchPanelProps = React.PropsWithChildren;

const SearchPanel = ({ children }: SearchPanelProps) => (
  <VStack
    rounded="md"
    mt={4}
    p={4}
    align="start"
    borderWidth={useColorModeValue('1px', undefined)}
    bg={useColorModeValue('white', 'gray.700')}
    shadow={useShadow()}
    role="search"
    onSubmit={(e) => e.preventDefault()}
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
          <VStack w="full" align="start">
            {children}
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  </VStack>
);

export default SearchPanel;