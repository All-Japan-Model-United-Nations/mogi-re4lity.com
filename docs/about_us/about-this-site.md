---
sidebar_position: 4
---

# このサイトについて

このサイトは[Docusaurus](https://docusaurus.io/)によってビルドされ、[Github Pages](https://docs.github.com/ja/pages/getting-started-with-github-pages/about-github-pages)によってデプロイされています。
CLoudflareにてDNSを管理しているre4lity.comのサブドメイン、`mogi.re4lity.com`をデプロイ先として指定しています。

```json
    "deploy": "docusaurus build && echo mogi.re4lity.com > build/CNAME && gh-pages -d build",
```
