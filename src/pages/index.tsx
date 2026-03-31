import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroAccent}>{siteConfig.title}</span>
              <br />
              次世代のもぎこっかーへ、最高の舞台を。
            </h1>
            <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
            <div className={styles.buttons}>
              <Link className="button button--primary button--lg" to="/docs/intro">
                事務局について知る
              </Link>
              <Link className="button button--outline button--lg" to="/blog">
                ブログを読む
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img src="/img/ajmun-logo.png" alt="AJMUN" />
          </div>
        </div>
      </div>
    </header>
  );
}

function AboutSection() {
  return (
    <section className={styles.aboutSection}>
      <div className="container">
        <div className={styles.aboutInner}>
          <h2 className={styles.aboutTitle}>このサイトについて</h2>
          <p className={styles.aboutText}>
            本サイトは、模擬国連全日本大会（AJMUN）事務局の活動を広く知ってもらうとともに、
            過去の大会運営で培ったノウハウを公開・共有することで、
            より良い大会運営を目指すためのドキュメントサイトです。
          </p>
          <div className={styles.aboutNote}>
            <span className={styles.aboutNoteIcon}>📌</span>
            <div>
              <p className={styles.aboutNoteTitle}>事務局員の参加資格について</p>
              <p className={styles.aboutNoteText}>
                AJMUNの事務局員は、<strong>日本模擬国連（JMUN）傘下の各研究会に所属する会員</strong>を対象としています。
                一般の方が外部から事務局員になることはできません。各研究会の会員の方は、ぜひ事務局への参加をご検討ください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - AJMUN事務局紹介`}
      description="模擬国連全日本大会事務局の活動紹介とリクルート">
      <HomepageHeader />
      <main>
        <AboutSection />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
