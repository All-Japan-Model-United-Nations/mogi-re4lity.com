---
sidebar_position: 3
---

# このサイトについて

このサイトは[Docusaurus](https://docusaurus.io/)によってビルドされ、[Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)で配信されています。
Cloudflare で DNS を管理している `re4lity.com` のサブドメイン、`mogi.re4lity.com` をカスタムドメインとして設定しています。

```json
    "deploy": "npm run build && npm run deploy:worker",
```
