import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { ErrorMessage } from '@hookform/error-message';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import BrushIcon from '@material-ui/icons/Brush';
import { Buhin } from '@kurgm/kage-engine';
import { CreateGlyph } from '@sin-nihongo/api-interfaces';
import { CardAvatar } from '../../components/CardAvatar';
import { GlyphCanvas } from '../../components/GlyphCanvas';
import { Form } from '../../components/Form';

const FormTextField = styled(TextField)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const FormButton = styled(Button)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const resolver = classValidatorResolver(CreateGlyph);

export const GlyphCreate: React.FC = () => {
  const {
    register,
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
      <CardHeader
        avatar={<CardAvatar>グ</CardAvatar>}
        title="グリフ新規作成"
        titleTypographyProps={{ variant: 'h4' }}
      />
      <CardContent>
        <Box display="flex" alignItems="flex-end">
          <GlyphCanvas buhin={buhin} name="preview" />
          <IconButton onClick={onDraw}>
            <BrushIcon />
          </IconButton>
        </Box>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ width: 400, display: 'flex', flexDirection: 'column' }}>
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
            <FormButton variant="contained" color="secondary" type="submit">
              登録する
            </FormButton>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};
