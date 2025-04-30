import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import dotenv from 'dotenv';

dotenv.config();

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'AJMUNdocs',
  tagline: '35回・36回AJMUN総務有志によるサイト',
  favicon: 'img/ajmun-logo.png',

  // Set the production url of your site here
  url: 'https://mogi.re4lity.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'All-Japan-Model-United-Nations', // Usually your GitHub org/user name.
  projectName: 'mogi-re4lity.com', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja'],
  },

  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'google-site-verification',
        content:'xmlP7M078iOqLp6nNB_nlzlT-3sVGAGk7Lb5T9Do4gk',
      },
    },
  ],

  presets: [
    [
      'classic',
      {
        sitemap: {},
        docs: {
          sidebarPath: require.resolve('./sidebars.ts'),
          editUrl: 'https://github.com/All-Japan-Model-United-Nations/mogi-re4lity.com/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/All-Japan-Model-United-Nations/mogi-re4lity.com/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    announcementBar: {
      id: 'announcement',
      content:
        '本サイトは構築途中です。内容が不正確であったり、不十分であったりする場合があります。',
      backgroundColor: '#87cefa',
      textColor: '#091E42',
      isCloseable: true,
    },
    // Replace with your project's social card
    image: 'img/ajmun.jpg',
    navbar: {
      title: 'AJMUNdocs',
      logo: {
        alt: 'AJMUN Logo',
        src: 'img/ajmun-logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '総務引継ぎ書類',
        },
        {to: '/blog', label: 'ブログ', position: 'left'},
        {
          href: 'https://internal-mogi.re4lity.com/',
          label: '内部用サイト',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'サイト内リンク',
          items: [
            {
              label: '総務引継ぎ書類',
              to: '/docs/intro',
            },
            {
              label: 'ブログ',
              to: '/blog',
            },
          ],
        },
        {
          title: 'More',
          items: [

            {
              label: 'GitHub',
              href: 'https://github.com/sudolifeagain/soumublog',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} <a href="https://re4lity.com/">re4lity</a> Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,  
      darkTheme: prismThemes.dracula,
    },
    i18n: {
      defaultLocale: 'ja',
      locales: ['ja'],
      localeConfigs: {
        ja: {
          label: '日本語',
          direction: 'ltr',
        },
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
