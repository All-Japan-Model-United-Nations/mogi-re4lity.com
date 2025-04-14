import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

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
      label: '総務引継ぎ',
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
          type: 'category',
          label: '情報管理',
          items: [
            {
              type: 'doc',
              id: 'soumu_docs/data/type',
              label: '総務が扱う情報',
            },
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
          type: 'link',
          label: '🔒 Contact',
          href: 'https://git.re4lity.com/#/contact',
        },
      ],
    },
    {
      type: 'category',
      label: 'AJMUN事務局について',
      items: [
        {
          type: 'doc',
          id: 'about_us/about-mogi',
          label: '模擬国連とは',
        },
        {
          type: 'doc',
          id: 'about_us/about-AJMUN',
          label: 'AJMUNについて',
        },
        {
          type: 'doc',
          id: 'about_us/about-this-site',
          label: 'このサイトの構造',
        },
      ],
    },
    {
      type: 'category',
      label: '開発',
      items: [
        {
          type: 'doc',
          id: 'contribution/setting-up',
          label: '開発/環境のセットアップ',
        },
      ],
    },
  ],
};

export default sidebars;
