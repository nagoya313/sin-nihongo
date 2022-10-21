# 新日本語へようこそ！

このアプリはまさかの Remix 製。

- [Remix](https://remix.run/docs)

## デプロイ

Vercel 向けのプロジェクトなので、https://vercel.com/new でリポジトリをインポートしておけば、以降 main ブランチへの push の度に自動でデプロイされる。

## 開發

プロジェクトの依存關係が安裝されてゐることを要確認。

```sh
yarn install
```

postgresql のデータベースがない場合は適宜作成。

```
createdb {DB名}
```

必要な環境變數を .env 算帳に設定。auth0 關聯（callback url 等）は auth0 側でも要テナント設定。

```
SESSION_SECRET = {テキトーな値}
AUTH0_RETURN_TO_URL = "http://localhost:3000"
AUTH0_CALLBACK_URL = "http://localhost:3000/auth/callback"
AUTH0_CLIENT_ID = {auth0のクライアントID}
AUTH0_CLIENT_SECRET = {auth0のクライアントシークレット}
AUTH0_DOMAIN = {auth0のドメイン名}
AUTH0_LOGOUT_URL = "https://{auth0のドメイン名}/v2/logout"
DATABASE_URL="postgresql://{user}:{password}@localhost:5432/{DB名}"
```

次のコマンドで DB の設定と初期算料を投入。

```sh
yarn db:migrate
yarn db:seed
```

その後、次のコマンドで Remix 開發サーバを起動。

```sh
yarn run dev
```

開發サーバの起動中 [http://localhost:3000](http://localhost:3000) を開けばページを閱覽可能。
