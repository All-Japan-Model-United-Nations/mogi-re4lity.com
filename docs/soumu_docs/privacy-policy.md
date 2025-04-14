---
tags: [Stable]
---

# プライバシーポリシー

Webサイトを閲覧する際や、何らかのサービスに登録する際に見かけるプライバシーポリシーですが、AJMUNの運営上でも策定が必要です。<br />
参考：プライバシーポリシーの必要性を検討したドキュメント(内部用サイトで閲覧可能)

## 36thでのプライバシーポリシー

Googleドキュメント(内部用サイトで閲覧可能)を全体に公開することで周知をしていました。


## プライバシーポリシーを更新する

プライバシーポリシーを更新する際の手順です。

- 36thをコピーして新しいドキュメントを作成する
- 内容をチェックし、変更すべき点を変更する
- ドキュメントをリンクを知っている人を対象に閲覧権限を付与する
- 大会HPで告知する

### 内容の変更点

内部用サイトで閲覧可能

### 更新通知

内部用サイトで閲覧可能

## 問い合わせフォームの管理について

プライバシーポリシーの文中にあるフォーム(リンクは内部用サイトで閲覧可能)ですが、36thではGoogleフォームにGASをくっつけて回答があり次第Discordに自動で通知されるように仕組みを構築していました。<br />
が、一件も問い合わせがないので正直もうここはフォームで受け付けせず、総務メアドや専用メーリングリスト(Googleグループ)にメールで問い合わせしてください、という形に変更してしまってもよいと思います。<br />
プライバシーポリシーなんてちゃんと読む人のほうが圧倒的に少ないと思うし、そのうえで問い合わせたいニーズなんて恐らくないので、構築に要する工数に見合っていませんでした。<br />

ただ、参考にはなるので以下のセクションで解説だけはしておきます。暇なときにでも読んでみてください。

---

### 問い合わせフォームの実装

#### フォーム部分

- 返信用メールアドレスと問い合わせ内容のシンプルな形式でOK

### GAS部分

今回のシステムではスプレッドシートに回答を紐づける必要はありません。回答数もほとんどないだろうし、フォーム単体で充分です。

- Googleフォームの編集画面のメニューから「Apps Script」をクリック
- コードの部分に以下のコードをコピペ(コードブロックの右上にコピーボタンがあります)


<details>
  <summary>GASのコード</summary>

```jsx
function onFormSubmit(e) {
  const responses = e.response.getItemResponses();
  const webhookUrl = PropertiesService.getScriptProperties().getProperty('MyDiscord_WebhookURL');
  const DiscordID_YN = PropertiesService.getScriptProperties().getProperty('DiscordID_YN');

  let fields = [];

  responses.forEach(response => {
    fields.push({
      name: response.getItem().getTitle(),
      value: response.getResponse(),
      inline: false
    });
  });

  const payload = {
    content: `<@${DiscordID_YN}>36th AJMUNのプライバシーポリシーの問い合わせフォームに回答がありました`,
    flags: 4096,
    embeds: [{
      title: "新規フォーム回答",
      color: 5814783,
      fields: fields,
      timestamp: new Date().toISOString()
    }]
  };

  try {
    UrlFetchApp.fetch(webhookUrl, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload)
    });
  } catch (error) {
    Logger.log(`エラーが発生しました: ${error.message}`);
    Logger.log(`スタックトレース: ${error.stack}`);
  }
}
```

</details>

- contentに設定してある通知文や変数名を適宜変更する
    - 変更可能変数はDiscordID_YNとwebhookurlの二つ
- プロジェクトの設定画面からスクリプトプロパティに移動、プロパティで変数を設定する<br />
webhookは送信したい対象のwebhoook、DiscordIDはメンション部分です。<br />
メンションしたいユーザーのIDか、ロールのIDを設定してください。
    - discordにおけるwebhookの作成方法は[こちら](/docs/tech/webhook#setup-webhook-in-discord)
    - スクリプトプロパティの設定方法は[こちら](https://gasgasgas.jp/2024/03/13/read-script-property/)
    - GASのコードで変数名を変更した場合はスクリプトプロパティもそれに合わせて登録してください
- トリガーを設定する
    - 実行する関数は「onFormSubmit」
    - イベントのソースは「フォームから」
    - イベントの種類は「フォーム送信時」
        - 初回設定時は権限付与の確認画面が出るので適宜許可する
        - 操作に迷ったら：[こちら](https://uncle-gas.com/approve-permissions/)

以上の設定で、Googleフォームに回答があると自動でwebhook経由で通知が流れるはずです。<br />