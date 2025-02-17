import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import dotenv from 'dotenv';

dotenv.config();

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'AJMUNdocs-internal',
  tagline: '事務局関係者向けサイト made by 総務',
  favicon: 'img/ajmun-logo.png',

  // Set the production url of your site here
  url: 'https://internal-mogi.re4lity.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'sudolifeagain', // Usually your GitHub org/user name.
  projectName: 'soumublog', // Usually your repo name.
  deploymentBranch: 'gh-pages', // デプロイ先のブランチ名
  trailingSlash: false, // 末尾のスラッシュを削除

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
        content: process.env.GOOGLE_SITE_VERIFICATION || 'default-verification-code',
      },
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.ts'),
          editUrl: 'https://github.com/sudolifeagain/soumublog/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/sudolifeagain/soumublog/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/ajmun-internal.jpg',
    navbar: {
      title: 'AJMUNdocs-internal',
      logo: {
        alt: 'AJMUN Logo',
        src: 'img/ajmun-logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/sudolifeagain/soumublog',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/sudolifeagain/soumublog',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} <a href="https://git.re4lity.com/">re4lity</a> Built with Docusaurus.`,
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
