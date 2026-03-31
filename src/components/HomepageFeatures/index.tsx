import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: '成長できる環境',
    icon: '🚀',
    description: (
      <>
        イベント運営、交渉、広報、財務など、
        実践的なスキルを磨ける場がここにあります。
        失敗を恐れず挑戦し、共に成長しましょう。
      </>
    ),
  },
  {
    title: '全国の仲間と繋がる',
    icon: '🤝',
    description: (
      <>
        北は北海道から南は九州まで、
        全国から集まる多様なバックグラウンドを持つ学生と
        一生モノの繋がりを作ることができます。
      </>
    ),
  },
  {
    title: '創造性を形にする',
    icon: '💡',
    description: (
      <>
        あなたのアイデアが、数百人の参加者を動かします。
        既存の枠にとらわれず、新しい価値を創造できる
        クリエイティブな環境です。
      </>
    ),
  },
];

function Feature({ title, icon, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>
          {icon}
        </div>
        <div>
          <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
          <p className={styles.featureDescription}>{description}</p>
        </div>
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
