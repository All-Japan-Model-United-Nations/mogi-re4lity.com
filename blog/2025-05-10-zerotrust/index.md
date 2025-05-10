---
slug: zero-trust
title: 内部サイトの閲覧制限(Zero Trust・Accessポリシー)の編集を自動化した話
authors: [re4lity]
tags: [ZeroTrust, CI/CD]
---
<img src="/img/zerotrust.png" width="750" alt="ZeroTrustのポリシー自動更新システムの構成図" />
本サイトの姉妹サイトであるhttps://internal-mogi.re4lity.com/ はCloudflareの[Zero Trust](https://www.cloudflare.com/ja-jp/zero-trust/)を活用して非公開サイトとしています。<br />
この記事では、閲覧権限の追加を自動化した経験についてまとめます。
<!-- truncate -->

## 今までの課題

内部用サイトは関係者しか見せない前提で作成しているので、あまり外部に見せたくないような情報も蓄積しています。<br />
そのためサイト運営者の個人が持っているCloudflareのアカウント上のZero Trustのダッシュボードにて手動で閲覧権限を付与していました。<br />
しかし、今後も閲覧権限を新たに付与するケースが続きそうなこと、サイト運営者が忙しくなり対応が遅くなりそうな事情があり、安全な形で権限の付与を自動化したいというニーズがありました。

### 自動化の構成

以下の画像が詳しいです。



要するにGoogleフォームで新しいメアドを投げたらそれがGithub経由でZero Trustの特定のポリシーに追加される、ということです。

#### GoogleフォームからGithubへの連携

以下のGASをフォーム送信時のトリガーを設定して運用しています。

<details>
  <summary>GASのコード</summary>

```js
const GITHUB_TOKEN = 'ghp_hogehoge';
const OWNER       = 'All-Japan-Model-United-Nations';        // リポジトリ所有者
const REPO        = 'internal-mail';            // リポジトリ名
const FILE_PATH   = 'allowed_emails.txt';   // 対象ファイルパス
const FORM_FIELD   = '追加するメールアドレス';     // フォームの質問タイトル

function onFormSubmit(e) {
  // --- ガード節：イベントオブジェクトの有無をチェック ---
  if (!e) {
    console.error('onFormSubmit: イベントオブジェクトが渡されていません');
    return;
  }

  // --- 1) フォーム回答からメールアドレス取得 ---
  let email = '';

  // スプレッドシート連携フォームの場合
  if (e.namedValues) {
    const keys = Object.keys(e.namedValues);
    console.log('namedValues keys:', keys);
    // 質問タイトルと完全一致するキーを使う
    if (e.namedValues[FORM_FIELD] && e.namedValues[FORM_FIELD][0]) {
      email = e.namedValues[FORM_FIELD][0].trim();
    }
  }
  // フォーム単体バインドの場合
  if (!email && e.response && e.response.getItemResponses) {
    const responses = e.response.getItemResponses();
    responses.forEach(item => {
      if (item.getItem().getTitle() === FORM_FIELD) {
        email = item.getResponse().trim();
      }
    });
  }
  if (!email) {
    console.error('onFormSubmit: メールアドレスが取得できませんでした');
    return;
  }
  console.log('取得したメールアドレス:', email);

  // --- 2) GitHub から既存ファイルを取得 ---
  const apiUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`;
  const headers = {
    'Authorization': `token ${GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json'
  };
  let payload, sha, content;
  try {
    const resp = UrlFetchApp.fetch(apiUrl, { method: 'get', headers });
    payload = JSON.parse(resp.getContentText());
    sha = payload.sha;
    // Base64 → 文字列
    content = Utilities.newBlob(Utilities.base64Decode(payload.content)).getDataAsString();
  } catch (err) {
    console.error('GitHub ファイル取得エラー:', err);
    return;
  }

  // --- 3) 重複チェック ---
  const lines = content.split('\n').map(line => line.trim()).filter(line => line);
  if (lines.indexOf(email) !== -1) {
    console.log('メールアドレスは既に登録済みです:', email);
    return;
  }

  // --- 4) ファイル内容を更新 & Base64 エンコード ---
  lines.push(email);
  const updatedContent = lines.join('\n') + '\n';
  const updatedB64 = Utilities.base64Encode(updatedContent);

  // --- 5) PUT で更新＆コミット ---
  const body = {
    message: `Add allowed email: ${email}`,
    content: updatedB64,
    sha: sha
  };
  try {
    const putResp = UrlFetchApp.fetch(apiUrl, {
      method: 'put',
      headers: headers,
      payload: JSON.stringify(body)
    });
    console.log('GitHub 更新ステータス:', putResp.getResponseCode());
  } catch (err) {
    console.error('GitHub ファイル更新エラー:', err);
  }
}
```

</details>

#### Github Actionsによるポリシーの自動同期



<details>
  <summary>cloudflare_sync.yml</summary>

```yml
name: Update Cloudflare Zero Trust Policy

on:
  push:
    paths:
      - 'allowed_emails.txt'
    branches:
      - main
  workflow_dispatch:  # 手動実行も可能にする

jobs:
  update-policy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.10'

      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install requests

      - name: Update Cloudflare Zero Trust Policy
        env:
          CF_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CF_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          CF_POLICY_ID: ${{ secrets.CLOUDFLARE_POLICY_ID }}
        run: |
          cat > update_policy.py << 'EOF'
          import os
          import json
          import requests

          # 認証情報を環境変数から取得
          api_token = os.environ['CF_API_TOKEN']
          account_id = os.environ['CF_ACCOUNT_ID']
          policy_id = os.environ['CF_POLICY_ID']

          # メールアドレスのリストを読み込み
          with open('allowed_emails.txt', 'r') as f:
              emails = [line.strip() for line in f.readlines() if line.strip()]

          # 無効な行やコメントを除外
          emails = [email for email in emails if '@' in email and not email.startswith('#')]

          print(f'読み込んだメールアドレス数: {len(emails)}')

          # Cloudflare APIのエンドポイント
          url = f'https://api.cloudflare.com/client/v4/accounts/{account_id}/access/policies/{policy_id}'
          
          print(f"API URL: {url}")

          # 既存のポリシーを取得
          headers = {
              'Authorization': f'Bearer {api_token}',
              'Content-Type': 'application/json'
          }

          response = requests.get(url, headers=headers)
          if response.status_code != 200:
              print(f'ポリシーの取得に失敗しました: {response.status_code}')
              print(response.text)
              exit(1)

          policy = response.json()['result']
          
          print("取得したポリシー構造:")
          print(json.dumps(policy, indent=2))
          
          # ポリシーのルールを更新（メールアドレスリストを更新）
          # Cloudflare Zero Trustのポリシー構造に基づいて更新
          
          # 新しいincludeルールを構築
          new_include = []
          
          # メールアドレスルールを作成 - 元のポリシー構造を参考に
          email_rules = []
          for email in emails:
              email_rules.append({
                  "email": {
                      "email": email
                  }
              })
          
          # すべてのメールルールをincludeに追加
          new_include.extend(email_rules)
          
          # 元のincludeセクションから、email関連以外のルールを保持
          if isinstance(policy.get('include'), list):
              for rule in policy['include']:
                  if 'email' not in rule:
                      new_include.append(rule)
          
          # 新しいincludeルールをポリシーに設定
          policy['include'] = new_include

          # 更新したポリシーを適用
          print("更新後のポリシー構造:")
          print(json.dumps(policy, indent=2))
          
          update_response = requests.put(url, headers=headers, json=policy)
          if update_response.status_code not in [200, 201, 202]:
              print(f'ポリシーの更新に失敗しました: {update_response.status_code}')
              print(update_response.text)
              exit(1)

          print('ポリシーの更新が完了しました')
          print(f'更新されたメールアドレス数: {len(emails)}')
          EOF
          
          python update_policy.py

```

</details>


### 感想

最初は自力でやろうと思いましたが流石に無理でした。バイブコーディングで不安ではありますがGoogleフォームを閲覧できる対象をかなり制限している+編集者も権限を拡張できない設定にしているので、ある程度担保はされているかなと考えています。<br />
GASのほうで平文でGithubのPATを扱っているのは反省しております、プロパティサービス使えばよかった<br />
また、既存のポリシーから削除する方向についてはこの自動化では対応できないので、そちらは依然として手動の作業に頼っています。削除するニーズはそこまでないと思うのでそこは手動のままでよいかなと判断しました。<br />  
ちなみにドメインの維持費以外は**すべて無料**でこの機能を実現できています。やばいですよね。<br />
お読みいただきありがとうございました。