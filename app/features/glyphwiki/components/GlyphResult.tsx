import { Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { type Buhin } from '@kurgm/kage-engine';
import { ValidatedForm } from 'remix-validated-form';
import HiddenInput from '~/components/HiddenInput';
import SubmitButton from '~/components/SubmitButton';
import { glyphCreateParams } from '~/features/glyphs/validators';
import GlyphCanvas from '~/features/kage/components/GlyphCanvas';
import KageData from '~/features/kage/components/KageData';
import { type loader } from '~/routes/glyphwiki';
import { type LoaderData, type UnionSelect } from '~/utils/types';
import KageElement from './KageElement';

type GlyphResultProps = {
  q: string;
  glyph: UnionSelect<LoaderData<typeof loader>, 'glyphs'>['glyphs'][number];
  buhin: Buhin;
};

const GlyphResult = ({ q, glyph, buhin }: GlyphResultProps) => (
  <HStack w="full">
    <GlyphCanvas name={glyph.name} buhin={buhin} />
    <VStack align="start">
      <KageElement
        label="なまえ"
        text={glyph.name}
        data={
          <Text fontSize="sm" m={4}>
            {glyph.name}
          </Text>
        }
      />
      <Divider />
      <KageElement
        label="影算料"
        text={glyph.data ?? ''}
        data={<KageData data={glyph.data} color={glyph.info.type === 'WithDifference' ? 'red' : undefined} />}
      />
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
