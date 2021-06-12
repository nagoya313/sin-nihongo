import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Buhin } from '@kurgm/kage-engine';
import { PostGlyphParamsBody } from '@sin-nihongo/sin-nihongo-params';
import { FlexBox } from '../../components/Box';
import { IconButton } from '../../components/Button';
import { Card, CardContent, CardHeader } from '../../components/Card';
import { FormTextField } from '../../components/FormTextField';
import { ContainerGrid, ItemGrid } from '../../components/Grid';
import { GlyphCanvas } from '../../components/GlyphCanvas';
import { SubmitButton } from '../../components/FormButton';
import { BrushIcon } from '../../components/Icons';
import { GlyphCreateForm } from './GlyphCreateForm';
import { Glyphwiki } from '../glyphwiki/Glyphwiki';
import { EdiableProvider } from '../../providers/Editable';
import { BuhinProvider } from '../../providers/Buhin';

const resolver = classValidatorResolver(PostGlyphParamsBody);

export const GlyphCreate: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostGlyphParamsBody>({ resolver, defaultValues: { name: '', data: '' } });
  const [buhin, setBuhin] = useState(new Buhin());

  const onDraw = () => {
    /*const data = getValues('data');
    const b = new Buhin();
    b.push('preview', data);
    setBuhin(b);*/
  };

  return (
    <ContainerGrid>
      <ItemGrid xs={4}>
        <Card>
          <CardHeader avatarText="グ" title="グリフ新規作成" />
          <CardContent>
            <FlexBox alignItems="flex-end">
              <GlyphCanvas name="preview" />
              <IconButton onClick={onDraw} icon={<BrushIcon />} />
            </FlexBox>
            <GlyphCreateForm handleSubmit={handleSubmit}>
              <FlexBox flexDirection="column">
                <FormTextField register={register} errors={errors} name="name" label="グリフ名" />
                <FormTextField register={register} errors={errors} name="data" label="KAGEデータ" multiline />
                <SubmitButton text="登録する" />
              </FlexBox>
            </GlyphCreateForm>
          </CardContent>
        </Card>
      </ItemGrid>
      <ItemGrid xs={8}>
        <EdiableProvider>
          <BuhinProvider>
            <Glyphwiki />
          </BuhinProvider>
        </EdiableProvider>
      </ItemGrid>
    </ContainerGrid>
  );
};
