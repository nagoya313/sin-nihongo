import { VStack } from '@chakra-ui/react';
import { type ActionArgs, type LoaderArgs, type MetaFunction, json } from '@remix-run/node';
import { useParams } from '@remix-run/react';
import { $params, $path } from 'remix-routes';
import { ValidatedForm } from 'remix-validated-form';
import FormControl from '~/components/FormControl';
import NumberInput from '~/components/NumberInput';
import Page from '~/components/Page';
import ReadsInput from '~/components/ReadsInput';
import SubmitButton from '~/components/SubmitButton';
import { update } from '~/features/radicals/services.server';
import { radicalUpdateParams } from '~/features/radicals/validators';
import useMatchesData from '~/hooks/useMatchesData';
import { actions, authGuard } from '~/utils/request.server';
import { type loader as baseLoader } from '../$code_point';

export const meta: MetaFunction = () => ({ title: '新日本語｜部首編集' });
export const loader = (args: LoaderArgs) => authGuard(args, () => json({}));
export const action = (args: ActionArgs) => authGuard(args, actions({ PATCH: update }));

const Edit = () => {
  const { code_point } = $params('/radicals/:code_point', useParams());
  const { radical, stroke_count, reads } = useMatchesData<typeof baseLoader>(
    $path('/radicals/:code_point', { code_point }),
  )!;

  return (
    <Page avatar={radical} title="部首編集">
      <ValidatedForm method="patch" validator={radicalUpdateParams} defaultValues={{ stroke_count, reads }}>
        <VStack p={8} align="start">
          <FormControl name="stroke_count" label="画数" isRequired>
            <NumberInput name="stroke_count" min={1} max={100} />
          </FormControl>
          <ReadsInput />
          <SubmitButton>更新する</SubmitButton>
        </VStack>
      </ValidatedForm>
    </Page>
  );
};

export default Edit;
