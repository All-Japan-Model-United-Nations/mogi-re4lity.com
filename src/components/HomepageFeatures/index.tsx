import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};
const FeatureList: FeatureItem[] = [
  {
    title: '総務のノウハウ共有',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        第35回、第36回大会を通じて総務として参画した人材が運営しています。<br />
        豊富なノウハウをこのサイトを通して提供します。
      </>
    ),
  },
  {
    title: 'ウェブサイトからのアクセス',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Googleドキュメントではなくウェブサイトで展開することで、<br />
        誰でも簡単にアクセスできるようにしています。<br />
      </>
    ),
  },
  {
    title: 'オープンソースでの開発',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Docusaurusというオープンソースのプロジェクトを利用し、<br />
        カスタマイズ性の高いウェブサイトを構築しています。
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
