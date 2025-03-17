---
slug: github-actions
title: 本サイトの開発で用いているGithub Actionsの紹介
authors: [re4lity]
tags: [Github Actions, CI/CD]
---
このサイトの構築を担当しているre4lityです。
本記事では、現在採用しているCI/CDのためのGithub Actionsの実装について説明します。
<!-- truncate -->

## 開発フローについて

### ブランチ構成

本サイトはmainブランチ、devブランチ、gh-pagesブランチの3つを運用しています。
以下のように用途を切り分けています。

- devブランチ
  - 開発用ブランチ
- mainブランチ
  - 本番環境のデプロイ元
- gh-pagesブランチ
  - 静的サイト生成用ブランチ

### 開発の流れ

1. [作業issue · mogi.re4lity.com開発](https://github.com/orgs/All-Japan-Model-United-Nations/projects/4)にてタスクを起票
2. devブランチ上でタスク単位の開発を進め、終了したらmainブランチに対するプルリクエストを作成
3. プルリクエストを開くとcheck.ymlが走りtscとbuildを実行しログをコメントに残す
4. 上記のGithub Actionsが成功した場合のみ、mainブランチに対してマージすることができる
5. マージされるとdeploy.ymlが走りgh-pagesブランチにてデプロイが行われる

最初期はmainブランチ上で開発を進めてしまっていたため、デプロイの過程でエラーが出てサイトが公開できなくなるということもありました(n敗)。

また、devブランチに切り分けた後も、mainブランチに対してのマージを行った後、ローカルの開発環境にて手動でmainブランチにチェックアウトしてyarn deployを実行していたので、その手間をdeploy.ymlによって省くことができました。

「にわか」状態でサイトを開発しているため、不必要な処理を行っていたりしそう(特にcheck.ymlが怪しいと思っています)ですが、トライ＆エラーでこれからも頑張って開発していきたいと思います。

もしフィードバックがありましたら、Githubリポジトリにてissue建てやコメントを頂ければ泣いて喜びます。
お読みいただきありがとうございました。


## check

ソースコードはこちら：[mogi-re4lity.com/.github/workflows/check.yml at main](https://github.com/All-Japan-Model-United-Nations/mogi-re4lity.com/blob/main/.github/workflows/check.yml)

```yml title=".github/workflow/check.yml"
name: Check TypeScript and Build on PR

on:
  pull_request:
    branches:
      - main
    types: [opened, synchronize, reopened]

jobs:
  check:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install dependencies
      run: yarn install

    - name: TypeScript type check
      id: typecheck
      run: |
        yarn typecheck 2>&1 | tee typescript-report.txt
        exit ${PIPESTATUS[0]}

    - name: Build project
      id: build
      run: |
        yarn build 2>&1 | tee build-report.txt
        exit ${PIPESTATUS[0]}

    - name: Comment Test Results on PR
      if: always() && github.event_name == 'pull_request'
      uses: actions/github-script@v7
      with:
        script: |
          const fs = require('fs');
          let report = '## Build Test Results\n';

          if (fs.existsSync('typescript-report.txt')) {
            report += '\n### TypeScript Check\n```\n' +
              fs.readFileSync('typescript-report.txt', 'utf8') + '\n```\n';
          }

          if (fs.existsSync('build-report.txt')) {
            report += '\n### Build Output\n```\n' +
              fs.readFileSync('build-report.txt', 'utf8') + '\n```\n';
          }

          await github.rest.issues.createComment({
            owner: context.repo.owner,
            repo: context.repo.repo,
            issue_number: context.issue.number,
            body: report
          });

```

コメント：[checkで拾いたいプルリクエスト by sudolifeagain · Pull Request #34](https://github.com/All-Japan-Model-United-Nations/mogi-re4lity.com/pull/34)

実際にこちらで絶対デプロイさせたくない編集を含んだプルリクエストを作成し、チェック段階で弾けることを確認しています。


## deploy

ソースコードはこちら：[mogi-re4lity.com/.github/workflows/deploy.yml at main](https://github.com/All-Japan-Model-United-Nations/mogi-re4lity.com/blob/main/.github/workflows/deploy.yml)

```yml title=".github/workflow/deploy.yml"
name: Deploy Docusaurus Site

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm install

    - name: Run TypeScript type check
      run: npm run typecheck

    - name: Build the Docusaurus site
      run: npm run build

    - name: Configure Git
      run: |
        git config --global user.email "${{ secrets.GIT_USER_EMAIL }}"
        git config --global user.name "${{ secrets.GIT_USER_NAME }}"

    - name: Deploy the site to GitHub Pages
      run: |
        git remote set-url origin https://x-access-token:${{ secrets.GITHUB_TOKEN }}@github.com/${{ github.repository }}
        npm run deploy
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

```

コメント：最初はローカルでデプロイしている時にユーザー認証がバックグラウンドで渡されていることを知らず、github-tokenを含んだ git remote set-url origin ~~ を渡していませんでした。ChatGPT君、Claude君ありがとう。

check.ymlでも行ったbuildコマンドをこちらでも実行しているのは重複なので省いてもよいかな～～と思っております。一番下のnpm run deployで同じ操作含まれていると思うし...

時間があったら該当コードを削除して検証してみようと思っています。