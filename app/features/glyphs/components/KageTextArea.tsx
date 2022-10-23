import { Textarea, type TextareaProps } from '@chakra-ui/react';
import { useFetcher } from '@remix-run/react';
import omit from 'lodash/omit';
import { useEffect } from 'react';
import { $path } from 'remix-routes';
import { useControlField, useField } from 'remix-validated-form';
import { useDebouncedCallback } from 'use-debounce';
import { type DrawableGlyph } from '~/features/kage/models/kageData';

const PREVIEW_WAIT = 500;

type KageTextAreaProps = {
  name: string;
  onDataChange: (data: DrawableGlyph) => void;
  isReadOnly?: boolean;
};

const KageTextArea = ({ name, onDataChange, isReadOnly }: KageTextAreaProps) => {
  const { getInputProps } = useField(name);
  const [data, setData] = useControlField<string>(name);
  const fetcher = useFetcher();
  const handleChange = useDebouncedCallback((data: string) => {
    if (data) {
      fetcher.submit({ data }, { action: $path('/glyphs/preview') });
    }
  }, PREVIEW_WAIT);

  useEffect(() => {
    if (fetcher.type === 'done') {
      onDataChange(fetcher.data);
    }
  }, [fetcher, onDataChange]);

  useEffect(() => {
    handleChange(data);
  }, [data, handleChange]);

  return (
    <Textarea
      {...omit(
        getInputProps<TextareaProps>({ id: name, isReadOnly, onChange: ({ target }) => setData(target.value) }),
        'defaultValue',
      )}
      value={data}
    />
  );
};

export default KageTextArea;
