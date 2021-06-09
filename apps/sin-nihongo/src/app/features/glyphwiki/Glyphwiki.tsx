import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { GlyphwikiSearchParams, GlyphwikiHealthResponse } from '@sin-nihongo/api-interfaces';
import { CardHeader } from '../../components/CardHeader';
import { ErrorTypography } from '../../components/ErrorTypography';
import { Form } from '../../components/Form';
import { FormTextField } from '../../components/FormTextField';
import { NewTabLink } from '../../components/NewTabLink';
import { Text } from '../../components/Text';
import { useAxiosGet } from '../../utils/axios';
import { GlyphwikiSearch } from './GlyphwikiSearch';

const resolver = classValidatorResolver(GlyphwikiSearchParams);

export const Glyphwiki: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isValidating, isValid, errors },
  } = useForm<GlyphwikiSearchParams>({ mode: 'onChange', resolver, defaultValues: { q: '' } });
  const [searchWord, setSearchWord] = useState('');
  const [{ data }] = useAxiosGet<GlyphwikiHealthResponse>('api/v1/glyphwiki/health');

  const onSubmit = (data: GlyphwikiSearchParams) => setSearchWord(data.q);

  useEffect(() => {
    !isValidating && isValid && handleSubmit(onSubmit)();
  }, [isValidating, isValid]);

  return (
    <Card>
      <CardHeader avatarText="字" title="グリフウィキ検索" />
      <CardContent>
        <Text>
          <NewTabLink
            url="https://glyphwiki.org/wiki/GlyphWiki:%e3%83%a1%e3%82%a4%e3%83%b3%e3%83%9a%e3%83%bc%e3%82%b8"
            text="グリフウィキ"
          />
          からグリフお検索します。漢字一文字或いわグリフウィキのグリフ名から検索できます。
        </Text>
        <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <FormTextField
            register={register}
            errors={errors}
            name="q"
            disabled={!data?.accessible}
            label="漢字・USC・グリフ名"
            type="search"
            helperText="例：一、u4e00、aj1-10186"
          />
        </Form>
        <Divider />
        {data &&
          (data.accessible ? (
            searchWord && <GlyphwikiSearch name={searchWord} />
          ) : (
            <ErrorTypography>グリフウィキわ現在利用不能です。</ErrorTypography>
          ))}
      </CardContent>
    </Card>
  );
};
