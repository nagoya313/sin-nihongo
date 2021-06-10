import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { apiRoutes } from '@sin-nihongo/api-interfaces';
import { CardHeader } from '../../components/CardHeader';
import { ErrorTypography } from '../../components/ErrorTypography';
import { NewTabLink } from '../../components/NewTabLink';
import { Text } from '../../components/Text';
import { useFetch } from '../../utils/axios';
import { GlyphwikiSearch } from './GlyphwikiSearch';
import { SearchForm } from './SearchForm';

export const Glyphwiki: React.FC = () => {
  const [searchWord, setSearchWord] = useState('');
  const [{ data }] = useFetch(apiRoutes.getGlyphwikiHealth);

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
        <SearchForm disabled={!data?.accessible} setSearchWord={setSearchWord} />
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
