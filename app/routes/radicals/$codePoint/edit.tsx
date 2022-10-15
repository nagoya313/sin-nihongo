import { Button, FormLabel, HStack, IconButton, useToast, VStack } from '@chakra-ui/react';
import { redirect, type ActionArgs, type MetaFunction } from '@remix-run/node';
import { useActionData, useParams } from '@remix-run/react';
import { useEffect } from 'react';
import { MdClear } from 'react-icons/md';
import { $params, $path } from 'remix-routes';
import { useControlField, useFormContext, ValidatedForm, validationError } from 'remix-validated-form';
import Page from '~/components/Page';
import ReadFormControl from '~/components/ReadFormControl';
import TextInput from '~/components/TextInput';
import { RADICAL_EDIT_FORM_ID } from '~/features/radicals/constants';
import { radicalUpdateParams } from '~/features/radicals/validators/params';
import useMatchesData from '~/hooks/useMatchesData';
import { type loader } from '../$codePoint';

export const meta: MetaFunction = ({ params }) => ({
  title: `新日本語｜部首編集「${String.fromCodePoint(parseInt($params('/radicals/:codePoint', params).codePoint))}」`,
});

export const action = async ({ request, params }: ActionArgs) => {
  const data = await radicalUpdateParams.validate(await request.formData());
  if (data.error) return validationError(data.error);
  const { codePoint } = $params('/radicals/:codePoint', params);
  return redirect($path('/radicals/:codePoint', { codePoint }));
};

const Edit = () => {
  const { codePoint } = $params('/radicals/:codePoint', useParams());
  const { radical } = useMatchesData<typeof loader>($path('/radicals/:codePoint', { codePoint }));
  const { isValid, isSubmitting } = useFormContext(RADICAL_EDIT_FORM_ID);
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
            <ReadFormControl key={index} name={`reads[${index}]`} isRequired={index === 0}>
              {index === 0 && <FormLabel>よみかた</FormLabel>}
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
            </ReadFormControl>
          ))}
          <Button type="submit" isDisabled={!isValid || isSubmitting} colorScheme="purple">
            更新する
          </Button>
        </VStack>
      </ValidatedForm>
    </Page>
  );
};

export default Edit;
