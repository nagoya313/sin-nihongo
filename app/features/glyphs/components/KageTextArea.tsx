import { Textarea, type TextareaProps } from '@chakra-ui/react';
import { useFetcher } from '@remix-run/react';
import { useEffect } from 'react';
import { $path } from 'remix-routes';
import { useControlField, useField } from 'remix-validated-form';
import { useDebouncedCallback } from 'use-debounce';
import { type loader } from '~/routes/glyphs/preview';
import { type LoaderData } from '~/utils/types';

const PREVIEW_WAIT = 500;

type KageTextAreaProps = {
  name: string;
  onDataChange: (data: LoaderData<typeof loader>) => void;
};

const KageTextArea = ({ name, onDataChange }: KageTextAreaProps) => {
  const { getInputProps } = useField(name);
  const [, setData] = useControlField<string>(name);
  const fetcher = useFetcher();
  const handleChange = useDebouncedCallback(async (data: string) => {
    if (data) {
      fetcher.submit({ data }, { action: $path('/glyphs/preview') });
    }
    setData(data);
  }, PREVIEW_WAIT);

  useEffect(() => {
    if (fetcher.type === 'done') {
      onDataChange(fetcher.data);
    }
  }, [fetcher, onDataChange]);

  return (
    <Textarea {...getInputProps<TextareaProps>({ id: name, onChange: ({ target }) => handleChange(target.value) })} />
  );
};

export default KageTextArea;
