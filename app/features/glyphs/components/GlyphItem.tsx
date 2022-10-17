import { Box, Divider, HStack, IconButton, Spacer, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { Form, useTransition } from '@remix-run/react';
import { MdOutlineDelete } from 'react-icons/md';
import { $path } from 'remix-routes';
import GlyphCanvasSuspense from '~/components/GlyphCanvasSuspense';
import KageData from '~/components/KageData';
import { getGlyphCanvasProps, type DrawableGlyph } from '~/kage/kageData';
import { useShadow } from '../../../hooks/useColor';

type GlyphItemProps = {
  glyph: DrawableGlyph;
  isEven: boolean;
};

const GlyphItem = ({ glyph, isEven }: GlyphItemProps) => {
  const transition = useTransition();

  return (
    <HStack
      p={4}
      rounded="md"
      borderWidth="1px"
      shadow={useShadow()}
      bg={useColorModeValue(isEven ? 'purple.50' : 'purple.100', isEven ? 'whiteAlpha.0' : 'whiteAlpha.50')}
      justify="space-between"
    >
      <GlyphCanvasSuspense {...getGlyphCanvasProps(glyph)} />
      <Box p={4} borderWidth="1px" rounded="md" w="full" overflow="hidden">
        <VStack align="start">
          <HStack>
            <Text fontSize="sm">なまえ：</Text>
            <Text fontSize="sm" m={4}>
              {glyph.name}
            </Text>
          </HStack>
          <Divider />
          <HStack>
            <Text fontSize="sm">影算料：</Text>
            <KageData data={glyph.data} />
          </HStack>
        </VStack>
      </Box>
      <Spacer />
      <Form method="delete" action={$path('/glyphs/:name/delete', { name: glyph.name })}>
        <IconButton
          type="submit"
          aria-label="glyph-delete"
          icon={<MdOutlineDelete />}
          isDisabled={transition.state === 'submitting'}
          colorScheme="red"
        />
      </Form>
    </HStack>
  );
};

export default GlyphItem;
