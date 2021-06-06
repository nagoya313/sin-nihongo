import React, { useState } from 'react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
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
  const methods = useForm({ resolver, defaultValues: { name: '', data: '' } });
  const [buhin, setBuhin] = useState(new Buhin());

  const onSubmit = (data: CreateGlyph) => alert(JSON.stringify(data));

  const onDraw = () => {
    const data = methods.getValues('data');
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
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            <Box display="flex" flexDirection="column">
              <FormTextField name="name" label="グリフ名" />
              <FormTextField name="data" label="KAGEデータ" multiline />
              <SubmitButton text="登録する" />
            </Box>
          </Form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};
