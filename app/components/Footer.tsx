import { HStack, Link, Text, useColorModeValue } from '@chakra-ui/react';
import { SiGithub } from 'react-icons/si';

const Footer = () => (
  <HStack as="footer" p={4} ml="auto" mr={0}>
    <Link
      href="https://github.com/nagoya313/sin-nihongo82"
      isExternal
      color="gray.400"
      _hover={{ color: useColorModeValue('gray.700', 'gray.600') }}
    >
      <SiGithub />
    </Link>
    <Text fontSize="xs" align="right">
      2682 新日本語漢字形制定委員会
    </Text>
  </HStack>
);

export default Footer;
