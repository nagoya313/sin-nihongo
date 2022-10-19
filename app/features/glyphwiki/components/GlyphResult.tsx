import { Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { type Buhin } from '@kurgm/kage-engine';
import { ValidatedForm } from 'remix-validated-form';
import ClipboardCopyButton from '~/components/ClipboardCopyButton';
import HiddenInput from '~/components/HiddenInput';
import SubmitButton from '~/components/SubmitButton';
import { glyphCreateParams } from '~/features/glyphs/validators/params';
import GlyphCanvasSuspense from '~/features/kage/components/GlyphCanvasSuspense';
import KageData from '~/features/kage/components/KageData';
import type useMatchesData from '~/hooks/useMatchesData';
import { type loader } from '~/routes/glyphwiki';
import { type UnionSelect } from '~/utils/types';

type GlyphResultProps = {
  q: string;
  glyph: UnionSelect<ReturnType<typeof useMatchesData<typeof loader>>, 'glyphs'>['glyphs'][number];
  buhin: Buhin;
};

const GlyphResult = ({ q, glyph, buhin }: GlyphResultProps) => (
  <HStack w="full">
    <GlyphCanvasSuspense name={glyph.name} buhin={buhin} />
    <VStack align="start">
      <HStack>
        <VStack align="start">
          <Text fontSize="sm">なまえ：</Text>
          <ClipboardCopyButton text={glyph.name} />
        </VStack>
        <Text fontSize="sm" m={4}>
          {glyph.name}
        </Text>
      </HStack>
      <Divider />
      <HStack>
        <VStack align="start">
          <Text fontSize="sm">影算料：</Text>
          <ClipboardCopyButton text={glyph.data ?? ''} />
        </VStack>
        <KageData data={glyph.data ?? ''} color={glyph.info.type === 'WithDifference' ? 'red' : undefined} />
      </HStack>
      {glyph.info.state === 'NotImplementation' && glyph.data && (
        <ValidatedForm
          method="post"
          validator={glyphCreateParams}
          defaultValues={{ name: glyph.name, data: glyph.data, q }}
          subaction="from-glyphwiki"
        >
          <HiddenInput name="name" />
          <HiddenInput name="data" />
          <HiddenInput name="q" />
          <SubmitButton size="sm" isDisabled={glyph.info.type === 'ShortageParts'}>
            登録する
          </SubmitButton>
        </ValidatedForm>
      )}
    </VStack>
  </HStack>
);

export default GlyphResult;
