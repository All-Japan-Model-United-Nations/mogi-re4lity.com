import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '事務局について',
      items: [
        'about_us/about-mogi',
        'about_us/about-AJMUN',
        'about_us/about-this-site',
      ],
    },
    {
      type: 'category',
      label: '役職・仕事紹介',
      link: {
        type: 'doc',
        id: 'roles/intro',
      },
      items: [
        'roles/sec-gen',
        'roles/director',
        'roles/general-affairs',
        'roles/public-relations',
        'roles/financial',
        'roles/external-affairs',
      ],
    },
    {
      type: 'category',
      label: '資料庫 (旧:総務引継ぎ)',
      collapsible: true,
      collapsed: true,
      link: {
        type: "doc",
        id: "soumu_docs/overall",
      },
      items: [
        {
          type: 'doc',
          id: 'soumu_docs/human-resources',
          label: '事務局員募集',
        },
        {
          type: 'doc',
          id: 'soumu_docs/youkou',
          label: '大会要綱',
        },
        {
          type: 'doc',
          id: 'soumu_docs/privacy-policy',
          label: 'プライバシーポリシー',
        },
        {
          type: 'category',
          label: '情報管理',
          items: [
            {
              type: 'doc',
              id: 'soumu_docs/data/type',
              label: '総務が扱う情報',
            },
            {
              type: 'doc',
              id: 'soumu_docs/data/spreadsheet1',
              label: '個人情報シート',
            },
            {
              type: 'category',
              label: '個別シートの解説',
              link: {
                type: 'doc',
                id: 'soumu_docs/data/spreadsheet/overall',
              },
              items: [
                {
                  type: 'doc',
                  id: 'soumu_docs/data/spreadsheet/zimu1',
                  label: '事務編シート-全データ'
                },
                {
                  type: 'doc',
                  id: 'soumu_docs/data/spreadsheet/zimu2',
                  label: '事務編シート-有効アプライ'
                },
                {
                  type: 'doc',
                  id: 'soumu_docs/data/spreadsheet/zimu3',
                  label: '事務編シート-無効・キャンセル済み'
                },
                {
                  type: 'doc',
                  id: 'soumu_docs/data/spreadsheet/zimu4',
                  label: '事務編シート-渉外展開用(メール配信)'
                },
                {
                  type: 'doc',
                  id: 'soumu_docs/data/spreadsheet/zimu5',
                  label: '事務編シート-広報展開用(写真許可)'
                }
              ]
            }
          ],
        },
        {
          type: 'doc',
          id: 'soumu_docs/discord',
          label: 'Discord運用',
        },
        {
          type: 'doc',
          id: 'soumu_docs/items',
          label: '備品管理',
        },
        {
          type: 'doc',
          id: 'soumu_docs/placard',
          label: 'プラカード',
        },
        {
          type: 'doc',
          id: 'soumu_docs/layout',
          label: 'レイアウト',
        },
        {
          type: 'doc',
          id: 'soumu_docs/zimu-apply',
          label: '事務編アプライフォーム',
        },
        {
          type: 'doc',
          id: 'soumu_docs/document-for-minor',
          label: '未成年者の大会参加について',
        },
        {
          type: 'doc',
          id: 'soumu_docs/award',
          label: 'アワード',
        },
        {
          type: 'doc',
          id: 'soumu_docs/namecard',
          label: 'ネームカード',
        },
        {
          type: 'doc',
          id: 'soumu_docs/signage',
          label: '吊り看板',
        },
        {
          type: 'doc',
          id: 'soumu_docs/temp-staff',
          label: '当セク当スタ',
        },
        {
          type: 'link',
          label: '🔒 Contact',
          href: 'https://git.re4lity.com/#/contact',
        },
      ],
    },
    {
      type: 'category',
      label: 'サイト開発・貢献',
      items: [
        {
          type: 'doc',
          id: 'contribution/setting-up',
          label: '[本格]サイトの環境に参加する',
        },
        {
          type: 'doc',
          id: 'contribution/contribution-easy',
          label: '[簡単]サイトの環境に参加する',
        },
        {
          type: 'doc',
          id: 'tech/webhook',
          label: 'Webhook解説',
        },
      ],
    },
  ],
};

export default sidebars;
