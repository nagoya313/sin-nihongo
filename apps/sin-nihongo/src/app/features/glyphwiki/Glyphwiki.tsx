import React, { useContext, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { Glyph, GlyphwikiQueryParams, GlyphwikiHealth } from '@sin-nihongo/api-interfaces';
import { BuhinDispatchContext } from '../../providers/Buhin';
import { CardHeader } from '../../components/CardHeader';
import { ErrorTypography } from '../../components/ErrorTypography';
import { Form } from '../../components/Form';
import { FormTextField } from '../../components/FormTextField';
import { NewTabLink } from '../../components/NewTabLink';
import { ResponseNotice } from '../../components/ResponseNotice';
import { SubText } from '../../components/SubText';
import { Text } from '../../components/Text';
import { useAxiosGet } from '../../utils/axios';
import { GlyphwikiContent } from './GlyphwikiContent';

const resolver = classValidatorResolver(GlyphwikiQueryParams);

type ResponseType = Glyph | GlyphwikiHealth;

const isGlyph = (response: ResponseType | undefined): response is Glyph => (response && 'name' in response) || false;
const isGlyphwikiHealth = (response: ResponseType | undefined): response is GlyphwikiHealth =>
  (response && 'accessible' in response) || false;

type Props = {
  isEditable?: boolean;
};

export const Glyphwiki: React.FC<Props> = ({ isEditable }) => {
  const methods = useForm<GlyphwikiQueryParams>({ resolver, defaultValues: { q: '' } });
  const [searchWord, setSearchWord] = useState('');
  const [accessible, setAccessible] = useState(false);
  const [{ data, loading, error }] = useAxiosGet<ResponseType>(
    searchWord === '' ? 'api/v1/glyphwiki/health' : 'api/v1/glyphwiki',
    searchWord === '' ? {} : { params: { q: searchWord } }
  );
  const buhinDispatch = useContext(BuhinDispatchContext);

  const onSubmit = (data: GlyphwikiQueryParams) => setSearchWord(data.q);

  useEffect(() => {
    isGlyph(data) && buhinDispatch({ type: 'setGlyph', glyph: data });
    isGlyphwikiHealth(data) && setAccessible(data.accessible);
  }, [data, buhinDispatch]);

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
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
            <FormTextField
              name="q"
              disabled={!accessible}
              label="漢字・USC・グリフ名"
              type="search"
              helperText="例：一、u4e00、aj1-10186"
            />
          </Form>
        </FormProvider>
        <Divider />
        <ResponseNotice loading={loading} error={error} />
        {isGlyphwikiHealth(data) && !data.accessible && (
          <ErrorTypography>グリフウィキわ現在利用不能です。</ErrorTypography>
        )}
        {isGlyph(data) && (
          <React.Fragment>
            <GlyphwikiContent isEditable={isEditable} name={data.name} data={data.data} />
            <SubText>参照グリフ</SubText>
            {data.includeGlyphs?.map((glyph) => (
              <GlyphwikiContent key={glyph.name} isEditable={isEditable} name={glyph.name} data={glyph.data} />
            ))}
          </React.Fragment>
        )}
      </CardContent>
    </Card>
  );
};
