import { HStack, Icon, VStack } from '@chakra-ui/react';
import { type MetaFunction } from '@remix-run/node';
import { MdOutlineFontDownload } from 'react-icons/md';
import { ValidatedForm } from 'remix-validated-form';
import FormControl from '~/components/FormControl';
import GlyphCanvasSuspense from '~/components/GlyphCanvasSuspense';
import Page from '~/components/Page';
import SubmitButton from '~/components/SubmitButton';
import TextArea from '~/components/TextArea';
import TextInput from '~/components/TextInput';
import { glyphCreateParams } from '~/features/glyphs/validators/params';

export const meta: MetaFunction = () => ({
  title: '新日本語｜グリフ作成',
});

const Index = () => {
  return (
    <Page avatar={<Icon fontSize={24} as={MdOutlineFontDownload} />} title="グリフ作成">
      <HStack p={8} gap={8} align="top">
        <VStack align="start">
          <GlyphCanvasSuspense />
          <ValidatedForm method="post" validator={glyphCreateParams}>
            <VStack align="start">
              <FormControl name="name" label="なまえ" isRequired>
                <TextInput name="name" />
              </FormControl>
              <FormControl name="data" label="影算料" isRequired>
                <TextArea name="data" />
              </FormControl>
              <SubmitButton>作成する</SubmitButton>
            </VStack>
          </ValidatedForm>
        </VStack>
      </HStack>
    </Page>
  );
};

export default Index;
