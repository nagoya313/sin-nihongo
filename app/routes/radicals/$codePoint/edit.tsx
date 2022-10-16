import { HStack, IconButton, useToast, VStack } from '@chakra-ui/react';
import { redirect, type ActionArgs, type MetaFunction } from '@remix-run/node';
import { useActionData, useParams } from '@remix-run/react';
import { useEffect } from 'react';
import { MdClear } from 'react-icons/md';
import { $params, $path } from 'remix-routes';
import { useControlField, ValidatedForm } from 'remix-validated-form';
import FormControl from '~/components/FormControl';
import Page from '~/components/Page';
import SubmitButton from '~/components/SubmitButton';
import TextInput from '~/components/TextInput';
import { RADICAL_EDIT_FORM_ID } from '~/features/radicals/constants';
import { radicalUpdateParams } from '~/features/radicals/validators/params';
import useMatchesData from '~/hooks/useMatchesData';
import { authGuard, checkedFormData } from '~/utils/request.server';
import { type loader } from '../$codePoint';

export const meta: MetaFunction = ({ params }) => ({
  title: `新日本語｜部首編集「${String.fromCodePoint(parseInt($params('/radicals/:codePoint', params).codePoint))}」`,
});

export const action = async ({ request, params }: ActionArgs) => {
  await authGuard(request);
  await checkedFormData(request, radicalUpdateParams);
  const { codePoint } = $params('/radicals/:codePoint', params);
  return redirect($path('/radicals/:codePoint', { codePoint }));
};

const Edit = () => {
  const { codePoint } = $params('/radicals/:codePoint', useParams());
  const { radical } = useMatchesData<typeof loader>($path('/radicals/:codePoint', { codePoint }));
  const [reads, setReads] = useControlField<string[]>('reads', RADICAL_EDIT_FORM_ID);
  const data = useActionData<typeof action>();
  const toast = useToast();

  useEffect(() => {
    if (data != null) {
      toast({ title: '部首更新エラー', status: 'error' });
    }
  }, [data]);

  return (
    <Page avatar={radical.radical} title="部首編集">
      <ValidatedForm
        id={RADICAL_EDIT_FORM_ID}
        method="patch"
        validator={radicalUpdateParams}
        defaultValues={{ reads: radical.reads }}
      >
        <VStack p={8} align="start">
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
