import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { Buhin } from '@kurgm/kage-engine';
import { Glyph, GlyphwikiQueryParams } from '@sin-nihongo/api-interfaces';
import { CardHeader } from '../../components/CardHeader';
import { Form } from '../../components/Form';
import { FormTextField } from '../../components/FormTextField';
import { NewTabLink } from '../../components/NewTabLink';
import { ResponseNotice } from '../../components/ResponseNotice';
import { SubText } from '../../components/SubText';
import { Text } from '../../components/Text';
import { useAxiosGet } from '../../utils/axios';
import { glyphToBuhin } from '../../utils/kageData';
import { GlyphwikiContent } from './GlyphwikiContent';

const resolver = classValidatorResolver(GlyphwikiQueryParams);
const initialWord = '一';

type Props = {
  isEditable?: boolean;
};

export const Glyphwiki: React.FC<Props> = ({ isEditable }) => {
  const methods = useForm<GlyphwikiQueryParams>({ resolver, defaultValues: { q: initialWord } });
  const [searchWord, setSearchWord] = useState(initialWord);
  const [{ data, loading, error }] = useAxiosGet<Glyph>('api/v1/glyphwiki', {
    params: { q: searchWord },
  });
  const [buhin, setBuhin] = useState(new Buhin());

  const onSubmit = (data: GlyphwikiQueryParams) => setSearchWord(data.q);

  useEffect(() => {
    data && setBuhin(glyphToBuhin(data));
  }, [data]);

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
            <FormTextField name="q" label="漢字・USC・グリフ名" type="search" helperText="例：一、u4e00、aj1-10186" />
          </Form>
        </FormProvider>
        <Divider />
        <ResponseNotice loading={loading} error={error} />
        {data && (
          <React.Fragment>
            <GlyphwikiContent isEditable={isEditable} name={data.name} data={data.data} buhin={buhin} />
            <SubText>参照グリフ</SubText>
            {data.includeGlyphs?.map((glyph) => (
              <GlyphwikiContent
                key={glyph.name}
                isEditable={isEditable}
                name={glyph.name}
                data={glyph.data}
                buhin={buhin}
              />
            ))}
          </React.Fragment>
        )}
      </CardContent>
    </Card>
  );
};
