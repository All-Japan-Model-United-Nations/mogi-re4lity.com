# 開発環境のセットアップ

このwebサイトは [Docusaurus](https://docusaurus.io/)を使用し構築しています。以下にAIを用いてステップバイステップの開発手順書を作成したので、参考にしてください。

※Githubリポジトリのreadmeと内容は同一です。

## Docusaurus開発環境構築ガイド (Windows/Yarn)

このガイドでは、Windows環境でのDocusaurus開発環境の構築方法を初心者向けに解説します。GitHubリポジトリ「All-Japan-Model-United-Nations/mogi-re4lity.com」を使った開発ワークフローも含みます。パッケージマネージャとして**Yarn**を使用します。

## 目次

1. [基本ツールのインストール](#基本ツールのインストール)
    - Git
    - Node.js
    - Yarn
    - Visual Studio Code
2. [リポジトリのクローン](#リポジトリのクローン)
3. [開発環境の設定](#開発環境の設定)
4. [開発ワークフロー](#開発ワークフロー)
    - ブランチの作成と切り替え
    - 変更の追跡とコミット
    - プルリクエストの作成
5. [よくある問題と解決策](#よくある問題と解決策)

## 基本ツールのインストール

### Git

1. [Git公式サイト](https://git-scm.com/download/win)からWindows用インストーラーをダウンロード
2. インストーラーを実行し、以下の設定で進める:
    - コンポーネント選択: デフォルト設定でOK
    - エディタ選択: 「Use Visual Studio Code as Git's default editor」を選択
    - PATH環境変数: 「Git from the command line and also from 3rd-party software」を選択
    - HTTPS転送バックエンド: OpenSSL library
    - 改行コンバーション: 「Checkout Windows-style, commit Unix-style line endings」を選択
    - ターミナルエミュレータ: MinTTYを選択
    - `git pull`の動作: デフォルト設定(fast-forward or merge)
    - 認証情報ヘルパー: Git Credential Manager
    - その他のオプション: デフォルト設定でOK

3. インストール完了後、Windows PowerShellを開いて動作確認:

```bash
git --version
```

### Node.js

1. [Node.js公式サイト](https://nodejs.org/)からLTS(Long Term Support)版をダウンロード（package.jsonより、Node.js 18.0以上が必要）

2. インストーラーを実行し、デフォルト設定で進める

3. インストール完了後、Windows PowerShellを開いて動作確認:

```bash
node --version
```

### Yarn

1. Windows PowerShellを管理者権限で開き、以下のコマンドを実行:

```bash
npm install -g yarn
```

2. インストール完了後、動作確認:

```bash
yarn --version
```

### Visual Studio Code

1. [Visual Studio Code公式サイト](https://code.visualstudio.com/)からインストーラーをダウンロード
2. インストーラーを実行し、以下のオプションを選択:
    - デスクトップにアイコンを作成
    - エクスプローラーのコンテキストメニューに「Code で開く」を追加
    - PATHへの追加

3. インストール完了後、VS Codeを起動し、以下の拡張機能をインストール:
    - ESLint
    - Prettier
    - GitLens
    - MDX

## リポジトリのクローン

1. Windows PowerShellを開き、ソースコードを保存したいディレクトリに移動:

```bash
cd C:\Users\ユーザー名\Documents
mkdir Projects
cd Projects
```

2. GitHubリポジトリをクローン:

```bash
git clone https://github.com/All-Japan-Model-United-Nations/mogi-re4lity.com.git
cd mogi-re4lity.com
```

3. リモートブランチの確認:

```bash
git branch -a
```

4. 開発用の`dev`ブランチに切り替え:

```bash
git checkout dev
```

## 開発環境の設定

1. 必要なパッケージをインストール:
```
yarn install
```

2. 開発サーバーを起動してプロジェクトを実行:
```
yarn start
```
  ブラウザが自動的に開き、`http://localhost:3000`でサイトが表示されます。

3. ビルドテスト(必要に応じて):
```
yarn build
```

4. ローカルでビルド結果を確認:
```
yarn serve
```

## 開発ワークフロー

### ブランチについて

このプロジェクトでは、ブランチを使って開発を管理しています。主なブランチは以下の通りです:

- `main`: 本番環境に反映される安定版のコードを保持するブランチ
- `dev`: 開発作業を行うブランチ
- `gh-pages`: ビルドによって生成されたファイル用のブランチ

ブランチを分ける理由:

- 本番環境の安定性を保つため
- 複数人での並行開発を可能にするため
- コードレビューを効率的に行うため
- 問題が発生した場合に影響範囲を限定するため

### 作業用ブランチの作成

大きな機能追加やバグ修正には、`dev`ブランチからさらに作業用ブランチを作成することをおすすめします:

1. 最新の`dev`ブランチを取得:
```
git checkout dev
git pull origin dev
```

2. 新しい作業ブランチを作成して切り替え:
```
git checkout -b feature/新機能名
```
または
```
git checkout -b fix/修正内容
```

### 変更の追跡とコミット

1. 変更したファイルを確認:
```
git status
```

2. 変更をステージング:
```
git add .
```
または特定のファイルのみを追加:
```
git add ファイル名
```

3. 変更をコミット:
```
git commit -m "変更内容の簡潔な説明"
```

4. 変更をリモートリポジトリにプッシュ:
```
git push origin ブランチ名
```

### プルリクエストの作成

作業が完了したら、`dev`ブランチへのプルリクエストを作成します:

1. GitHubのリポジトリページに移動
2. 「Pull requests」タブをクリック
3. 「New pull request」ボタンをクリック
4. ベースブランチ(取り込み先)として`dev`を選択
5. 比較ブランチ(取り込むブランチ)として作業ブランチを選択
6. 「Create pull request」ボタンをクリック
7. プルリクエストのタイトルと説明を入力
8. 「Create pull request」ボタンをクリック

プルリクエストがレビューされ、承認されると`dev`ブランチにマージされます。

### mainブランチへのマージ

開発が一定段階に達し、本番環境にリリースする準備ができたら:

1. `dev`ブランチから`main`ブランチへのプルリクエストを作成:
    - ベースブランチとして`main`を選択
    - 比較ブランチとして`dev`を選択
2. プルリクエストが承認されると、`main`ブランチにマージされます
3. GitHub Actionsにより自動的にビルドとデプロイが実行されます

## GitHub Actionsによる自動デプロイ

このリポジトリでは、`main`ブランチに変更がマージされると、GitHub Actionsによって自動的にビルドとデプロイが実行されます。この自動化により、以下のメリットがあります:

- デプロイ作業の手間を省ける
- デプロイのミスを防止できる
- 常に最新のコードが本番環境に反映される

実際のデプロイ処理は、package.jsonの以下のスクリプトに基づいています:

```json
"deploy": "docusaurus build && echo mogi.re4lity.com > build/CNAME && gh-pages -d build"
```

## よくある問題と解決策

### Node.jsのバージョンエラー

package.jsonで指定されているNode.jsのバージョン(>=18.0)と異なるバージョンを使用している場合:

``` bash
nvm install 18
nvm use 18
```

NVMがインストールされていない場合は[NVM for Windows](https://github.com/coreybutler/nvm-windows/releases)からインストールできます。

### パッケージインストールエラー

```bash
yarn cache clean
yarn install
```

### gitコマンドが見つからないエラー

PATHが正しく設定されていない可能性があります。Git for Windowsを再インストールするか、環境変数を確認してください。

### ポート3000が既に使用されている

```bash
yarn start --port 3001
```

### Docusaurusの基本コマンド

よく使うDocusaurusのコマンドは次の通りです（Yarn版）:

- 開発サーバー起動: `yarn start`
- ビルド: `yarn build`
- ビルド結果をローカルで確認: `yarn serve`
- キャッシュクリア: `yarn clear`
- 型チェック実行: `yarn typecheck`

---

このガイドで問題が解決しない場合は、GitHubのIssueを作成してサポートを求めてください。