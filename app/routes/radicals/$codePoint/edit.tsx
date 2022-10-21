import { HStack, IconButton, VStack } from '@chakra-ui/react';
import { type ActionArgs, type LoaderArgs, type MetaFunction, json } from '@remix-run/node';
import { useParams } from '@remix-run/react';
import { MdClear } from 'react-icons/md';
import { $params, $path } from 'remix-routes';
import { ValidatedForm, useControlField } from 'remix-validated-form';
import FormControl from '~/components/FormControl';
import NumberInput from '~/components/NumberInput';
import Page from '~/components/Page';
import SubmitButton from '~/components/SubmitButton';
import TextInput from '~/components/TextInput';
import { RADICAL_EDIT_FORM_ID } from '~/features/radicals/constants';
import { update } from '~/features/radicals/services.server';
import { radicalUpdateParams } from '~/features/radicals/validators';
import useMatchesData from '~/hooks/useMatchesData';
import { actions, authGuard } from '~/utils/request.server';
import { type loader as baseLoader } from '../$codePoint';

export const meta: MetaFunction = () => ({ title: '新日本語｜部首編集' });
export const loader = (args: LoaderArgs) => authGuard(args, () => json({}));
export const action = (args: ActionArgs) => authGuard(args, actions({ PATCH: update }));

const Edit = () => {
  const { codePoint } = $params('/radicals/:codePoint', useParams());
  const radical = useMatchesData<typeof baseLoader>($path('/radicals/:codePoint', { codePoint }))!;
  const [reads, setReads] = useControlField<string[]>('reads', RADICAL_EDIT_FORM_ID);

  return (
    <Page avatar={radical.radical} title="部首編集">
      <ValidatedForm
        id={RADICAL_EDIT_FORM_ID}
        method="patch"
        validator={radicalUpdateParams}
        defaultValues={{ strokeCount: radical.stroke_count, reads: radical.reads }}
      >
        <VStack p={8} align="start">
          <FormControl name="strokeCount" label="画数" isRequired>
            <NumberInput name="strokeCount" min={1} max={100} />
          </FormControl>
          {reads?.map((_, index) => (
            <FormControl
              key={index}
              name={`reads[${index}]`}
              label={index === 0 ? 'よみかた' : undefined}
              isRequired={index === 0}
            >
              <HStack>
                <TextInput name={`reads[${index}]`} />
                <IconButton
                  aria-label="read-clear"
                  icon={<MdClear />}
                  onClick={() => {
                    const next = [...reads];
                    next.splice(index, 1);
                    setReads(next);
                  }}
                  isDisabled={reads.length === 1}
                />
              </HStack>
            </FormControl>
          ))}
          <SubmitButton>更新する</SubmitButton>
        </VStack>
      </ValidatedForm>
    </Page>
  );
};

export default Edit;
