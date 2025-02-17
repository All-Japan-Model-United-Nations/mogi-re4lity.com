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
      label: 'Tutorial - Basics',
      items: [
        'tutorial-basics/create-a-page',
        'tutorial-basics/congratulations',
        'tutorial-basics/create-a-blog-post',
        {
          type: 'link',
          label: '🔒 Contact',
          href: 'https://git.re4lity.com/#/contact',
        },
        'tutorial-basics/create-a-document',
        'tutorial-basics/deploy-your-site',
        'tutorial-basics/markdown-features',
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
