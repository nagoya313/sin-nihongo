# 新日本語

このプロジェクトは[Nx](https://nx.dev)を使つてゐます。

## 立上げ

以下コマンドでフロントとバックエンドが兩方上がります。

```
yarn nx run-many --target=serve --projects=sin-nihongo,api --parallel=true
```

フロントだけ上げたい場合は

```
yarn nx serve
```

バックエンドだけ上げたい場合は

```
yarn nx serve api
```

で上がります。

## ローカルアクセス

http://localhost:4200 でフロントエンド、http://localhost:3333/api/v1/ で API にアクセスできます。

## テスト

以下のコマンドでフロントの單體テストが走ります。

```
yarn test
```

e2e テストは

```
yarn e2e sin-nihongo-e2e
```

で走ります。
