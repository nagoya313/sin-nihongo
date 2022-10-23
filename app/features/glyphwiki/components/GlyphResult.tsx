import { Divider, HStack, VStack } from '@chakra-ui/react';
import { type Buhin } from '@kurgm/kage-engine';
import { ValidatedForm } from 'remix-validated-form';
import HiddenInput from '~/components/HiddenInput';
import SubmitButton from '~/components/SubmitButton';
import { glyphCreateParams } from '~/features/glyphs/validators';
import GlyphCanvas from '~/features/kage/components/GlyphCanvas';
import KageElement from '~/features/kage/components/KageElement';
import { toDisplayKageData } from '~/features/kage/decorators';
import { type loader } from '~/routes/glyphwiki';
import { type LoaderData, type UnionSelect } from '~/utils/types';

type GlyphResultProps = {
  q: string;
  glyph: UnionSelect<LoaderData<typeof loader>, 'glyphs'>['glyphs'][number];
  buhin: Buhin;
};

const GlyphResult = ({ q, glyph, buhin }: GlyphResultProps) => (
  <HStack w="full">
    <GlyphCanvas name={glyph.name} buhin={buhin} />
    <VStack align="start">
      <KageElement label="なまえ" data={glyph.name} />
      <Divider />
      <KageElement
        label="影算料"
        data={toDisplayKageData(glyph.data)}
        copyText={glyph.data ?? ''}
        color={glyph.info.type === 'WithDifference' ? 'red' : undefined}
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
