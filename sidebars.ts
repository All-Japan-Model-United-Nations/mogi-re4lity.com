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
        'soumu_docs/overall',
        'soumu_docs/congratulations',
        'soumu_docs/create-a-blog-post',
        {
          type: 'link',
          label: '🔒 Contact',
          href: 'https://git.re4lity.com/#/contact',
        },
        'soumu_docs/create-a-document',
        'soumu_docs/deploy-your-site',
        'soumu_docs/markdown-features',
      ],
    },
    {
      type: 'category',
      label: 'Tutorial - Extras',
      items: [
        {
          type: 'doc',
          id: 'tutorial-extras/about-this-site',
          label: 'このサイトの構造',
        },
        'tutorial-extras/translate-your-site',
      ],
    },
  ],
};

export default sidebars;
