---
sidebar_position: 1
---

# このサイトについて

このサイトは[Docusaurus](https://docusaurus.io/)によってビルドされ、[Github Pages](https://docs.github.com/ja/pages/getting-started-with-github-pages/about-github-pages)によってデプロイされています。
CLoudflareにてDNSを管理しているre4lity.comのサブドメイン、`internal-re4lity.com`をデプロイ先として指定しています。

## アクセス制限の実装

Cloudflare accessを用いてGoogleアカウントによるユーザー認証を導入しています。

アクセス許可対象は以下のスプレッドシート内のメールアドレスを手動で追加して管理しています。
[事務局員メアド/AJMUN36th個人情報シート - Google スプレッドシート](https://docs.google.com/spreadsheets/d/1m3ZCO0FGDChJexhbBZeNh0Y78ycSs-SwOmRbzSzgFXo/edit?resourcekey=&gid=869754857#gid=869754857)

次期事務局員のメールアドレスも随時追加していきますので、お気軽にDiscordにて@総務統括でメンションください。

```bash
npm run docusaurus docs:version 1.0
```

The `docs` folder is copied into `versioned_docs/version-1.0` and `versions.json` is created.

Your docs now have 2 versions:

- `1.0` at `http://localhost:3000/docs/` for the version 1.0 docs
- `current` at `http://localhost:3000/docs/next/` for the **upcoming, unreleased docs**

## Add a Version Dropdown

To navigate seamlessly across versions, add a version dropdown.

Modify the `docusaurus.config.js` file:

```js title="docusaurus.config.js"
export default {
  themeConfig: {
    navbar: {
      items: [
        // highlight-start
        {
          type: 'docsVersionDropdown',
        },
        // highlight-end
      ],
    },
  },
};
```

The docs version dropdown appears in your navbar:

![Docs Version Dropdown](./img/docsVersionDropdown.png)

## Update an existing version

It is possible to edit versioned docs in their respective folder:

- `versioned_docs/version-1.0/hello.md` updates `http://localhost:3000/docs/hello`
- `docs/hello.md` updates `http://localhost:3000/docs/next/hello`
