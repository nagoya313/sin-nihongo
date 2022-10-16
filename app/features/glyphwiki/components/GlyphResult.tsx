import { Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { type Buhin } from '@kurgm/kage-engine';
import { ValidatedForm } from 'remix-validated-form';
import ClipboardCopyButton from '~/components/ClipboardCopyButton';
import GlyphCanvasSuspense from '~/components/GlyphCanvasSuspense';
import HiddenInput from '~/components/HiddenInput';
import KageData from '~/components/KageData';
import SubmitButton from '~/components/SubmitButton';
import { glyphCreateParams } from '~/features/glyphs/validators/params';

type GlyphResultProps = {
  name: string;
  buhin: Buhin;
};

const GlyphResult = ({ name, buhin }: GlyphResultProps) => {
  const data = buhin.search(name);

  return (
    <HStack w="full">
      <GlyphCanvasSuspense name={name} buhin={buhin} />
      <VStack align="start">
        <HStack>
          <VStack align="start">
            <Text fontSize="sm">なまえ：</Text>
            <ClipboardCopyButton text={name} />
          </VStack>
          <Text fontSize="sm" m={4}>
            {name}
          </Text>
        </HStack>
        <Divider />
        <HStack>
          <VStack align="start">
            <Text fontSize="sm">影算料：</Text>
            <ClipboardCopyButton text={data} />
          </VStack>
          <KageData data={data} />
        </HStack>
        <ValidatedForm
          method="post"
          validator={glyphCreateParams}
          defaultValues={{ name, data }}
          subaction="from-glyphwiki"
        >
          <HiddenInput name="name" />
          <HiddenInput name="data" />
          <SubmitButton size="sm">登録する</SubmitButton>
        </ValidatedForm>
      </VStack>
    </HStack>
  );
};

export default GlyphResult;
