import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import BrushIcon from '@material-ui/icons/Brush';
import { Buhin } from '@kurgm/kage-engine';
import { GlyphForm } from '@sin-nihongo/api-interfaces';
import { CardHeader } from '../../components/CardHeader';
import { FormTextField } from '../../components/FormTextField';
import { GlyphCanvas } from '../../components/GlyphCanvas';
import { IconButton } from '../../components/IconButton';
import { SubmitButton } from '../../components/SubmitButton';
import { GlyphCreateForm } from './GlyphCreateForm';

const resolver = classValidatorResolver(GlyphForm);

export const GlyphCreate: React.FC = () => {
  const methods = useForm({ resolver, defaultValues: { name: '', data: '' } });
  const [buhin, setBuhin] = useState(new Buhin());

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
          <GlyphCreateForm>
            <Box display="flex" flexDirection="column">
              <FormTextField name="name" label="グリフ名" />
              <FormTextField name="data" label="KAGEデータ" multiline />
              <SubmitButton text="登録する" />
            </Box>
          </GlyphCreateForm>
        </FormProvider>
      </CardContent>
    </Card>
  );
};
