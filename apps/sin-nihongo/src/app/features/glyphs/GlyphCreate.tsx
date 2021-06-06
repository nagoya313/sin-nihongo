import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { ErrorMessage } from '@hookform/error-message';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import BrushIcon from '@material-ui/icons/Brush';
import { Buhin } from '@kurgm/kage-engine';
import { CreateGlyph } from '@sin-nihongo/api-interfaces';
import { CardHeader } from '../../components/CardHeader';
import { FormTextField } from '../../components/FormTextField';
import { GlyphCanvas } from '../../components/GlyphCanvas';
import { IconButton } from '../../components/IconButton';
import { SubmitButton } from '../../components/SubmitButton';
import { Form } from '../../components/Form';

const resolver = classValidatorResolver(CreateGlyph);

export const GlyphCreate: React.FC = () => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CreateGlyph>({ mode: 'onBlur', resolver });
  const [buhin, setBuhin] = useState(new Buhin());

  const onSubmit = (data) => alert(JSON.stringify(data));

  const onDraw = () => {
    const data = getValues('data');
    const b = new Buhin();
    b.push('preview', data);
    setBuhin(b);
  };

  return (
    <Card>
      <CardHeader avatarText="グ" title="グリフ新規作成" />
      <CardContent>
        <Box display="flex" alignItems="flex-end">
          <GlyphCanvas buhin={buhin} name="preview" />
          <IconButton onClick={onDraw} icon={<BrushIcon />} />
        </Box>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column">
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormTextField
                  label="グリフ名"
                  {...field}
                  error={errors.name != null}
                  helperText={<ErrorMessage errors={errors} name="name" />}
                />
              )}
            />
            <ErrorMessage errors={errors} name="name" />
            <Controller
              name="data"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormTextField
                  label="KAGEデータ"
                  multiline
                  {...field}
                  error={errors.data != null}
                  helperText={<ErrorMessage errors={errors} name="data" />}
                />
              )}
            />
            <SubmitButton text="登録する" />
          </Box>
        </Form>
      </CardContent>
    </Card>
  );
};
