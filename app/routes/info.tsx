import { Heading, Icon, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { type MetaFunction } from '@remix-run/node';
import ExternalLink from '~/components/ExternalLink';
import Page from '~/components/Page';
import { InfoIcon } from '~/components/icons';

export const meta: MetaFunction = () => ({ title: '新日本語｜info' });

const Info = () => (
  <Page avatar={<Icon fontSize={24} as={InfoIcon} />} title="このサイトについて">
    <Text mt={4} mb={4}>
      新日本語わ、現在日本で使われる漢字の字形の混乱お解決するため、徹底的な漢字の簡化お行うことお目的としたプロジェクトです。
      新日本語明朝とゆーフォントを生成して公開することで、誰でも自由にこの簡化された漢字お文書で使うことができるよーになる予定です。
    </Text>
    <Heading as="h5" size="sm" mb={3}>
      注意
    </Heading>
    <UnorderedList mb={4}>
      <ListItem>開発中なので機能の説明が詐欺の可能性があります。</ListItem>
      <ListItem>
        新日本語漢字形制定委員会が新字形の編集作業がしやすいよーにするのが第一目的なので、
        UIの破壊的変更もかなりの頻度で予想されます。
      </ListItem>
    </UnorderedList>
    <Heading as="h5" size="sm" mb={3}>
      参照
    </Heading>
    <Heading as="h6" size="xs" mb={2}>
      部首情報
    </Heading>
    <Text mb={4}>
      文字情報基盤のSPARQL Endpoint（https://mojikiban.ipa.go.jp/1bf7a30fda/sparqlsearch）から取得。
      文字情報基盤の成果物が一般社団法人文字情報技術促進協議会に移管された際に同等機能のエンドポイントわ廃止されたよーなので現在わ取得不可。
    </Text>
    <Heading as="h6" size="xs" mb={2}>
      漢字情報
    </Heading>
    <Text mb={4}>
      <ExternalLink href="https://unicode.org/charts/unihan.html">Unihan Database</ExternalLink>
      のunihan.zipから取得。
    </Text>
    <Heading as="h6" size="xs" mb={2}>
      漢字グリフ生成
    </Heading>
    <Text mb={4}>
      <ExternalLink href="http://kamichi.jp/kage.html">KAGE（影）システム</ExternalLink>
      お採用。 KAGEデータからグリフ画像ファイルお生成するエンジンにわ
      <ExternalLink href="https://www.npmjs.com/package/@kurgm/kage-engine">@kurgm/kage-engine</ExternalLink>
      お使っているので、グリフウィキとわ表示されるグリフに差異が生じる場合があります。
    </Text>
  </Page>
);

export default Info;
