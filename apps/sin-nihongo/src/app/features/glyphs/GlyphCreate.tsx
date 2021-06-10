import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import BrushIcon from '@material-ui/icons/Brush';
import { Buhin } from '@kurgm/kage-engine';
import { PostGlyphParamsBody } from '@sin-nihongo/sin-nihongo-params';
import { CardHeader } from '../../components/CardHeader';
import { FormTextField } from '../../components/FormTextField';
import { GlyphCanvas } from '../../components/GlyphCanvas';
import { IconButton } from '../../components/IconButton';
import { SubmitButton } from '../../components/FormButton';
import { GlyphCreateForm } from './GlyphCreateForm';
import { Glyphwiki } from '../glyphwiki/Glyphwiki';
import { EdiableProvider } from '../../providers/Editable';
import { BuhinProvider } from '../../providers/Buhin';

const resolver = classValidatorResolver(PostGlyphParamsBody);

const StyledGrid = styled(Grid)`
  flex-grow: 1;
`;

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
    <StyledGrid container spacing={2}>
      <Grid item xs={4}>
        <Card>
          <CardHeader avatarText="グ" title="グリフ新規作成" />
          <CardContent>
            <Box display="flex" alignItems="flex-end">
              <GlyphCanvas name="preview" />
              <IconButton onClick={onDraw} icon={<BrushIcon />} />
            </Box>
            <GlyphCreateForm handleSubmit={handleSubmit}>
              <Box display="flex" flexDirection="column">
                <FormTextField register={register} errors={errors} name="name" label="グリフ名" />
                <FormTextField register={register} errors={errors} name="data" label="KAGEデータ" multiline />
                <SubmitButton text="登録する" />
              </Box>
            </GlyphCreateForm>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={8}>
        <EdiableProvider>
          <BuhinProvider>
            <Glyphwiki />
          </BuhinProvider>
        </EdiableProvider>
      </Grid>
    </StyledGrid>
  );
};
