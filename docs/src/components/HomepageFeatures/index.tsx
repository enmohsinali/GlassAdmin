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
    title: 'iOS 26 Liquid Glass Design',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Experience the stunning iOS 26 Liquid Glass aesthetic with advanced glassmorphism effects,
        backdrop blur, and dynamic color transitions. A truly premium and modern design.
      </>
    ),
  },
  {
    title: '40+ Components & 30+ Pages',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Comprehensive collection of pre-built components and fully functional pages including
        dashboards, e-commerce, analytics, calendar, messaging, and more. Everything you need to start fast.
      </>
    ),
  },
  {
    title: 'Modern Tech Stack',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Built with React 18, Tailwind CSS, React Router, and Framer Motion.
        Fully responsive, dark/light mode support, and optimized for performance. Production-ready code.
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
