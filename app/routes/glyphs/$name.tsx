import { Heading, Icon, VStack, Wrap } from '@chakra-ui/react';
import { type ActionArgs, type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Page from '~/components/Page';
import { GlyphIcon } from '~/components/icons';
import GlyphData from '~/features/glyphs/components/GlyphData';
import GlyphRef from '~/features/glyphs/components/GlyphRef';
import { destroy, get, update } from '~/features/glyphs/services.server';
import { actions, authGuard } from '~/utils/request.server';

export const meta: MetaFunction = () => ({ title: '新日本語｜グリフ詳細' });
export const loader = (args: LoaderArgs) => authGuard(args, get);
export const action = async (args: ActionArgs) => authGuard(args, actions({ PATCH: update, DELETE: destroy }));

const Glyph = () => {
  const { glyph, includeGlyphs, includedGlyphs } = useLoaderData<typeof loader>();

  return (
    <Page avatar={<Icon fontSize={24} as={GlyphIcon} />} title="グリフ詳細">
      <VStack p={8} align="stretch" w="full">
        <GlyphData glyph={glyph} />
        <Heading as="h4" size="md">
          このグリフが含むグリフ
        </Heading>
        <Wrap>
          {includeGlyphs.map(({ name, html }) => (
            <GlyphRef key={name} name={name} html={html} />
          ))}
        </Wrap>
        <Heading as="h4" size="md">
          このグリフを含むグリフ
        </Heading>
        <Wrap>
          {includedGlyphs.map(({ name, html }) => (
            <GlyphRef key={name} name={name} html={html} />
          ))}
        </Wrap>
      </VStack>
    </Page>
  );
};

export default Glyph;
