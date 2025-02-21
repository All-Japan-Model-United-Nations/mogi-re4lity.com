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
      items: [
        {
          type: 'doc',
          id: 'soumu_docs/overall',
          label: 'はじめに',
        },
        {
          type: 'doc',
          id: 'soumu_docs/create-a-youkou',
          label: '大会要綱',
        },
        {
          type: 'doc',
          id: 'soumu_docs/human-resources',
          label: '事務局員募集に関して',
        },
        'soumu_docs/congratulations',
        {
          type: 'link',
          label: '🔒 Contact',
          href: 'https://git.re4lity.com/#/contact',
        },

        'soumu_docs/deploy-your-site',
        'soumu_docs/markdown-features',
      ],
    },
    {
      type: 'category',
      label: 'AJMUN事務局について',
      items: [
        {
          type: 'doc',
          id: 'about_us/about-this-site',
          label: 'このサイトの構造',
        },
        'about_us/translate-your-site',
      ],
    },
  ],
};

export default sidebars;
