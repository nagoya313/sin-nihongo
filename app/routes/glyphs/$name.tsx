import { Heading, Icon, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import { type ActionArgs, type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Page from '~/components/Page';
import { GlyphIcon } from '~/components/icons';
import GlyphData from '~/features/glyphs/components/GlyphData';
import { destroy, get } from '~/features/glyphs/services.server';
import { glyphToBuhin } from '~/features/kage/models/kageData';
import { actions, authGuard } from '~/utils/request.server';

export const meta: MetaFunction = () => ({ title: '新日本語｜グリフ詳細' });
export const loader = (args: LoaderArgs) => authGuard(args, get);
export const action = async (args: ActionArgs) => authGuard(args, actions({ DELETE: destroy }));

const Glyph = () => {
  const { glyph } = useLoaderData<typeof loader>();
  const buhin = glyphToBuhin(glyph);

  return (
    <Page avatar={<Icon fontSize={24} as={GlyphIcon} />} title="グリフ詳細">
      <VStack p={8} align="stretch" w="full">
        <GlyphData glyph={glyph} buhin={buhin} />
        <Heading as="h4" size="md">
          このグリフが含むグリフ
        </Heading>
        <Wrap>
          {glyph.drawNecessaryGlyphs.map((part) => (
            <WrapItem key={part.name}>
              <GlyphData glyph={part} buhin={buhin} hasLink />
            </WrapItem>
          ))}
        </Wrap>
        <Heading as="h4" size="md">
          このグリフを含むグリフ
        </Heading>
        <Wrap>
          {glyph.includedGlyphs.map((part) => (
            <WrapItem key={part.name}>
              <GlyphData glyph={part} buhin={glyphToBuhin(part)} hasLink />
            </WrapItem>
          ))}
        </Wrap>
      </VStack>
    </Page>
  );
};

export default Glyph;
