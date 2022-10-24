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
} & Omit<TextareaProps, 'value' | 'defaulValue' | 'onChange'>;

const KageTextArea = ({ name, onDataChange, ...otherProps }: KageTextAreaProps) => {
  const { getInputProps, validate } = useField(name);
  const [data, setData] = useControlField<string>(name);
  const fetcher = useFetcher<DrawableGlyph>();
  const handleChange = useDebouncedCallback((data: string) => {
    if (data) {
      fetcher.submit({ data }, { action: $path('/glyphs/preview') });
      // 必要なタイミングが謎
      validate();
    } else {
      onDataChange({ name: 'preview', data: null, drawNecessaryGlyphs: [] });
    }
  }, PREVIEW_WAIT);

  useEffect(() => {
    if (fetcher.type === 'done') {
      onDataChange(fetcher.data);
    }
  }, [fetcher, onDataChange]);

  useEffect(() => {
    handleChange(data);
  }, [data, handleChange, validate]);

  return (
    <Textarea
      {...omit(
        getInputProps<TextareaProps>({
          id: name,
          onChange: ({ target }) => setData(target.value),
          ...otherProps,
        }),
        'defaultValue',
      )}
      value={data}
    />
  );
};

export default KageTextArea;
