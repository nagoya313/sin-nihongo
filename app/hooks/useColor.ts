import { useColorModeValue } from '@chakra-ui/react';

export const useLinkColor = () => useColorModeValue('purple.600', 'purple.300');
export const useShadow = () => useColorModeValue('md', undefined);
