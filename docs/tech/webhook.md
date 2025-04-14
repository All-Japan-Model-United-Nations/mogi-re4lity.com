---
sidebar_position: 1
tags: [Unstable]
---

# Webhook解説

Webhook（ウェブフック）は、一見すると難しそうな言葉ですが、実は「ある出来事が起きたときに、自動でお知らせを送るしくみ」です。<br />
このページでは、「Webhookってなに？」「どんなことができるの？」「実際に使うにはどうすればいいの？」という疑問に沿って解説していきます。

---

## Webhookとは

### ● 簡単に言うと

Webhookは、「自動で通知を飛ばしてくれる仕組み」です。たとえば、「フォームに回答があったら、チャットにお知らせしたい」といった場面で活躍します。

### ● イメージで理解する

- 郵便ポストに手紙を投函 → 自動でLINEに通知がくる
- 料理が完成 → キッチンタイマーが鳴る
こういった「トリガー（きっかけ）→ アクション（通知など）」の流れを、ネットの世界で実現するのがWebhookです。

### ● 技術的には

技術的には、あるサービスが別のサービスに対して「こういうことが起きたよ！」とHTTPという方法で情報を送る仕組みです。<br />
「通知を自動で送る仕組み」ぐらいに思っておきましょう。

本腰を据えて理解したい場合は以下のリンクが有用です。

- [About webhooks - GitHub Docs](https://docs.github.com/en/webhooks/about-webhooks)

---

## 活用方法

### ● Webhookはどんなときに使えるの？

Webhookは、さまざまなサービスをつなぐ「橋渡し」のような役割をします。以下のようなケースで使われます。

- Googleフォームの回答があったら、SlackやDiscordに通知
- GitHubでコードが更新されたら、自動でチャットに投稿
- 決済が完了したら、顧客に自動でメールを送る

### ● メリット

- 手動操作がいらない → 作業効率アップ
- リアルタイムで反応できる → 素早い対応が可能に
- 他のツールと連携しやすい → 業務の自動化が進む

---

### Discordで設定してみる

### ● 実際にWebhookを使ってみよう

ここでは、Discordを使ってWebhookを試してみます。

#### ① DiscordでWebhookを作る {#setup-webhook-in-discord}

1. 通知を受けたいチャンネルの「編集」から「連携サービス」を開く
2. 「Webhookを作成」ボタンを押す
3. 名前やアイコンを設定（わかりやすくしておくと◎）
4. 「Webhook URL」が表示されるのでコピー（このURLが通知の宛先）

#### ② 通知を送ってみる

Webhook URLに対して、外部のサービス（例：GAS、Zapier、GitHubなど）から「メッセージを送る」設定をすれば、Discordに通知が届くようになります。



---

### ★[応用] 活用できるサイト

- Discordのembed作成・webhook送信サイト [Embed Generator | Discord embeds without the hassle](https://message.style/app/editor)
    - Discordにembedを活用した発展的なメッセージを送信したいときに使えます。
    - GASなどでコードを作成するのが面倒なときは、直接このサイトから送信することもできます。

- Webhookの送受信を検証するサイト
[Webhook.site - Test, transform and automate Web requests and emails](https://webhook.site/#!/)
    - かなり高度な内容にはなりますが、既存のサービスからどのようなデータがwebhook宛てに送られてくるのかを検証するために使えます。

