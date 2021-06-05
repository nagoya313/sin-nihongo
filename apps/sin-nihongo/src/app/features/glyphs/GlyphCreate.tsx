import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import { Buhin } from '@kurgm/kage-engine';
import { CardAvatar } from '../../components/CardAvatar';
import { GlyphCanvas } from '../../components/GlyphCanvas';
import { Form } from '../../components/Form';

export const GlyphCreate: React.FC = () => {
  const { register, control, handleSubmit } = useForm();
  const [buhin, setBuhin] = useState(new Buhin());

  const onSubmit = (data) => alert(JSON.stringify(data));

  return (
    <Card>
      <CardHeader
        avatar={<CardAvatar>グ</CardAvatar>}
        title="グリフ新規作成"
        titleTypographyProps={{ variant: 'h4' }}
      />
      <CardContent>
        <GlyphCanvas buhin={buhin} name="preview" />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField label="グリフ名" {...field} />}
          />
          <Button variant="contained" color="secondary" type="submit">
            登録する
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
};
